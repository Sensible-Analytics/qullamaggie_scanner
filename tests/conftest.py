import pytest
import subprocess
import time
import socket
from playwright.sync_api import sync_playwright

def is_port_open(port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('localhost', port)) == 0

@pytest.fixture(scope="session", autouse=True)
def streamlit_server():
    # Start Streamlit in a background process on a test-specific port
    port = 8502
    log_path = "/Users/prabhatranjan/IdeaProjects/qullamaggie_scanner/streamlit_test.log"
    
    # Force clean up any old process on this port
    subprocess.run(["pkill", "-f", f"server.port {port}"], capture_output=True)
    time.sleep(1)

    with open(log_path, "w") as log_file:
        streamlit_path = "/Users/prabhatranjan/IdeaProjects/qullamaggie_scanner/.venv/bin/streamlit"
        process = subprocess.Popen(
            [streamlit_path, "run", "ui/dashboard.py", "--server.port", str(port), "--server.headless", "true"],
            stdout=log_file,
            stderr=log_file,
            env={"PYTHONPATH": "."}
        )
        
        # Wait for server to start
        start_time = time.time()
        while not is_port_open(port):
            if time.time() - start_time > 20:
                process.terminate()
                raise RuntimeError(f"Streamlit server failed to start on port {port}. Check {log_path}")
            time.sleep(1)
            
        yield port
        process.terminate()
        process.wait()

@pytest.fixture(scope="function")
def browser_context():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        yield page
        browser.close()
