const newMessageBox = document.getElementById("new-comment");
const openMessageBox = document.getElementById("open-message-box");
const closeMessageBox = document.getElementById("close-message-box");

openMessageBox.addEventListener("click", () => {
  newMessageBox.style.display = "flex";
});

closeMessageBox.addEventListener("click", () => {
  newMessageBox.style.display = "none";
});
