# Kascade - Email Author List Plugin

A Thunderbird add-on that enhances your email viewing experience by displaying a list of all emails from the same author when you select a message.

## Features

- 📧 **Automatic Author Detection**: Automatically identifies the sender when you click on an email
- 📋 **Sidebar Panel**: Displays all emails from the same author in an easy-to-navigate sidebar
- 🔍 **Complete Search**: Searches through all folders and accounts to find matching emails
- 📅 **Smart Date Formatting**: Shows dates in an intuitive format (time, yesterday, day of week, or full date)
- 📁 **Folder Location**: Displays the folder path for each email
- ✨ **Visual Indicators**: Highlights the currently selected email and marks unread messages
- 🖱️ **Quick Navigation**: Click on any email in the sidebar to view it immediately

## Installation

### From Source (Development)

1. Clone this repository:
   ```bash
   git clone https://github.com/citron/Kascade.git
   cd Kascade
   ```

2. Open Thunderbird and navigate to Add-ons Manager:
   - Open Thunderbird
   - Go to Tools → Add-ons and Themes (or press Ctrl+Shift+A)

3. Install the add-on:
   - Click the gear icon ⚙️ and select "Install Add-on From File..."
   - Navigate to the cloned repository folder and select `manifest.json`
   - Confirm the installation

### From Release (Coming Soon)

Once published, you'll be able to install directly from the Thunderbird Add-ons website.

## Usage

1. **Open the Sidebar**:
   - Go to View → Sidebar → Emails from Author
   - Or use the sidebar toggle button

2. **View Emails from an Author**:
   - Click on any email in your mailbox
   - The sidebar will automatically update to show all emails from that sender
   - The list includes subject, date, and folder location for each email

3. **Navigate Between Emails**:
   - Click on any email in the sidebar list to view it
   - The currently selected email is highlighted in blue

## Requirements

- Thunderbird 102.0 or higher

## Permissions

This add-on requires the following permissions:
- **messagesRead**: To read email metadata (subject, sender, date, folder)
- **accountsRead**: To search through all mail accounts and folders

## Development

### Project Structure

```
Kascade/
├── manifest.json           # Extension manifest
├── background.js          # Background script for message handling
├── sidebar/
│   ├── panel.html        # Sidebar UI
│   ├── panel.js          # Sidebar logic
│   └── panel.css         # Sidebar styling
└── icons/
    └── icon-64.png       # Extension icon
```

### Building

This is a pure WebExtension (MailExtension) and doesn't require a build step. The source files are loaded directly by Thunderbird.

### Debugging

1. Open Thunderbird's Developer Tools Console:
   - Tools → Developer Tools → Developer Toolbox
   - Or press Ctrl+Shift+I

2. Check the console for any error messages or debug output

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Created by citron

## Support

If you encounter any issues or have suggestions, please file an issue on the [GitHub repository](https://github.com/citron/Kascade/issues).
