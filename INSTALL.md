# Installation and Testing Guide for Kascade

## Installation Steps

### Option 1: Install from Source (Temporary Development Installation)

1. **Clone or Download the Repository**:
   ```bash
   git clone https://github.com/citron/Kascade.git
   cd Kascade
   ```

2. **Open Thunderbird**:
   - Launch Mozilla Thunderbird

3. **Access Add-ons Manager**:
   - Click the menu button (☰) → Add-ons and Themes
   - OR press `Ctrl+Shift+A` (Windows/Linux) or `Cmd+Shift+A` (Mac)

4. **Install the Add-on**:
   - Click the gear icon (⚙️) in the top-right corner
   - Select "Debug Add-ons" from the dropdown
   - Click "Load Temporary Add-on..."
   - Navigate to the Kascade folder
   - Select the `manifest.json` file
   - Click "Open"

   **Note**: Temporary add-ons are removed when Thunderbird closes. You'll need to reinstall each time you restart.

### Option 2: Package and Install (Persistent Installation)

1. **Create a ZIP package**:
   ```bash
   cd Kascade
   zip -r kascade-1.0.0.xpi manifest.json background.js sidebar/ icons/
   ```

2. **Install the XPI file**:
   - Open Thunderbird Add-ons Manager (`Ctrl+Shift+A`)
   - Click the gear icon (⚙️)
   - Select "Install Add-on From File..."
   - Select the `kascade-1.0.0.xpi` file
   - Click "Add" when prompted

   **Note**: You may need to enable unsigned add-ons in Thunderbird settings for development.

## Testing the Plugin

### 1. Enable the Sidebar

After installation:
1. Go to **View** → **Sidebar** → **Emails from Author**
2. The sidebar should appear on the right side of the Thunderbird window
3. Initially, you should see: "Select an email to view all messages from the same author."

### 2. Test Basic Functionality

1. **Select an Email**:
   - Click on any email in your inbox or any folder
   - The sidebar should update to show "Loading emails..."
   - Then display all emails from that sender

2. **Verify Email List**:
   - Check that the author's name/email is displayed in the header
   - Verify the count shows "X emails found"
   - Confirm each email shows:
     - Subject line
     - Date (formatted as time, "Yesterday", day of week, or full date)
     - Folder location

3. **Test Current Email Highlighting**:
   - The currently selected email should be highlighted in blue
   - It should have a blue left border

4. **Test Unread Status**:
   - Unread emails should have bold subject lines

5. **Test Email Navigation**:
   - Click on any email in the sidebar list
   - The main panel should update to show that email
   - The sidebar should re-highlight the newly selected email

### 3. Test Edge Cases

1. **Author with Few Emails**:
   - Select an email from a sender who has only sent 1-2 emails
   - Verify the count is correct

2. **Author with Many Emails**:
   - Select an email from a frequent sender (10+ emails)
   - Verify all emails are loaded
   - Test scrolling through the list

3. **Different Folders**:
   - Verify emails from the same author in different folders are all shown
   - Check that folder paths are displayed correctly

4. **Multiple Accounts**:
   - If you have multiple email accounts, verify the search works across all accounts

5. **Different Email Formats**:
   - Test with authors formatted as:
     - "John Doe <john@example.com>"
     - "john@example.com"
     - "John Doe"

### 4. Test Error Handling

1. **No Email Selected**:
   - Close and reopen the sidebar
   - Verify it shows the "Select an email..." message

2. **Empty Mailbox**:
   - If possible, test with a fresh/empty mailbox
   - Should handle gracefully with "0 emails found"

## Debugging

### Enable Developer Console

1. **Open Developer Tools**:
   - Tools → Developer Tools → Developer Toolbox
   - OR press `Ctrl+Shift+I`

2. **Check Console Output**:
   - Look for console.log messages from the plugin
   - Watch for any error messages in red

3. **Check Background Script Console**:
   - In the Developer Toolbox, go to the "Console" tab
   - Filter for messages from "background.js"

### Common Issues

1. **Sidebar doesn't appear**:
   - Check that the add-on is enabled in Add-ons Manager
   - Try restarting Thunderbird
   - Check the console for errors

2. **Emails don't load**:
   - Open the console and look for error messages
   - Verify the permissions are granted
   - Check that you have emails in your mailbox

3. **Clicking emails doesn't work**:
   - Check the console for JavaScript errors
   - Verify the message IDs are being passed correctly

## Uninstalling

1. Open Add-ons Manager (`Ctrl+Shift+A`)
2. Find "Kascade - Email Author List" in the list
3. Click the three dots (⋯) → Remove
4. Restart Thunderbird

## Development Tips

### Making Changes

1. Edit the source files as needed
2. Restart Thunderbird to reload the extension
3. Or use the "Reload" button in the Debug Add-ons page

### Viewing Logs

All console.log statements in the code will appear in:
- **Background script logs**: Developer Toolbox → Console
- **Sidebar logs**: Right-click in sidebar → Inspect Element → Console

## Support

For issues or questions:
- File an issue on GitHub: https://github.com/citron/Kascade/issues
- Check Thunderbird WebExtension documentation: https://webextension-api.thunderbird.net/
