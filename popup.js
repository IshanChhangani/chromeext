// popup.js

document.addEventListener("DOMContentLoaded", function () {
  // Load the blocked channels from local storage
  const blockedChannels =
    JSON.parse(localStorage.getItem("blockedChannels")) || [];

  console.log("popup:", blockedChannels);

  // // Function to render the list of blocked channels
  // function renderBlockedChannels() {
  //   const blockedChannelsList = document.getElementById("blockedChannelsList");
  //   blockedChannelsList.innerHTML = "";

  //   blockedChannels.forEach((channel) => {
  //     const listItem = document.createElement("li");
  //     listItem.textContent = channel;

  //     // Create a remove button (cross)
  //     const removeButton = document.createElement("button");
  //     removeButton.textContent = "✖";
  //     removeButton.classList.add("removeButton");
  //     removeButton.addEventListener("click", function () {
  //       removeChannel(channel);
  //     });

  //     // Append the remove button to the list item
  //     listItem.appendChild(removeButton);

  //     // Append the list item to the list
  //     blockedChannelsList.appendChild(listItem);
  //   });
  // }

  // // Function to remove a channel from the list
  // function removeChannel(channelToRemove) {
  //   const index = blockedChannels.indexOf(channelToRemove);
  //   if (index !== -1) {
  //     blockedChannels.splice(index, 1);
  //     localStorage.setItem("blockedChannels", JSON.stringify(blockedChannels));
  //     renderBlockedChannels();
  //   }
  // }

  // // Render the initial list
  // renderBlockedChannels();
});
