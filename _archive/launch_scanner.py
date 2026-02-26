#!/usr/bin/env python3
"""
Qullamaggie Scanner Launcher
Automatically launches the enhanced UI
"""

import sys
from pathlib import Path

# Add current directory to path
sys.path.insert(0, str(Path(__file__).parent))

from qullamaggie_ui_enhanced import main

if __name__ == "__main__":
    print("🎯 Launching Qullamaggie True Scanner UI...")
    print("Make sure TWS is running on port 7497")
    print("="*60)
    main()
