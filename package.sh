#!/bin/bash

# Package script for Kascade Thunderbird Extension
# This script creates a distributable XPI file

set -e

VERSION=$(grep '"version"' manifest.json | sed 's/.*"version": "\(.*\)".*/\1/')
PACKAGE_NAME="kascade-${VERSION}.xpi"

echo "Building Kascade v${VERSION}..."

# Remove old package if exists
if [ -f "$PACKAGE_NAME" ]; then
    echo "Removing old package: $PACKAGE_NAME"
    rm "$PACKAGE_NAME"
fi

# Create the XPI (ZIP) package
echo "Creating package..."
zip -r "$PACKAGE_NAME" \
    manifest.json \
    background.js \
    sidebar/ \
    icons/ \
    -x "*.DS_Store" "*~" "*.swp" "*.log"

echo "Package created: $PACKAGE_NAME"
echo "Installation: Open Thunderbird → Add-ons → Install Add-on From File → Select $PACKAGE_NAME"
