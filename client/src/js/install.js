const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA

// Before install event listener, which shows the install button
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  window.deferredPrompt = event;
  butInstall.classList.toggle("hidden", false);
});

// Install button event listener, which installs the PWA
butInstall.addEventListener("click", async () => {
  const promptEvent = window.deferredPrompt;
  if (!promptEvent);
  promptEvent.prompt();
  window.deferredPrompt = null;
  butInstall.classList.toggle("hidden", true);
});

// App installed event listener, which hides the install button
window.addEventListener("appinstalled", (event) => {
  window.deferredPrompt = null;
});
