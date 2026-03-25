# Implementation Plan: Frontend-Only Qullamaggie Scanner

## Executive Summary
This plan outlines the development of a frontend-only stock scanner application that implements the Qullamaggie momentum methodology using free public APIs. The app will be hosted for free on Vercel/Netlify and serve as a showcase for Sensible Analytics consultancy.

## Current Status
- ✅ **Architecture Document**: Created at `frontend-architecture.md`
- ✅ **Scanner Logic Analysis**: Python implementation analyzed (ADR%, RS momentum, EMA alignment, etc.)
- ⚠️ **Agent Payment Errors**: Explore and librarian agents failing due to paid models (gpt-5.4). Need to fix configuration.

## Critical First Step: Fix Agent Payment Errors
Before proceeding, run the model-error-handler script to replace paid models:
```bash
# Scan and fix all problematic models
OPENCODE_CONFIG_DIR=/Users/prabhatranjan/.superset/hooks/opencode model-error-handler.sh scan

# Or fix manually by updating explore and librarian agent models in oh-my-opencode.json
```

## Phase 1: Project Setup (Days 1-2)

### 1.1 Create Repository Structure
```
qullamaggie-scanner-frontend/
├── public/                  # Static assets
├── src/
│   ├── components/          # React components
│   ├── services/            # API services
│   ├── utils/               # Calculation utilities
│   ├── hooks/               # Custom React hooks
│   ├── store/               # State management
│   ├── types/               # TypeScript interfaces
│   └── App.tsx              # Main app
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

### 1.2 Technology Stack Selection
- **Framework**: React 18 + TypeScript + Vite
- **State Management**: Zustand (lightweight alternative to Redux)
- **Styling**: Tailwind CSS + CSS Modules for component-specific styles
- **Charts**: Lightweight Charts (TradingView) for professional financial charts
- **HTTP Client**: TanStack Query (React Query) for caching and background updates
- **Local Storage**: Dexie.js for IndexedDB operations
- **Testing**: Vitest + React Testing Library
- **Deployment**: Vercel (free tier)

### 1.3 Environment Setup
```bash
# Create project
npm create vite@latest qullamaggie-scanner-frontend -- --template react-ts
cd qullamaggie-scanner-frontend

# Install dependencies
npm install @tanstack/react-query zustand dexie lightweight-charts
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## Phase 2: Core Development (Days 3-10)

### 2.1 Data Layer Development

#### 2.1.1 API Service Layer
**Target**: `src/services/stockApi.ts`

**Free API Options** (choose based on research):
1. **Yahoo Finance** (unofficial): `https://query1.finance.yahoo.com/v8/finance/chart/{symbol}`
   - **Pros**: Free, no API key, historical data
   - **Cons**: Rate limits, CORS issues, unofficial
   - **Solution**: Use CORS proxy or build simple serverless function

2. **Alpha Vantage**: `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol={symbol}`
   - **Pros**: Free tier (25 requests/day), reliable
   - **Cons**: Very low rate limits for free tier

3. **Finnhub**: `https://finnhub.io/api/v1/stock/candle?symbol={symbol}&resolution=D&from={timestamp}&to={timestamp}`
   - **Pros**: Free tier (60 calls/minute), WebSocket for real-time
   - **Cons**: Requires API key

4. **Twelve Data**: `https://api.twelvedata.com/time_series?symbol={symbol}&interval=1day&outputsize=365`
   - **Pros**: Free tier (800 points/day), good data quality
   - **Cons**: Requires API key

**Recommended Approach**: Use **Twelve Data** for historical data (reliable, good free tier) + **Yahoo Finance** as fallback with CORS proxy.

#### 2.1.2 Browser Caching System
**Target**: `src/services/cacheService.ts`

