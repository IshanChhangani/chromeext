const blockedChannels = localStorage.getItem("blockedChannels")
  ? JSON.parse(localStorage.getItem("blockedChannels"))
  : [];

function getChannelName(videoElement) {
  const channelNameElement = videoElement.querySelector(
    "ytd-channel-name #text"
  );
  if (channelNameElement) {
    return channelNameElement.textContent.trim();
  }
  return null;
}

function isBlockedChannel(channelName) {
  return blockedChannels.includes(channelName);
}

function createButton(channelName) {
  const blockButton = document.createElement("button");
  const icon = document.createElement("span");

  // Example icon (you can replace this with your preferred icon)
  icon.innerHTML = "&#x1F6AB"; // This is a lock emoji, replace it as needed

  blockButton.appendChild(icon);
  blockButton.innerHTML += " Block Channel"; // Using innerHTML to append HTML content
  blockButton.id = "blockButton"; // Add an ID to the button
  blockButton.style.marginLeft = "10px";
  blockButton.style.padding = "8px";
  blockButton.style.backgroundColor = "#404040"; // Background color
  blockButton.style.color = "#FFFFFF"; // Text color
  blockButton.style.border = "none";
  blockButton.style.borderRadius = "15px"; // Adjust the border radius for curved edges
  blockButton.style.cursor = "pointer";
  blockButton.style.display = "flex"; // Align icon and text horizontally
  blockButton.style.alignItems = "center"; // Center content vertically

  // Add hover effect
  blockButton.addEventListener("mouseenter", function () {
    blockButton.style.backgroundColor = "#505050"; // Lighter background color on hover
  });

  // Remove hover effect on mouseleave
  blockButton.addEventListener("mouseleave", function () {
    blockButton.style.backgroundColor = "#404040"; // Restore original background color on mouse leave
  });

  // Add click effect
  blockButton.addEventListener("mousedown", function () {
    blockButton.style.backgroundColor = "#303030"; // Darker background color on click
  });

  // Remove click effect on mouseup
  blockButton.addEventListener("mouseup", function () {
    blockButton.style.backgroundColor = "#404040"; // Restore original background color on mouse up
  });

  blockButton.addEventListener("click", function () {
    if (channelName !== null) {
      if (!blockedChannels.includes(channelName)) {
        blockedChannels.push(channelName);
        localStorage.setItem(
          "blockedChannels",
          JSON.stringify(blockedChannels)
        );
        console.log("Added " + channelName + " to blocked channels.");
        removeVideoElements();
      }
    }
  });

  return blockButton;
}

function appendBlockButton(videoElement, channelName) {
  // Check if the button is already added
  if (videoElement.querySelector("#blockButton")) {
    return;
  }
  blockButton = createButton(channelName);
  const channelNameElement = videoElement.querySelector(
    "#channel-info.ytd-video-renderer"
  );
  channelNameElement.appendChild(blockButton);
}

// Helper function to remove blocked channels
// ===============================================================================================

// Function to remove videos from blocked channels
function removeVideoElements() {
  const videoElements = document.querySelectorAll(
    "#dismissible.ytd-video-renderer"
  );

  videoElements.forEach((videoElement) => {
    const channelName = getChannelName(videoElement);
    appendBlockButton(videoElement, channelName);

    if (channelName !== null) {
      if (isBlockedChannel(channelName)) {
        console.log(channelName);
        videoElement.remove();
      }
    }
  });
}

function removeReels() {
  const reelTitles = document.querySelectorAll(
    "ytd-exploratory-results-renderer.ytd-item-section-renderer, ytd-horizontal-card-list-renderer.ytd-item-section-renderer:not(:first-child), ytd-reel-shelf-renderer.ytd-item-section-renderer, ytd-shelf-renderer.ytd-item-section-renderer"
  );

  const reels = document.querySelectorAll("#contents.ytd-reel-shelf-renderer");
  reels.forEach((reel) => {
    reel.remove();
  });
  reelTitles.forEach((reelTitle) => {
    reelTitle.remove();
  });

  const videoElements = document.querySelectorAll(
    "#dismissible.ytd-video-renderer"
  );

  videoElements.forEach((videoElement) => {
    if (
      videoElement.querySelector(
        "ytd-thumbnail-overlay-time-status-renderer[overlay-style=SHORTS] #time-status.ytd-thumbnail-overlay-time-status-renderer"
      )
    ) {
      videoElement.remove();
    }
  });
}

function removeChannelElements() {
  const channelElements = document.querySelectorAll(
    "#content-section.ytd-channel-renderer"
  );
  channelElements.forEach((channelElement) => {
    const channelName = channelElement
      .querySelector("#text-container.ytd-channel-name")
      .textContent.trim();
    // appendBlockButton(channelElements, channelName);

    if (isBlockedChannel(channelName)) {
      console.log(channelName);
      channelElement.remove();
      console.log("channel removed: ", channelName);
    }
  });
}

function removeMix() {
  const mixElements = document.querySelectorAll("ytd-radio-renderer");
  mixElements.forEach((mixElement) => {
    mixElement.remove();
  });
}

console.log("Youtube Desktop...");

// Initial removal of blocked channels
removeVideoElements();
removeReels();
removeChannelElements();
removeMix();

const observer = new MutationObserver(() => {
  removeVideoElements();
  removeReels();
  removeChannelElements();
  removeMix();
});

// Observe changes in the entire document
observer.observe(document, { childList: true, subtree: true });
