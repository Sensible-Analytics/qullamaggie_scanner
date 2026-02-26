#!/bin/bash

echo "🧪 Running Qullamaggie Decision Station E2E Tests..."
echo "----------------------------------------------------"

# 1. Install playwright if needed
# pip install pytest-playwright
# playwright install chromium

# 2. Run the tests
# We use -s to see print output and --headed if you want to see the browser
pytest tests/test_e2e_dashboard.py -v
