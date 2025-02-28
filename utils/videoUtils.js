function findVideoClickableElement(video) {
  const article = video.closest("article");
  if (!article) {
    console.error("Article not found for video");
    return null;
  }

  const videoComponent = article.querySelector(
    '[data-testid="videoComponent"]'
  );
  if (!videoComponent) {
    console.error("Video component not found");
    return null;
  }

  const secondDiv = videoComponent.children[1];
  if (!secondDiv) {
    console.error("Second div not found in videoComponent");
    return null;
  }

  const targetDiv = secondDiv;
  const clickableElement = targetDiv.children[0]?.children[0]?.children[0];
  if (!clickableElement) {
    console.error("Clickable element not found");
    return null;
  }

  return clickableElement;
}

function triggerRightClick(element) {
  const rightClickEvent = new MouseEvent("contextmenu", {
    bubbles: true,
    cancelable: true,
    button: 2,
  });
  element.dispatchEvent(rightClickEvent);
}

function extractTweetId(url) {
  const match = url.match(/status\/(\d+)/);
  return match ? match[1] : null;
}