import os
import subprocess
import sys
import platform

def main():
    print(f"===================================================")
    print(f"Building Qullamaggie Scanner for {platform.system()}")
    print(f"===================================================")
    
    # 1. Ensure required directories exist
    os.makedirs("data", exist_ok=True)
    if not os.path.exists("data/universes.json"):
        with open("data/universes.json", "w") as f:
            f.write("{}")

    # 2. Create the PyInstaller entry point script
    print("Creating entry point script (run_app.py)...")
    entry_point = """import os
import sys
import webbrowser
import threading
import time
import socket
import streamlit.web.cli as stcli

def is_port_open(port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('localhost', port)) == 0

def open_browser():
    port = 8501
    # Wait for server to start
    for _ in range(30):
        if is_port_open(port):
            time.sleep(1) # Give it an extra second to be fully ready
            webbrowser.open(f"http://localhost:{port}")
            return
        time.sleep(1)

if __name__ == "__main__":
    if getattr(sys, 'frozen', False):
        application_path = sys._MEIPASS
    else:
        application_path = os.path.dirname(os.path.abspath(__file__))

    os.chdir(application_path)
    
    # Start browser opener thread
    threading.Thread(target=open_browser, daemon=True).start()

    # Launch Streamlit
    script_path = os.path.join("ui", "dashboard.py")
    sys.argv = ["streamlit", "run", script_path, "--global.developmentMode=false", "--server.headless=true"]
    sys.exit(stcli.main())
"""
    with open("run_app.py", "w") as f:
        f.write(entry_point)

    # 3. Path separator depends on OS for PyInstaller --add-data
    sep = ";" if platform.system() == "Windows" else ":"

    # 4. Construct PyInstaller command
    cmd = [
        "pyinstaller",
        "--noconfirm",
        "--onedir",
        "--windowed",
        f"--add-data=ui{sep}ui",
        f"--add-data=ibkr_tws{sep}ibkr_tws",
        f"--add-data=data{sep}data",
        f"--add-data=settings.json{sep}.",
        "--copy-metadata=streamlit",
        "--copy-metadata=plotly",
        "--copy-metadata=yfinance",
        "--hidden-import=ib_insync",
        "--hidden-import=yfinance",
        "--hidden-import=plotly",
        "--hidden-import=pandas",
        "--hidden-import=streamlit",
        "--name=QullamaggieScanner",
        "run_app.py"
    ]
    
    print(f"Running PyInstaller...")
    print(" ".join(cmd))
    
    # 5. Execute
    try:
        subprocess.run(cmd, check=True)
        print("Build completed successfully!")
    except subprocess.CalledProcessError as e:
        print(f"Build failed with exit code {e.returncode}")
        sys.exit(1)

if __name__ == "__main__":
    main()
