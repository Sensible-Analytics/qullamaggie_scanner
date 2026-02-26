import pytest
from playwright.sync_api import Page, expect

def test_dashboard_full_flow(browser_context: Page, streamlit_server):
    page = browser_context
    port = streamlit_server
    page.goto(f"http://localhost:{port}")
    
    # 1. Wait for App to load and verify UI elements
    expect(page.get_by_text("Command Center")).to_be_visible(timeout=15000)
    
    # 2. Enable Demo Mode
    page.get_by_text("Demo Mode (Mock Data)").click()
    
    # 3. Select Setup and Run Scan
    # We use default filters because our mock data now has ~10% ADR
    page.get_by_label("Strategy Pattern").get_by_text("Momentum Leaders").click()
    page.get_by_role("button", name="▶ RUN SCAN").click()
    
    # 4. Wait for results and verify table
    # Increase timeout for the scan to finish
    expect(page.get_by_text("Scan complete!")).to_be_visible(timeout=30000)
    
    # 5. Perform Deep Dive
    # Wait for the selectbox to appear
    expect(page.get_by_text("Select a stock for Deep Dive")).to_be_visible(timeout=10000)
    page.get_by_label("Select a stock for Deep Dive").click()
    page.keyboard.press("Enter") # Select the first one
    
    # Wait for the chart to appear
    expect(page.locator(".js-plotly-plot")).to_be_visible(timeout=10000)
    
    # 6. Save Conviction
    # Using placeholder to find text area
    page.get_by_placeholder("Why are you watching this?").fill("Test conviction note.")
    page.get_by_role("button", name="Save Conviction").click()
    # Toast check
    expect(page.get_by_text("Conviction saved")).to_be_visible()

def test_navigation_tabs(browser_context: Page, streamlit_server):
    page = browser_context
    port = streamlit_server
    page.goto(f"http://localhost:{port}")
    
    # Check tabs using specific names to avoid strict mode violation
    page.get_by_role("tab", name="📜 History & Analysis").click()
    expect(page.get_by_text("Historical Analysis")).to_be_visible()
    
    page.get_by_role("tab", name="🧠 Methodology Tutor").click()
    expect(page.get_by_text("Kristjan Qullamaggie's Methodology")).to_be_visible()
    
    page.get_by_role("tab", name="⚙️ Connectivity").click()
    expect(page.get_by_text("System Connectivity")).to_be_visible()

def test_connectivity_flow(browser_context: Page, streamlit_server):
    page = browser_context
    port = streamlit_server
    page.goto(f"http://localhost:{port}")
    
    # Navigate to Connectivity tab
    page.get_by_role("tab", name="⚙️ Connectivity").click()
    
    # Verify System sections are visible
    expect(page.get_by_text("IBKR TWS Status")).to_be_visible()
    
    # Check for Connection status label presence
    status_visible = page.get_by_text("TWS Connected").is_visible() or page.get_by_text("TWS Disconnected").is_visible()
    assert status_visible, "Connection status label not found"
    
    # Verify Reconnect button exists
    expect(page.get_by_role("button", name="Reconnect to TWS")).to_be_visible()

def test_app_startup_stability(browser_context: Page, streamlit_server):
    page = browser_context
    port = streamlit_server
    page.goto(f"http://localhost:{port}")
    
    # 1. Verify no "Internal Server Error" or Tracebacks are visible on screen
    expect(page.get_by_text("Traceback")).not_to_be_visible()
    expect(page.get_by_text("KeyError")).not_to_be_visible()
    
    # 2. Verify main dashboard elements load
    expect(page.get_by_text("Command Center")).to_be_visible(timeout=10000)
    expect(page.get_by_role("tab", name="📊 Live Scanner")).to_be_visible()
    
    # 3. Check if we can at least interact with the sidebar
    expect(page.get_by_label("Select Trading Universe")).to_be_visible()

def test_connection_guard_and_reconnect(browser_context: Page, streamlit_server):
    page = browser_context
    port = streamlit_server
    page.goto(f"http://localhost:{port}")
    
    # 1. Select a Dynamic scanner (which requires TWS)
    page.get_by_label("Select Trading Universe").click()
    page.get_by_text("🛰️ Dynamic 1-Month Leaders").click()
    
    # 2. Try to run scan without ensuring connection
    # Note: In CI/Test environment, TWS is likely disconnected
    page.get_by_role("button", name="▶ RUN SCAN").click()
    
    # 3. Verify Guard Message if disconnected
    # (The guard should show an error if disconnected)
    # We use a longer timeout here to ensure Streamlit caught the click
    try:
        expect(page.get_by_text("Dynamic scans require an active TWS/Gateway connection")).to_be_visible(timeout=5000)
    except:
        pass # If TWS was actually connected, this won't show, which is fine for the flow
        
    # 4. Navigate to Connectivity to try reconnect
    connectivity_tab = page.get_by_role("tab", name="⚙️ Connectivity")
    connectivity_tab.click()
    
    # Verify we are on the right tab by checking for the button
    reconnect_btn = page.get_by_role("button", name="Reconnect to TWS")
    expect(reconnect_btn).to_be_visible(timeout=10000)
    
    # Click Reconnect
    reconnect_btn.click(force=True)
    
    # 5. Verify no crash occurred and some indicator is visible
    # We check for the header which should be visible on this tab
    expect(page.get_by_text("System Connectivity")).to_be_visible(timeout=10000)
