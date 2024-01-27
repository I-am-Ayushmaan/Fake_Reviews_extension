chrome.runtime.onMessage.addListener(async function(message, sender, sendResponse) {
    if (message.action === 'startScraping') {
       
        try {
            // Query for the active tab
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            
            // Ensure that at least one tab is found
            if (tab) {
                // Execute content script to scrape reviews
                await chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ['contentScript.js']
                });
               
                // Send a message to the content script to start scraping
                chrome.tabs.sendMessage(tab.id, { action: 'scrapeReviews' });
                console.log("hi_back");
            } else {
                console.error('No active tab found.');
            }
        } catch (error) {
            console.error('Error executing content script:', error);
        }
    }
});
