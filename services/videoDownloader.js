async function downloadVideo(tweetOwner, tweetId, url) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = `${tweetOwner}-${tweetId}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(blobUrl);
    showNotification("Successfully downloaded video", 3000, true);
  } catch (error) {
    console.error("Error downloading the video:", error);
    showNotification("Failed to download the video", 3000, false);
  }
}