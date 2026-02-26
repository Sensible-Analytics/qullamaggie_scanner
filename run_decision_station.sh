#!/bin/bash

# Kill any existing streamlit processes
pkill -f streamlit

echo "🚀 Launching Next-Gen Qullamaggie Decision Station..."
echo "------------------------------------------------------"

# Use .venv streamlit if available
if [ -f "./.venv/bin/streamlit" ]; then
  ./.venv/bin/streamlit run ui/dashboard.py
else
  # Fallback to system streamlit
  streamlit run ui/dashboard.py
fi
