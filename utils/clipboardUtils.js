function setupClipboardListener(downloadButton) {
  document.addEventListener(
    "copy",
    () => {
      setTimeout(() => {
        navigator.clipboard
          .readText()
          .then((copiedText) => {
            const tweetId = extractTweetId(copiedText);
            browser.runtime
              .sendMessage({ action: "fetchTweet", tweetId })
              .then((response) => {
                if (response.success && response.videoUrl) {
                  downloadVideo(tweetId, response.videoUrl);
                  showNotification("Successfully downloaded video", 3000, true);
                  markAsDownloaded(downloadButton);
                } else {
                  showNotification("Failed to download video", 3000, false);
                  console.error("No video URL found:", response.error);
                }
              });
          })
          .catch((err) => console.error("Failed to read clipboard:", err));
      }, 100);
    },
    { once: true }
  );
}
