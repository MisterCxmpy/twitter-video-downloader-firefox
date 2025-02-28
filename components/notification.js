function showNotification(message, duration, success = false) {
  const notificationBox = document.createElement("div");
  notificationBox.classList.add("notification-alert");
  notificationBox.classList.add("fade-in");
  if (success) notificationBox.classList.add("success");
  
  const notificationMessage = document.createElement("span");
  notificationMessage.textContent = message;
  notificationBox.appendChild(notificationMessage);
  
  const notificationProgress = document.createElement("div");
  notificationProgress.classList.add("progress-bar");
  notificationBox.appendChild(notificationProgress);
  
  document.body.appendChild(notificationBox);
  
  setTimeout(() => {
    notificationBox.classList.remove("fade-in");
    notificationBox.classList.add("fade-out");
    setTimeout(() => notificationBox.remove(), 200);
  }, duration);
}