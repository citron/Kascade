/**
 * Kascade - Email Author List Plugin
 * Background script to handle message display events
 */

// Track the current sidebar panel
let sidebarPanel = null;

// Listen for message display events
browser.messageDisplay.onMessageDisplayed.addListener(async (tab, message) => {
  console.log("Message displayed:", message);
  
  if (!message) {
    return;
  }

  // Get the sender's email address
  const author = message.author;
  console.log("Author:", author);

  // Open or update the sidebar with the author's emails
  await updateSidebar(tab, author, message);
});

/**
 * Update the sidebar with emails from the specified author
 */
async function updateSidebar(tab, author, currentMessage) {
  try {
    // Open the sidebar if not already open
    if (!sidebarPanel) {
      await browser.sidebarAction.open();
      sidebarPanel = true;
    }

    // Send message to sidebar with author info
    browser.runtime.sendMessage({
      type: "updateAuthor",
      author: author,
      currentMessageId: currentMessage.id
    });
  } catch (error) {
    console.error("Error updating sidebar:", error);
  }
}

// Handle messages from the sidebar
browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === "getEmailsByAuthor") {
    try {
      const emails = await searchEmailsByAuthor(message.author);
      return Promise.resolve({ emails: emails });
    } catch (error) {
      console.error("Error searching emails:", error);
      return Promise.resolve({ emails: [], error: error.message });
    }
  } else if (message.type === "openMessage") {
    try {
      // Open the message in a new tab
      await browser.mailTabs.setSelectedMessages([message.messageId]);
      return Promise.resolve({ success: true });
    } catch (error) {
      console.error("Error opening message:", error);
      return Promise.resolve({ success: false, error: error.message });
    }
  }
  return false;
});

/**
 * Search for all emails from a specific author
 */
async function searchEmailsByAuthor(author) {
  const results = [];
  
  try {
    // Get all mail accounts
    const accounts = await browser.accounts.list();
    
    // Extract email address from author string (format: "Name <email@domain.com>")
    const emailMatch = author.match(/<(.+?)>/);
    const authorEmail = emailMatch ? emailMatch[1] : author;
    
    console.log("Searching for emails from:", authorEmail);
    
    // Search through all folders in all accounts
    for (const account of accounts) {
      await searchFolders(account.folders, authorEmail, results);
    }
    
    // Sort by date (newest first)
    results.sort((a, b) => b.date.getTime() - a.date.getTime());
    
  } catch (error) {
    console.error("Error in searchEmailsByAuthor:", error);
  }
  
  return results;
}

/**
 * Recursively search folders for emails from the specified author
 */
async function searchFolders(folders, authorEmail, results) {
  for (const folder of folders) {
    try {
      // Query messages in this folder
      let page = await browser.messages.list(folder);
      
      do {
        for (const message of page.messages) {
          // Check if the message is from the specified author
          const messageEmailMatch = message.author.match(/<(.+?)>/);
          const messageEmail = messageEmailMatch ? messageEmailMatch[1] : message.author;
          
          if (messageEmail.toLowerCase() === authorEmail.toLowerCase()) {
            results.push({
              id: message.id,
              subject: message.subject || "(No subject)",
              author: message.author,
              date: message.date,
              folder: folder.path,
              read: message.read
            });
          }
        }
        
        // Get next page if available
        if (page.id) {
          page = await browser.messages.continueList(page.id);
        } else {
          break;
        }
      } while (page.messages.length > 0);
      
    } catch (error) {
      console.error(`Error searching folder ${folder.path}:`, error);
    }
    
    // Recursively search subfolders
    if (folder.subFolders && folder.subFolders.length > 0) {
      await searchFolders(folder.subFolders, authorEmail, results);
    }
  }
}
