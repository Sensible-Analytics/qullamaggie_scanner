#!/bin/bash
set -e

cd "$(dirname "$0")"

echo "========================================"
echo "Qullamaggie Scanner - Vercel Deployment"
echo "========================================"

if ! command -v vercel &> /dev/null; then
    echo "Vercel CLI not found. Installing..."
    npm install -g vercel
fi

echo ""
echo "Available commands:"
echo "  ./vercel.sh          - Deploy to preview"
echo "  ./vercel.sh prod     - Deploy to production"
echo "  ./vercel.sh env      - Set environment variables"
echo ""

if [ "$1" = "env" ]; then
    echo "Setting up environment variables in Vercel..."
    echo ""
    echo "Get your API keys from:"
    echo "  - Twelve Data: https://twelvedata.com/pricing"
    echo "  - EODHD: https://eodhd.com/"
    echo ""
    echo "Then run:"
    echo "  vercel env add VITE_TWELVE_DATA_API_KEY"
    echo "  vercel env add VITE_EODHD_API_KEY"
    echo ""
    echo "Or set them in the Vercel dashboard:"
    echo "  https://vercel.com/dashboard -> Settings -> Environment Variables"
    exit 0
fi

if [ "$1" = "prod" ]; then
    echo "Deploying to PRODUCTION..."
    vercel --prod
else
    echo "Deploying to PREVIEW..."
    vercel
fi

echo ""
echo "========================================"
echo "Deployment complete!"
echo "========================================"
