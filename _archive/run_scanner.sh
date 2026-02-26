#!/bin/bash
# Qullamaggie Scanner Launcher for macOS/Linux

echo "🎯 Qullamaggie True Scanner"
echo "="
echo ""
echo "Checking TWS connection..."
echo ""

# Get the directory of this script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Change to script directory
cd "$SCRIPT_DIR"

# Check if virtual environment exists
if [ -d "../.venv" ]; then
    echo "Using virtual environment..."
    source ../.venv/bin/activate
fi

# Launch the scanner
python3 launch_scanner.py

# Keep terminal open on error
if [ $? -ne 0 ]; then
    echo ""
    echo "Press Enter to exit..."
    read
fi
