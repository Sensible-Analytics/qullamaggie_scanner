# Frontend-Only Qullamaggie Scanner Architecture

## 1. Overview
A static, browser-based stock scanner that calculates Qullamaggie momentum metrics using free public APIs. Designed for zero-cost hosting (Vercel/Netlify/GitHub Pages) with no backend requirements.

## 2. Core Features
- **Real-time scanning**: Calculate momentum scores on-demand
- **Browser caching**: IndexedDB for historical data, localStorage for config
- **Professional UI**: Responsive, chart-rich dashboard
- **No authentication**: Public access, no user accounts
- **Showcase ready**: Demonstrates consultancy capabilities

## 3. Technology Stack
| Layer | Technology | Justification |
|-------|------------|---------------|
| **Framework** | React 18 + TypeScript | Component-based, strong typing for financial calculations |
| **Build** | Vite | Fast HMR, optimized builds, static export |
| **State** | Zustand | Lightweight, reactive state management |
| **Charts** | Lightweight Charts (TradingView) | Professional financial charts, performance |
| **Styling** | Tailwind CSS | Rapid UI development, consistent design |
| **Data Fetching** | TanStack Query | Caching, deduplication, background updates |
| **Storage** | Dexie.js (IndexedDB wrapper) | Structured local database for OHLCV data |
| **Hosting** | Vercel (free tier) | Global CDN, serverless functions if needed |

## 4. Data Flow
```
User → Select Universe (S&P 500) → Check Cache → Fetch Missing Data → 
Calculate Metrics → Filter/Sort → Display Results → Update Charts
```

## 5. Caching Strategy
| Data Type | Storage | TTL | Size Estimate |
|-----------|---------|-----|---------------|
| **OHLCV History** | IndexedDB | 24 hours | ~50KB per symbol (1 year daily) |
| **Quote Data** | localStorage | 5 minutes | ~1KB per symbol |
| **Universe Lists** | localStorage | 7 days | ~10KB per list |
| **User Preferences** | localStorage | Persistent | ~1KB |

## 6. API Requirements
- **Historical Data**: 1+ years daily OHLCV for US stocks
- **Real-time Quotes**: Current price, volume
- **Rate Limits**: Must handle 500+ symbols without hitting limits
- **CORS**: Browser-accessible endpoints

## 7. Component Structure
```
App
├── Header
├── ScannerControls
│   ├── UniverseSelector
│   ├── FilterSettings
│   └── ScanButton
├── ResultsTable
│   ├── StockRow
│   └── ScoreBadge
├── DetailPanel
│   ├── PriceChart
│   ├── MetricsPanel
│   └── SignalBreakdown
└── Footer
```

## 8. Calculation Engine (JavaScript Port)
Port Python calculations to TypeScript:
- **ADR%**: `(high - low) / close * 100` rolling 20-day average
- **RS Momentum**: `(current_price / period_low - 1) * 100`
- **EMA Alignment**: Distance from EMA10/20/50
- **Tightness**: Recent range vs ADR
- **Volume Surge**: Recent volume vs 20-day average
- **Score**: 0-20 point system matching Python implementation

## 9. Performance Considerations
- **Web Workers**: Run heavy calculations off main thread
- **Progressive Loading**: Show results as they're calculated
- **Request Deduplication**: Batch API calls for multiple symbols
- **Lazy Loading**: Only fetch data for visible symbols

## 10. Deployment Strategy
1. **GitHub Repository**: Separate frontend repo (or `/frontend/` subdirectory)
2. **CI/CD**: GitHub Actions → Vercel deployment
3. **Environment Variables**: API keys (if required) via Vercel environment
4. **Analytics**: Optional Plausible/Umami for usage tracking

## 11. Development Phases
### Phase 1: Foundation (Week 1)
- Project setup (Vite + React + TypeScript)
- Basic UI layout with Tailwind
- API service layer with caching
- Calculation engine (TypeScript port)

### Phase 2: Core Features (Week 2)
- Universe selector (S&P 500, NASDAQ 100, custom)
- Results table with sorting/filtering
- Basic chart integration
- Local caching implementation

### Phase 3: Advanced Features (Week 3)
- Detail panel with interactive charts
- Web Workers for calculations
- Real-time updates (WebSocket if available)
- Export functionality (CSV/PNG)

### Phase 4: Polish & Deploy (Week 4)
- UI/UX polish, responsive design
- Performance optimization
- Documentation (README, component docs)
- Deployment to Vercel

## 12. Risks & Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| **API Rate Limits** | High | Aggressive caching, request batching, fallback APIs |
| **CORS Issues** | Medium | Use CORS proxy or serverless functions |
| **Calculation Performance** | Medium | Web Workers, optimized algorithms |
| **Data Quality** | High | Validation, multiple data sources |
| **Browser Compatibility** | Low | Babel, polyfills, modern browser targeting