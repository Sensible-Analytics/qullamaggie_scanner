#!/bin/bash

APP_NAME="Qullamaggie Decision Station"
APP_DIR="${APP_NAME}.app"
CONTENTS_DIR="${APP_DIR}/Contents"
MACOS_DIR="${CONTENTS_DIR}/MacOS"

echo "📦 Bundling ${APP_NAME} for macOS..."

# 1. Create directory structure
mkdir -p "${MACOS_DIR}"

# 2. Create the Launcher script
cat <<EOF > "${MACOS_DIR}/launcher"
#!/bin/bash
# Get the directory of the script
DIR="\$( cd "\$( dirname "\${BASH_SOURCE[0]}" )" && pwd )"
# Navigate to the project root (assuming the .app is in the root)
cd "\$DIR/../../../"

# Launch Streamlit
./run_decision_station.sh
EOF

# 3. Make launcher executable
chmod +x "${MACOS_DIR}/launcher"

# 4. Create basic Info.plist
cat <<EOF > "${CONTENTS_DIR}/Info.plist"
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleExecutable</key>
    <string>launcher</string>
    <key>CFBundleIconFile</key>
    <string>AppIcon</string>
    <key>CFBundleIdentifier</key>
    <string>com.qullamaggie.scanner</string>
    <key>CFBundleName</key>
    <string>${APP_NAME}</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>CFBundleShortVersionString</key>
    <string>4.0</string>
</dict>
</plist>
EOF

echo "✅ Created ${APP_DIR}."
echo "You can now drag this app to your /Applications folder or run it from the Finder!"
