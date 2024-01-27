// contentScript.js

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(async function(message, sender, sendResponse) {
    if (message.action === 'scrapeReviews') {
        try {
            console.log("hi_content");
            const tabUrl = sender.tab.url; // Get the URL of the current tab from the sender object
            if (tabUrl.startsWith('http') || tabUrl.startsWith('https')) {
                const apiKey = '98a35ade601b4f67a13d323f4598c771';
                const apiUrl = `https://scrape.abstractapi.com/v1/?api_key=98a35ade601b4f67a13d323f4598c771&url=https://news.ycombinator.com`;
                const response = await fetch(apiUrl);
                const data = await response.json();

                // Extract review data from the response
                const reviews = data.reviews; 
                // Adjust this based on the actual structure of the response
                // Send the scraped reviews back to the background script
                chrome.runtime.sendMessage({ action: 'scrapedReviews', reviews: reviews });
            } else {
                console.error('Invalid URL:', tabUrl);
            }
        } catch (error) {
            console.error('Error scraping reviews:', error);
        }
    }
});
