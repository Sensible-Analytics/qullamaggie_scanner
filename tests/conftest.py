import pytest
import subprocess
import time
import socket
import shutil
from pathlib import Path

PROJECT_ROOT = Path(__file__).parent.parent

def is_port_open(port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('localhost', port)) == 0

@pytest.fixture(scope="session", autouse=True)
def streamlit_server():
    # Start Streamlit in a background process on a test-specific port
    port = 8502
    log_path = PROJECT_ROOT / "streamlit_test.log"

    # Force clean up any old process on this port
    subprocess.run(["pkill", "-f", f"server.port {port}"], capture_output=True)
    time.sleep(1)

    # Find streamlit executable
    streamlit_path = shutil.which("streamlit")
    venv_streamlit = PROJECT_ROOT / ".venv" / "bin" / "streamlit"
    if venv_streamlit.exists():
        streamlit_path = str(venv_streamlit)

    if not streamlit_path:
        pytest.skip("Streamlit not found in PATH or .venv")

    with open(log_path, "w") as log_file:
        process = subprocess.Popen(
            [streamlit_path, "run", "ui/dashboard.py", "--server.port", str(port), "--server.headless", "true"],
            stdout=log_file,
            stderr=log_file,
            cwd=str(PROJECT_ROOT),
            env={"PYTHONPATH": str(PROJECT_ROOT), "PATH": "/usr/bin:/usr/local/bin"}
        )

        # Wait for server to start
        start_time = time.time()
        while not is_port_open(port):
            if time.time() - start_time > 20:
                process.terminate()
                pytest.skip(f"Streamlit server failed to start on port {port}")
            time.sleep(1)

        yield port
        process.terminate()
        process.wait()

@pytest.fixture(scope="function")
def browser_context():
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        pytest.skip("Playwright not installed — install with: pip install pytest-playwright playwright")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        yield page
        browser.close()
