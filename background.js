browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fetchTweet") {
    fetch(`https://react-tweet.vercel.app/api/tweet/${request.tweetId}`, {
      mode: "cors",
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        const videoUrl = extractVideoUrl(data.data);
        sendResponse({
          success: true,
          videoUrl,
          tweetOwner: data.data.user.screen_name,
        });
      })
      .catch((error) => sendResponse({ success: false, error }));

    return true;
  }
});

function extractVideoUrl(tweetInfo) {
  try {
    if (tweetInfo?.mediaDetails[0]?.video_info) {
      const variants = tweetInfo.mediaDetails[0].video_info.variants;

      const sortedVariants = variants
        .filter((v) => v.content_type === "video/mp4")
        .sort((a, b) => (b.bitrate || 0) - (a.bitrate || 0));

      if (sortedVariants.length > 0) {
        return sortedVariants[0].url;
      }
    }
    return null;
  } catch (e) {
    return null;
  }
}
