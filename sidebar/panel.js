/**
 * Kascade - Email Author List Plugin
 * Sidebar panel script
 */

// Regex pattern for extracting email from "Name <email@domain.com>" format
const EMAIL_REGEX = /<(.+?)>/;

let currentAuthor = null;
let currentMessageId = null;

// DOM elements
const authorInfo = document.getElementById('author-info');
const loading = document.getElementById('loading');
const noSelection = document.getElementById('no-selection');
const errorDiv = document.getElementById('error');
const errorMessage = document.getElementById('error-message');
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
      showError("Failed to search emails: " + response.error);
      console.error("Error:", response.error);
      return;
    }
    
    displayEmails(author, response.emails);
  } catch (error) {
    showError("Unable to communicate with background script. Please reload the extension.");
    console.error("Error loading emails:", error);
  }
}

/**
 * Display the list of emails
 */
function displayEmails(author, emails) {
  // Validate author parameter (defensive check - shouldn't happen in normal operation)
  if (!author || typeof author !== 'string' || author.trim() === '') {
    console.error("Invalid author parameter:", author);
    showError("Unable to display emails: missing author information.");
    return;
  }
  
  // Update author info
  const emailMatch = author.match(EMAIL_REGEX);
  const authorEmail = emailMatch ? emailMatch[1] : author;
  const authorName = author.replace(EMAIL_REGEX, '').trim() || authorEmail;
  
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
    
    // Add accessibility attributes
    li.setAttribute('role', 'button');
    li.setAttribute('tabindex', '0');
    li.setAttribute('aria-label', `${email.subject} from ${email.folder} on ${formatDate(email.date)}${email.read ? '' : ' (unread)'}${email.id === currentMessageId ? ' (current)' : ''}`);
    
    // Add click handler
    const openEmail = async () => {
      try {
        const response = await browser.runtime.sendMessage({
          type: "openMessage",
          messageId: email.id
        });
        if (response && !response.success && response.error) {
          showError("Unable to open email: " + response.error);
        }
      } catch (error) {
        console.error("Error opening message:", error);
        showError("Failed to open email. Please try again.");
      }
    };
    
    li.addEventListener('click', openEmail);
    
    // Add keyboard navigation support
    li.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openEmail();
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
  
  // Compare calendar dates, not timestamps
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dateStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffTime = todayStart.getTime() - dateStart.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    // Today - show time
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (diffDays === 1) {
    // Yesterday
    return 'Yesterday';
  } else if (diffDays < 7 && diffDays > 0) {
    // Within last week - show day of week
    return date.toLocaleDateString([], { weekday: 'short' });
  } else {
    // Older - show full date
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
function showError(message) {
  if (message) {
    errorMessage.textContent = message;
  }
  loading.classList.add('hidden');
  noSelection.classList.add('hidden');
  errorDiv.classList.remove('hidden');
  emailList.classList.add('hidden');
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  console.log("Sidebar panel loaded");
});
