#!/usr/bin/env python3
"""
Pre-flight check for Qullamaggie Scanner
Tests all dependencies and connections before running
"""

import sys
from pathlib import Path

def check_imports():
    """Check all required imports"""
    print("Checking Python packages...")
    
    required = {
        'tkinter': 'tkinter (built-in)',
        'pandas': 'pandas',
        'ib_insync': 'ib_insync',
    }
    
    missing = []
    for module, name in required.items():
        try:
            __import__(module)
            print(f"  ✅ {name}")
        except ImportError:
            print(f"  ❌ {name} - MISSING")
            missing.append(name)
    
    return missing

def check_files():
    """Check all required files exist"""
    print("\nChecking files...")
    
    base = Path(__file__).parent
    required_files = [
        'launch_scanner.py',
        'qullamaggie_ui_enhanced.py',
        'true_qullamaggie_scanner.py',
        'README_AUTOMATED.md',
    ]
    
    missing = []
    for file in required_files:
        filepath = base / file
        if filepath.exists():
            print(f"  ✅ {file}")
        else:
            print(f"  ❌ {file} - MISSING")
            missing.append(file)
    
    return missing

def check_tws_connection():
    """Try to connect to TWS"""
    print("\nChecking TWS connection...")
    
    try:
        from ib_insync import IB
        
        ib = IB()
        ib.connect('127.0.0.1', 7497, clientId=999, timeout=5)
        
        print("  ✅ TWS connection successful")
        print(f"  ✅ Account: {ib.accountValues()[0].account if ib.accountValues() else 'N/A'}")
        
        ib.disconnect()
        return True
        
    except ImportError:
        print("  ❌ ib_insync not installed")
        return False
    except Exception as e:
        print(f"  ❌ Cannot connect to TWS: {e}")
        print("\n  Troubleshooting:")
        print("  1. Make sure TWS is running")
        print("  2. Enable API in TWS: File > Global Configuration > API > Settings")
        print("  3. Check port is 7497")
        return False

def check_directories():
    """Check and create required directories"""
    print("\nChecking directories...")
    
    base = Path(__file__).parent.parent
    results_dir = base / "ibkr_tws" / "scanner_results"
    
    if not results_dir.exists():
        results_dir.mkdir(parents=True, exist_ok=True)
        print(f"  ✅ Created scanner_results directory")
    else:
        print(f"  ✅ scanner_results directory exists")
    
    return True

def main():
    print("="*60)
    print("🎯 QULLAMAGGIE SCANNER PRE-FLIGHT CHECK")
    print("="*60)
    print()
    
    # Check Python version
    print(f"Python version: {sys.version.split()[0]}")
    if sys.version_info < (3, 7):
        print("  ❌ Python 3.7+ required")
        return False
    else:
        print("  ✅ Python version OK")
    print()
    
    # Check imports
    missing_packages = check_imports()
    
    # Check files
    missing_files = check_files()
    
    # Check directories
    check_directories()
    
    # Check TWS
    tws_ok = check_tws_connection()
    
    # Summary
    print("\n" + "="*60)
    print("SUMMARY")
    print("="*60)
    
    all_good = True
    
    if missing_packages:
        print(f"❌ Missing packages: {', '.join(missing_packages)}")
        print(f"   Install with: pip install {' '.join(missing_packages)}")
        all_good = False
    else:
        print("✅ All packages installed")
    
    if missing_files:
        print(f"❌ Missing files: {', '.join(missing_files)}")
        all_good = False
    else:
        print("✅ All files present")
    
    if tws_ok:
        print("✅ TWS connection working")
    else:
        print("❌ TWS connection failed - see troubleshooting above")
        all_good = False
    
    print()
    
    if all_good:
        print("🎉 ALL CHECKS PASSED - READY TO RUN!")
        print()
        print("To start scanner:")
        print("  python3 launch_scanner.py")
        print()
    else:
        print("⚠️  SOME CHECKS FAILED - Fix issues above before running")
        print()
    
    return all_good

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
