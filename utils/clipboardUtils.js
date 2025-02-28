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
                  downloadVideo(response.tweetOwner, tweetId, response.videoUrl);
                  markAsDownloaded(downloadButton);
                } else {
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
