# Google Sheets Analytics Setup Guide

## Step 1: Create a Google Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Website Analytics" (or whatever you prefer)
4. In the first row, add headers:
   - Column A: **Name**
   - Column B: **Timestamp**
   - Column C: **Visit Type** (First Visit / Return Visit / Tab Switch)
   - Column D: **Page/Tab** (HTML / PHP / DSC++)

## Step 2: Create Google Apps Script

1. In your Google Spreadsheet, click on **Extensions** > **Apps Script**
2. Delete any existing code in the script editor
3. Copy and paste the following code:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming data
    var userName = e.parameter.userName;
    var visitType = e.parameter.visitType || 'Unknown';
    var visitPage = e.parameter.visitPage || 'N/A';
    var timestamp = new Date();
    
    // Append a new row with the data
    sheet.appendRow([userName, timestamp, visitType, visitPage]);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Data logged successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return doPost(e);
}
```

4. Click **Save** (disk icon) and give your project a name (e.g., "Website Analytics Logger")

## Step 3: Deploy the Web App

1. Click on **Deploy** > **New deployment**
2. Click the gear icon next to "Select type" and choose **Web app**
3. Configure the deployment:
   - **Description**: Website Analytics v1
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
4. Click **Deploy**
5. Review permissions (click "Authorize access")
6. Sign in with your Google account
7. Click "Advanced" > "Go to [Project Name] (unsafe)" > "Allow"
8. **IMPORTANT**: Copy the Web App URL - it should look like:
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```

## Step 4: Update Your Website Code

Replace the `GOOGLE_SCRIPT_URL` in your `index.html` file with the Web App URL you just copied.

## Testing

1. Visit your website
2. Enter a name in the modal
3. Check your Google Spreadsheet - a new row should appear with:
   - The name you entered
   - Current timestamp
   - Visit type (First Visit or Return Visit)
   - Page/Tab visited (HTML, PHP, or DSC++)
4. Switch between tabs (HTML, PHP, DSC++) and watch new rows being added to track your navigation

## Troubleshooting

- **Nothing appears in spreadsheet**: Check the browser console for errors
- **CORS errors**: Make sure "Who has access" is set to "Anyone" in deployment settings
- **Permission denied**: Re-authorize the script in the Apps Script editor

## Notes

- Data appears in the spreadsheet in real-time
- You can view analytics directly in Google Sheets
- Use Google Sheets features for charts, filtering, and analysis
- The script handles:
  - **First visits**: When user enters their name
  - **Return visits**: When user comes back to the site
  - **Tab switches**: When user navigates between HTML, PHP, DSC++ tabs
  - **Output clicks**: When user views the output of a file (includes the output URL)
  - **Downloads**: When user downloads a file (includes the file path or zip URL)
- All analytics are only tracked if the user has already entered their name

## Analytics Data Examples

| Name | Timestamp | Visit Type | Page/Tab |
|------|-----------|------------|----------|
| John | 2025-10-19 10:30:15 | First Visit | HTML |
| John | 2025-10-19 10:30:45 | Tab Switch | PHP |
| John | 2025-10-19 10:31:10 | Output | https://nathanlobo.github.io/CodeStore/WD-HTML/Expt-1/expt1a.html |
| John | 2025-10-19 10:31:30 | Download | WD-HTML/Expt-1/expt1a.html |
| John | 2025-10-19 10:32:00 | Tab Switch | DSC++ |
