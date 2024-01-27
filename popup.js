document.addEventListener('DOMContentLoaded', function() {
    const scrapeBtn = document.getElementById('scrapeBtn');

    // Function to send a message to the background script to start scrape reviews
    function scrapeReviews() {
        console.log("hi_button");
        chrome.runtime.sendMessage({ action: 'startScraping' });
    }

    // Add event listener to the scrape button
    scrapeBtn.addEventListener('click', scrapeReviews);
});
