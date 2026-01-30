/**
 * Kascade - Email Author List Plugin
 * Sidebar panel script
 */

let currentAuthor = null;
let currentMessageId = null;

// DOM elements
const authorInfo = document.getElementById('author-info');
const loading = document.getElementById('loading');
const noSelection = document.getElementById('no-selection');
const errorDiv = document.getElementById('error');
const emailList = document.getElementById('email-list');
const emailsUl = document.getElementById('emails');
const countInfo = document.getElementById('count-info');

// Listen for messages from background script
browser.runtime.onMessage.addListener(async (message, sender) => {
  if (message.type === "updateAuthor") {
    currentAuthor = message.author;
    currentMessageId = message.currentMessageId;
    await loadEmailsByAuthor(currentAuthor);
  }
});

/**
 * Load and display emails from the specified author
 */
async function loadEmailsByAuthor(author) {
  // Show loading state
  showLoading();
  
  try {
    // Request emails from background script
    const response = await browser.runtime.sendMessage({
      type: "getEmailsByAuthor",
      author: author
    });
    
    if (response.error) {
      showError();
      console.error("Error:", response.error);
      return;
    }
    
    displayEmails(author, response.emails);
  } catch (error) {
    showError();
    console.error("Error loading emails:", error);
  }
}

/**
 * Display the list of emails
 */
function displayEmails(author, emails) {
  // Update author info
  const emailMatch = author.match(/<(.+?)>/);
  const authorEmail = emailMatch ? emailMatch[1] : author;
  const authorName = author.replace(/<.*?>/, '').trim() || authorEmail;
  
  authorInfo.textContent = authorName;
  authorInfo.title = authorEmail;
  
  // Update count
  countInfo.textContent = `${emails.length} email${emails.length !== 1 ? 's' : ''} found`;
  
  // Clear previous emails
  emailsUl.innerHTML = '';
  
  // Add emails to list
  emails.forEach(email => {
    const li = document.createElement('li');
    li.className = 'email-item';
    
    // Highlight current message
    if (email.id === currentMessageId) {
      li.classList.add('current');
    }
    
    // Mark unread emails
    if (!email.read) {
      li.classList.add('unread');
    }
    
    // Create email item structure
    const subject = document.createElement('div');
    subject.className = 'subject';
    subject.textContent = email.subject;
    
    const metadata = document.createElement('div');
    metadata.className = 'metadata';
    
    const date = document.createElement('span');
    date.className = 'date';
    date.textContent = formatDate(email.date);
    
    const folder = document.createElement('span');
    folder.className = 'folder';
    folder.textContent = email.folder;
    folder.title = email.folder;
    
    metadata.appendChild(date);
    metadata.appendChild(folder);
    
    li.appendChild(subject);
    li.appendChild(metadata);
    
    // Add click handler
    li.addEventListener('click', async () => {
      try {
        await browser.runtime.sendMessage({
          type: "openMessage",
          messageId: email.id
        });
      } catch (error) {
        console.error("Error opening message:", error);
      }
    });
    
    emailsUl.appendChild(li);
  });
  
  // Show email list
  showEmailList();
}

/**
 * Format date for display
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return date.toLocaleDateString([], { weekday: 'short' });
  } else {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  }
}

/**
 * Show loading state
 */
function showLoading() {
  loading.classList.remove('hidden');
  noSelection.classList.add('hidden');
  errorDiv.classList.add('hidden');
  emailList.classList.add('hidden');
}

/**
 * Show email list
 */
function showEmailList() {
  loading.classList.add('hidden');
  noSelection.classList.add('hidden');
  errorDiv.classList.add('hidden');
  emailList.classList.remove('hidden');
}

/**
 * Show error state
 */
function showError() {
  loading.classList.add('hidden');
  noSelection.classList.add('hidden');
  errorDiv.classList.remove('hidden');
  emailList.classList.add('hidden');
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  console.log("Sidebar panel loaded");
});