```typescript
// IndexedDB schema
interface CachedOHLCV {
  symbol: string;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  timestamp: number; // Cache timestamp
}

interface CachedQuote {
  symbol: string;
  price: number;
  volume: number;
  timestamp: number;
}

// Cache strategy
const CACHE_CONFIG = {
  OHLCV_TTL: 24 * 60 * 60 * 1000, // 24 hours
  QUOTE_TTL: 5 * 60 * 1000,        // 5 minutes
  UNIVERSE_TTL: 7 * 24 * 60 * 60 * 1000, // 7 days
  MAX_SYMBOLS: 1000,
};
```

#### 2.1.3 Calculation Engine (TypeScript Port)
**Target**: `src/utils/calculations.ts`

Port Python `ScannerEngine.calculate_metrics()` to TypeScript:
```typescript
export function calculateMetrics(data: OHLCV[], config: ScanConfig): StockMetrics | null {
  const latest = data[data.length - 1];
  const currentPrice = latest.close;
  
  // 1. Hard filters
  if (currentPrice < config.minPrice) return null;
  
  // 2. Volume calculation (20-day MA)
  const volumes = data.map(d => d.volume);
  const avgVolume = calculateSMA(volumes, 20);
  const dollarVolume = avgVolume * currentPrice;
  if (dollarVolume < config.minVolumeDollars) return null;
  
  // 3. ADR% calculation
  const highLowPct = data.map(d => ((d.high - d.low) / d.close) * 100);
  const adr = calculateSMA(highLowPct.slice(-20), 20);
  if (adr < config.minADR) return null;
  
  // 4. Scoring (0-20 points)
  let score = 0;
  const signals: string[] = [];
  
  // ADR scoring (5 pts max)
  if (adr >= 10) score += 5;
  else if (adr >= 8) score += 4;
  else if (adr >= 6) score += 3;
  else score += 2;
  
  // ... implement remaining scoring
  
  return {
    symbol: data[0].symbol,
    price: currentPrice,
    score,
    adr,
    // ... other metrics
  };
}
```

### 2.2 UI Component Development

#### 2.2.1 Core Components
1. **`UniverseSelector`**: Dropdown for stock universe selection
   - Predefined: S&P 500, NASDAQ 100, Russell 2000
   - Custom: Upload CSV of symbols

2. **`ScanControls`**: Filter settings (min price, volume, ADR, score)

3. **`ResultsTable`**: Sortable table with:
   - Symbol, Price, Score, ADR%, RS%, Volume, Signals
   - Color-coded scores (green ≥15, yellow 10-14, red <10)
   - Click to view details

4. **`DetailPanel`**: Stock detail view with:
   - Price chart with EMAs (10, 20, 50)
   - Volume chart
   - Metrics breakdown
   - Suggested stop calculation

5. **`ProgressBar`**: Real-time scan progress

#### 2.2.2 Chart Integration
Use Lightweight Charts for professional rendering:
```typescript
import { createChart } from 'lightweight-charts';

// Price chart with EMAs
const chart = createChart(container, {
  width: container.clientWidth,
  height: 400,
  layout: { background: { color: '#ffffff' } },
});

// Add candlestick series
const candleSeries = chart.addCandlestickSeries({
  upColor: '#26a69a',
  downColor: '#ef5350',
});

// Add EMA lines
const ema10Series = chart.addLineSeries({ color: 'blue', lineWidth: 1 });
const ema20Series = chart.addLineSeries({ color: 'orange', lineWidth: 1 });
const ema50Series = chart.addLineSeries({ color: 'red', lineWidth: 1 });
```

### 2.3 State Management
Use Zustand for global state:
```typescript
interface ScannerState {
  // Data
  universe: string[];
  results: StockMetrics[];
  selectedStock: string | null;
  
  // UI State
  isLoading: boolean;
  progress: number;
  filters: ScanConfig;
  
  // Actions
  setUniverse: (universe: string[]) => void;
  runScan: () => Promise<void>;
  setSelectedStock: (symbol: string) => void;
  updateFilters: (filters: Partial<ScanConfig>) => void;
}
```

## Phase 3: Advanced Features (Days 11-15)

### 3.1 Performance Optimization
1. **Web Workers**: Move calculations off main thread
   ```typescript
   // worker.ts
   self.onmessage = (e) => {
     const { data, config } = e.data;
     const results = calculateMetricsBatch(data, config);
     self.postMessage(results);
   };
   ```

