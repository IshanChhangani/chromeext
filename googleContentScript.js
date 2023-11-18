// googleContentScript.js

// Fetch the blocked websites list from local storage
const blockedWebsites = localStorage.getItem("blockedWebsites")
  ? JSON.parse(localStorage.getItem("blockedWebsites"))
  : [];

// Function to check if the current website is blocked
function isBlockedWebsite() {
  const currentUrl = window.location.href;
  return blockedWebsites.includes(currentUrl);
}

// Function to create a block button
function createBlockButton(websiteLink) {
  const blockButton = document.createElement("button");
  blockButton.textContent = "Block Website";
  blockButton.id = "blockWebsiteButton";
  blockButton.style.marginLeft = "10px";
  blockButton.style.padding = "5px 10px";
  blockButton.style.backgroundColor = "#FF0000"; // Red background color
  blockButton.style.color = "#FFFFFF"; // White text color
  blockButton.style.border = "none";
  blockButton.style.borderRadius = "5px";
  blockButton.style.cursor = "pointer";
  blockButton.addEventListener("click", function () {
    // Block the website and reload the page
    blockedWebsites.push(websiteLink);
    localStorage.setItem("blockedWebsites", JSON.stringify(blockedWebsites));
    console.log("Blocked the website:", websiteLink);
    location.reload();
  });

  return blockButton;
}

// Function to append the block button
function appendBlockButton() {
  const body = document.querySelector("body");
  const blockButton = createBlockButton();
  body.appendChild(blockButton);
}
// =========================================================================================================

function removeWebsites() {
  const websiteElements = document.querySelectorAll(".GvPZzd");
  // console.log(websiteElements);
  websiteElements.forEach((website) => {
    const websiteLink = website.textContent.split(" ")[0];
    console.log(website);

    if (websiteLink !== null) {
      if (isBlockedWebsite(websiteLink)) {
        website.remove();
      }
    }
  });
}

console.log("starting now......");
removeWebsites();

const observer = new MutationObserver(() => {
  removeWebsites();
});

// Observe changes in the entire document
observer.observe(document, { childList: true, subtree: true });
