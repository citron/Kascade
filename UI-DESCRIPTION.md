# Kascade Plugin - UI/UX Description

## Visual Overview

This document describes the visual appearance and user experience of the Kascade Thunderbird plugin.

## Main Interface

### Thunderbird Window Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│ Thunderbird - Main Window                                   [_][□][X]│
├─────────────────────────────────────────────────────────────────────┤
│ File  Edit  View  Tools  Help                                        │
├─────────────────┬───────────────────────┬─────────────────────────────┤
│                 │                       │                           │
│  Folder List    │   Message List        │   Emails from Author    │
│                 │                       │   ┌─────────────────────┐ │
│  📁 Inbox       │  [Email 1]            │   │ Emails from Author  │ │
│  📁 Sent        │  [Email 2] ◄─ Selected│   │ john@example.com    │ │
│  📁 Drafts      │  [Email 3]            │   └─────────────────────┘ │
│  📁 Trash       │  [Email 4]            │                           │
│                 │  [Email 5]            │   5 emails found          │
│                 │                       │   ┌─────────────────────┐ │
│                 │                       │   │ ▶ Project Update    │ │
│                 │                       │   │   Today, 2:30 PM    │ │
│                 │                       │   │   Inbox             │ │
│                 │                       │   ├─────────────────────┤ │
│                 │                       │   │ ▶ Meeting Notes    │ │
│                 │                       │   │   Yesterday         │ │
│                 │                       │   │   Work/Projects     │ │
│                 │                       │   ├─────────────────────┤ │
│                 │                       │   │ ▶ Weekly Report    │ │
│                 │                       │   │   Mon               │ │
│                 │                       │   │   Sent              │ │
│                 │                       │   └─────────────────────┘ │
└─────────────────┴───────────────────────┴─────────────────────────────┘
```

## Sidebar Panel Details

### Header Section
```
┌───────────────────────────────────────┐
│ Emails from Author                    │
│ John Doe (john@example.com)           │
└───────────────────────────────────────┘
```

**Styling:**
- Background: Light gray (#f5f5f5)
- Border: 1px solid #d0d0d0
- Font: 14px, semi-bold
- Author info: 12px, gray

### Count Information
```
┌───────────────────────────────────────┐
│ 5 emails found                        │
└───────────────────────────────────────┘
```

**Styling:**
- Background: Very light gray (#fafafa)
- Font: 11px, gray
- Border bottom: 1px solid #e0e0e0

### Email List Items

#### Regular Email
```
┌───────────────────────────────────────┐
│ ▶ Project Update                      │ ← Subject (13px, #333)
│   Today, 2:30 PM    Inbox             │ ← Date + Folder (11px, #888)
└───────────────────────────────────────┘
```

#### Unread Email
```
┌───────────────────────────────────────┐
│ ▶ Weekly Report                       │ ← Subject (13px, bold, #000)
│   Mon               Sent              │ ← Date + Folder (11px, #888)
└───────────────────────────────────────┘
```

#### Current Email (Selected)
```
┌───────────────────────────────────────┐
│ ║ ▶ Meeting Notes                     │ ← Blue left border (3px, #2196f3)
│ ║   Yesterday       Work/Projects     │ ← Blue background (#e3f2fd)
└───────────────────────────────────────┘
```

**Styling:**
- Normal background: White
- Hover background: #f0f0f0
- Current background: Light blue (#e3f2fd)
- Current border: Blue (#2196f3)
- Focus outline: 2px solid blue (keyboard nav)

### States

#### Loading State
```
┌───────────────────────────────────────┐
│                                       │
│         Loading emails...             │
│                                       │
└───────────────────────────────────────┘
```

#### No Selection State
```
┌───────────────────────────────────────┐
│                                       │
│  Select an email to view all          │
│  messages from the same author.       │
│                                       │
└───────────────────────────────────────┘
```

#### Error State
```
┌───────────────────────────────────────┐
│                                       │
│  Unable to load emails. Please        │
│  check your connection and try again. │
│                                       │
└───────────────────────────────────────┘
```

## Color Palette

### Primary Colors
- **Blue (Primary)**: #2196f3 - Used for current email highlight
- **Light Blue**: #e3f2fd - Background for current email
- **Dark Blue**: #d1e8fa - Hover state for current email

### Neutral Colors
- **Black**: #000000 - Unread email subjects
- **Dark Gray**: #333333 - Regular email subjects
- **Medium Gray**: #666666 - Secondary text
- **Light Gray**: #888888 - Metadata (date, folder)
- **Very Light Gray**: #f0f0f0 - Hover background
- **Extremely Light Gray**: #fafafa - Count info background
- **Border Gray**: #e8e8e8 - Email item borders

### Background Colors
- **White**: #ffffff - Main background
- **Light Gray**: #f5f5f5 - Header background

## Typography

### Font Family
```
-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
"Helvetica Neue", Arial, sans-serif
```

### Font Sizes
- **Header Title**: 14px, semi-bold
- **Author Info**: 12px, regular
- **Count Info**: 11px, regular
- **Email Subject**: 13px, regular (bold for unread)
- **Email Metadata**: 11px, regular

## Interactive Elements

### Hover Effects
- Email items: Background changes to #f0f0f0
- Cursor: Pointer
- Transition: 0.15s ease

### Click Behavior
1. User clicks email in main list
2. Sidebar header updates with author name
3. Loading indicator appears briefly
4. Email list populates from top to bottom
5. Current email is highlighted in blue
6. Scroll position resets to top

### Keyboard Navigation
- **Tab**: Move focus between email items
- **Shift+Tab**: Move focus backwards
- **Enter/Space**: Activate focused email
- **Focus Indicator**: 2px blue outline

### Scrollbar
- **Width**: 8px (thin in Firefox)
- **Track**: Light gray (#f5f5f5)
- **Thumb**: Medium gray (#c0c0c0)
- **Thumb Hover**: Darker gray (#a0a0a0)
- **Thumb Radius**: 4px (rounded corners)

## Accessibility Features

### ARIA Labels
Each email item has:
```
role="button"
tabindex="0"
aria-label="Project Update from Inbox on Today, 2:30 PM (current)"
```

### Screen Reader Announcements
- "Emails from Author, sidebar"
- "John Doe, john@example.com"
- "5 emails found"
- "Project Update from Inbox on Today, 2:30 PM, current, button"

### Visual Indicators
- Unread: Bold subject text
- Current: Blue highlight + left border
- Focus: Blue outline
- Hover: Light gray background

## Responsive Behavior

### Minimum Width
- Sidebar width: 250px (minimum)
- Typical width: 300-400px

### Text Overflow
- Subject: Ellipsis (...)
- Folder path: Ellipsis (...)
- Author name: Ellipsis (...)

### Scroll Behavior
- Vertical: Auto (appears when needed)
- Horizontal: Hidden (text truncates)

## User Flow

### 1. First Use
```
User opens Thunderbird
→ Goes to View → Sidebar → Emails from Author
→ Sidebar shows: "Select an email to view all messages from the same author."
```

### 2. Selecting an Email
```
User clicks on an email in the main panel
→ Sidebar header updates with author name
→ "Loading emails..." appears
→ Search runs across all folders
→ Results appear sorted by date (newest first)
→ Current email is highlighted in blue
```

### 3. Viewing Another Email from Same Author
```
User clicks on email in sidebar list
→ Main panel updates to show that email
→ Sidebar re-highlights the newly selected email
→ No re-search needed (already in list)
```

### 4. Selecting Email from Different Author
```
User clicks on email from different author
→ Sidebar shows "Loading emails..."
→ New search runs
→ List updates with new author's emails
→ Header updates with new author name
```

## Design Principles

### 1. Minimalism
- Clean, uncluttered interface
- Only essential information displayed
- Subtle visual hierarchy

### 2. Consistency
- Follows Thunderbird's design language
- Standard colors and spacing
- Familiar interaction patterns

### 3. Performance
- Instant visual feedback
- Loading indicators for operations > 100ms
- Smooth transitions (0.15s)

### 4. Accessibility
- Keyboard navigable
- Screen reader friendly
- High contrast text
- Clear focus indicators

### 5. User Feedback
- Visual states for all actions
- Informative error messages
- Progress indicators
- Current selection always visible

## Platform-Specific Notes

### Windows
- Standard Windows scrollbar
- System font rendering
- Windows-style focus outline

### macOS
- macOS scrollbar (overlay style)
- Retina-optimized icons
- System font (San Francisco)

### Linux
- GTK-style scrollbar
- System font
- Follows desktop theme

## Future UI Enhancements (Ideas)

1. **Compact View**: Smaller items, more visible at once
2. **Search Bar**: Filter displayed emails
3. **Sort Options**: Date, subject, folder
4. **Grouping**: By folder or date range
5. **Context Menu**: Right-click actions
6. **Theming**: Dark mode support
7. **Animations**: Smooth list updates
8. **Badges**: Email count badges
9. **Preview**: Email preview on hover
10. **Customization**: User-adjustable font sizes

---

This UI design prioritizes clarity, accessibility, and performance while maintaining a professional appearance that integrates seamlessly with Thunderbird's interface.
