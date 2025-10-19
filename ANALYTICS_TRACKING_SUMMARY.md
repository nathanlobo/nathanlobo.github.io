# Analytics Tracking Summary

## Overview
Your website now tracks comprehensive user interactions and sends data to Google Sheets for analytics purposes.

## What Gets Tracked

### 1. **First Visit**
- **When**: User enters their name for the first time
- **Visit Type**: `First Visit`
- **Visit Page**: Current tab (HTML/PHP/DSC++)

### 2. **Return Visit**
- **When**: User returns to the site (name stored in localStorage)
- **Visit Type**: `Return Visit`
- **Visit Page**: Current tab (HTML/PHP/DSC++)

### 3. **Tab Switch**
- **When**: User manually clicks on HTML, PHP, or DSC++ tabs
- **Visit Type**: `Tab Switch`
- **Visit Page**: The tab they switched to (e.g., "HTML", "PHP", "DSC++")

### 4. **Output Click**
- **When**: User clicks the "Output" button to view file output
- **Visit Type**: `Output`
- **Visit Page**: Full URL of the output page
  - For PHP files: e.g., `https://nathanlobo.byethost4.com/expt1_basic_php/basics.php`
  - For HTML files: e.g., `https://nathanlobo.github.io/CodeStore/WD-HTML/Expt-1/expt1a.html`

### 5. **Download Click**
- **When**: User clicks the "Download" button
- **Visit Type**: `Download`
- **Visit Page**: File path or ZIP URL
  - For regular files: e.g., `WD-HTML/Expt-1/expt1a.html`
  - For ZIP downloads: e.g., `https://github.com/user-attachments/files/22573058/Expt-1.zip`

## Privacy & User Control

- Analytics only track users who have voluntarily entered their name
- No tracking occurs if the user hasn't entered their name
- Name is stored in browser's localStorage (not cookies)
- All data is sent to your private Google Spreadsheet

## Sample Google Sheets Data

```
| Name   | Timestamp           | Visit Type    | Page/Tab                                                          |
|--------|---------------------|---------------|-------------------------------------------------------------------|
| Nathan | 2025-10-19 10:30:00 | First Visit   | HTML                                                              |
| Nathan | 2025-10-19 10:30:15 | Tab Switch    | PHP                                                               |
| Nathan | 2025-10-19 10:30:30 | Output        | https://nathanlobo.byethost4.com/expt1_basic_php/basics.php      |
| Nathan | 2025-10-19 10:30:45 | Download      | WD-PHP/expt1_basic_php/basics.php                                 |
| Nathan | 2025-10-19 10:31:00 | Tab Switch    | DSC++                                                             |
| Nathan | 2025-10-19 10:31:15 | Output        | https://nathanlobo.github.io/CodeStore/WD-HTML/Expt-1/expt1a.html|
| Nathan | 2025-10-19 10:31:30 | Download      | https://github.com/user-attachments/files/22573058/Expt-1.zip    |
| Sarah  | 2025-10-19 11:00:00 | First Visit   | HTML                                                              |
| Sarah  | 2025-10-19 11:00:20 | Download      | WD-HTML/Expt-2/expt2a.html                                        |
| Nathan | 2025-10-20 09:15:00 | Return Visit  | PHP                                                               |
```

## Benefits

1. **User Behavior Insights**: Understand which experiments are most popular
2. **Content Performance**: See which files get viewed/downloaded most
3. **Navigation Patterns**: Track how users move between different sections
4. **Return Visitor Tracking**: Know who comes back to your site
5. **Download Analytics**: Monitor which resources are most valuable

## Technical Implementation

- Uses `localStorage.getItem('userName')` to identify users
- Sends data via GET request to Google Apps Script
- Uses `mode: 'no-cors'` for cross-origin requests
- Non-blocking (doesn't interfere with user experience)
- Fails gracefully if Google Sheets is unavailable

## Next Steps

1. Monitor your Google Spreadsheet for incoming data
2. Create charts and pivot tables in Google Sheets for visualization
3. Use the data to improve your website based on user behavior
4. Consider adding more tracking points if needed

## Maintenance

- The Google Apps Script URL is configured in: `GOOGLE_SCRIPT_URL` variable
- To change what gets tracked, modify the `sendAnalyticsData()` function calls
- All tracking is opt-in (requires name entry)
