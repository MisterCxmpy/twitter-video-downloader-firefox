const DOWNLOAD_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
  <polyline points="7 10 12 15 17 10"></polyline>
  <line x1="12" y1="15" x2="12" y2="3"></line>
</svg>
`;

const CHECK_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polyline points="20 6 9 17 4 12"></polyline>
</svg>
`;

function createDownloadButton(parent, video) {
  const downloadButton = document.createElement("button");
  downloadButton.classList.add("download-button");
  downloadButton.innerHTML = DOWNLOAD_ICON;
  downloadButton.title = "Download Video";

  downloadButton.addEventListener("click", (event) => {
    if (!downloadButton.classList.contains('downloaded')) {
      handleDownloadClick(video, downloadButton);
    }
  });
  
  parent.appendChild(downloadButton);
  return downloadButton;
}

async function handleDownloadClick(video, downloadButton) {
  try {
    const clickableElement = findVideoClickableElement(video);
    if (!clickableElement) return;

    triggerRightClick(clickableElement);

    setTimeout(() => processCopyVideoAddress(downloadButton), 500);
  } catch (error) {
    console.error("Failed to process click:", error);
    showNotification("Failed to process. Please try again.", 3000, false);
  }
}

function processCopyVideoAddress(downloadButton) {
  const copyButton = [...document.querySelectorAll('[role="menuitem"]')].find(
    (div) => div.innerText.includes("Copy video address")
  );

  if (copyButton) {
    setupClipboardListener(downloadButton);
    copyButton.click();
  } else {
    console.error("'Copy video address' button not found");
    showNotification("Failed to find video address option", 3000, false);
  }
}

function markAsDownloaded(button) {
  button.innerHTML = CHECK_ICON;
  button.classList.add('downloaded');
  button.title = "Video Downloaded";
}