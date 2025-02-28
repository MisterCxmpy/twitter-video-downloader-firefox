function applyDownloadButtonsToVideos() {
  document.querySelectorAll("video").forEach((video) => {
    if (!video.dataset.processed) {
      const parent = video.parentElement;
      if (parent) {
        createDownloadButton(parent, video);
      }
      video.dataset.processed = "true";
    }
  });
}

function initializeVideoDownloader() {
  applyDownloadButtonsToVideos();

  const observer = new MutationObserver(applyDownloadButtonsToVideos);
  observer.observe(document.body, { childList: true, subtree: true });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeVideoDownloader);
} else {
  initializeVideoDownloader();
}