2. **Request Batching**: Fetch multiple symbols in parallel with rate limiting
3. **Progressive Loading**: Show results as they're calculated
4. **Virtual Scrolling**: For large result sets (React Window)

### 3.2 Real-time Updates
Optional: Use WebSocket for real-time quotes (if using Finnhub):
```typescript
// WebSocket connection for real-time updates
const ws = new WebSocket('wss://ws.finnhub.io?token=YOUR_API_KEY');
ws.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  updateRealTimePrice(data.s, data.p);
});
```

### 3.3 Export Functionality
- **CSV Export**: Download scan results
- **PNG Export**: Save charts as images
- **Shareable URLs**: Encode filters in URL parameters

## Phase 4: Testing & Deployment (Days 16-20)

### 4.1 Testing Strategy
1. **Unit Tests**: Calculation functions (Vitest)
2. **Integration Tests**: API services with mocked responses
3. **Component Tests**: React Testing Library
4. **E2E Tests**: Playwright for critical flows

### 4.2 Deployment Pipeline
1. **GitHub Repository**: Create `qullamaggie-scanner-frontend`
2. **Vercel Integration**: Connect GitHub repo
3. **Environment Variables**: Store API keys (if required)
4. **CI/CD**: GitHub Actions for testing

### 4.3 Documentation
1. **README.md**: Setup, usage, architecture
2. **Component Documentation**: Storybook (optional)
3. **API Documentation**: For internal use

## Resource Requirements

### Development Team
- **1 Full-stack Developer**: 20 days (4 weeks)
- **Optional: UI/UX Designer**: 5 days for professional design

### Costs (Monthly)
- **Hosting**: $0 (Vercel free tier)
- **API Costs**: $0-50/month (depending on usage and API choice)
- **Domain**: $10-15/year (optional)

### Infrastructure
- **Repository**: GitHub
- **CI/CD**: GitHub Actions
- **Monitoring**: Vercel Analytics (free tier)

## Risk Mitigation

### Technical Risks
1. **API Rate Limits**: Implement aggressive caching + fallback APIs
2. **CORS Issues**: Use CORS proxy or Vercel serverless functions
3. **Browser Performance**: Web Workers, virtual scrolling, progressive loading
4. **Data Accuracy**: Validate against multiple sources

### Business Risks
1. **User Adoption**: Professional UI + educational content
2. **Maintenance**: Keep dependencies updated, monitor API changes
3. **Legal**: Ensure compliance with data provider terms of service

## Success Metrics
1. **Performance**: Scan 500 symbols in <30 seconds
2. **Accuracy**: Match Python implementation within 1% for scores
3. **Usability**: Intuitive UI with <5 minute learning curve
4. **Reliability**: 99% uptime, graceful error handling
5. **Showcase Value**: Demonstrate technical capability to potential clients

## Next Steps
1. **Fix agent payment errors** (run model-error-handler)
2. **Choose API provider** (based on research results)
3. **Create GitHub repository**
4. **Setup development environment**
5. **Begin Phase 1: Project Setup**

## Appendix: API Research Summary
*(To be filled after librarian agent completes research)*

### Candidate APIs Comparison
| API | Free Tier | Rate Limit | Historical Data | CORS | Notes |
|-----|-----------|------------|-----------------|------|-------|
| Yahoo Finance | Unlimited | Unofficial | 1+ years | ❌ | Needs CORS proxy |
| Alpha Vantage | 25/day | Very low | 1+ years | ✅ | Too restrictive |
| Finnhub | 60/min | Good | 1+ years | ✅ | Requires key |
| Twelve Data | 800/day | Good | 1+ years | ✅ | Recommended |
| Polygon.io | 5 calls/min | Limited | Limited | ✅ | Basic tier |
| IEX Cloud | 50k messages/month | Good | 5 years | ✅ | Paid after free |

**Recommendation**: Twelve Data + Yahoo Finance fallback via serverless CORS proxy.