const gallery = document.getElementById("gallery");
const overlay = document.getElementById("overlay");
const mainImage = document.getElementById("mainImage");
const linkedImages = document.getElementById("linkedImages");

const overlayTitle = document.createElement("div");
overlayTitle.style.color = "white";
overlayTitle.style.fontSize = "20px";
overlayTitle.style.marginBottom = "10px";
overlay.insertBefore(overlayTitle, mainImage);

document.getElementById("currentYear").textContent = new Date().getFullYear();

gallery.addEventListener("click", function (e) {
  if (e.target.tagName === "IMG") {
    const img = e.target;
    const links = JSON.parse(img.getAttribute("data-links"));
    const title = img.getAttribute("data-title") || "";
    openOverlay(links, title);
  }
});

function openOverlay(links, title = "") {
  overlay.classList.add("active");
  mainImage.src = links[0];
  overlayTitle.textContent = title;

  linkedImages.innerHTML = "";

  links.forEach((link) => {
    const img = document.createElement("img");
    img.src = link;
    img.onclick = () => {
      mainImage.src = link;
    };
    linkedImages.appendChild(img);
  });
}

function closeOverlay() {
  overlay.classList.remove("active");
  mainImage.src = "";
  linkedImages.innerHTML = "";
  overlayTitle.textContent = "";
}

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    closeOverlay();
  }
});
