const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const thumbnailContainer = document.getElementById("thumbnailContainer");
const galleryItems = document.querySelectorAll(".gallery-item");
let currentImageIndex;
let currentSlideshowImages = [];

// Define your image data structure (using higher res images for modal)
const imageData = {
  roseGarden: [
    "img/1/1.jpeg",
    "img/1/2.jpeg",
    "img/1/3.jpeg",
    "img/1/4.jpeg",
    "img/1/5.jpeg",
    "img/1/6.jpeg",
    "img/1/7.jpeg",
  ],
  lavenderFields: [
    "img/2/1.jpeg",
    "img/2/2.jpeg",
    "img/2/3.jpeg",
    "img/2/4.jpeg",
  ],
  cherryBlossoms: [
    "img/3/1.jpeg",
    "img/3/2.jpeg",
    "img/3/3.jpeg",
    "img/3/4.jpeg",
    "img/3/5.jpeg",
    "img/3/6.jpeg",
    "img/3/7.jpeg",
  ],
  sunsetBreeze: ["img/4/1.jpeg", "img/4/2.jpeg", "img/4/3.jpeg"],
  dewyMorning: [
    "img/5/1.jpeg",
    "img/5/2.jpeg",
    "img/5/3.jpeg",
    "img/5/4.jpeg",
    "img/5/5.jpeg",
  ],
  goldenHour: ["img/6/1.jpeg", "img/6/2.jpeg"],
};

galleryItems.forEach((item) => {
  item.onclick = () => {
    const category = item.dataset.category;
    currentSlideshowImages = imageData[category];

    if (currentSlideshowImages && currentSlideshowImages.length > 0) {
      currentImageIndex = 0; // Start with the first image of the category
      openModal(currentSlideshowImages[currentImageIndex]);
      populateThumbnails();
      updateThumbnailHighlight();
    } else {
      console.warn(`No images found for category: ${category}`);
    }
  };
});

function openModal(imageSrc) {
  modal.style.display = "flex";
  modalImg.src = imageSrc;
}

function closeModal(event) {
  if (event.target === modal || event.target.classList.contains("close")) {
    modal.style.display = "none";
  }
}

function plusSlides(n) {
  showSlides((currentImageIndex += n));
}

function showSlides(n) {
  if (!currentSlideshowImages || currentSlideshowImages.length === 0) {
    console.warn("No images to display in the slideshow.");
    return;
  }

  if (n >= currentSlideshowImages.length) {
    currentImageIndex = 0;
  }
  if (n < 0) {
    currentImageIndex = currentSlideshowImages.length - 1;
  }
  modalImg.src = currentSlideshowImages[currentImageIndex];
  updateThumbnailHighlight();
}

function populateThumbnails() {
  thumbnailContainer.innerHTML = ""; // Clear previous thumbnails
  currentSlideshowImages.forEach((src, index) => {
    const thumbImg = document.createElement("img");
    thumbImg.src = src;
    thumbImg.alt = `Thumbnail ${index + 1}`;
    thumbImg.onclick = () => {
      currentImageIndex = index; // **FIX: Update currentImageIndex**
      showSlides(currentImageIndex); // Jump to clicked thumbnail image
    };
    thumbnailContainer.appendChild(thumbImg);
  });
}

function updateThumbnailHighlight() {
  const thumbnails = thumbnailContainer.querySelectorAll("img");
  thumbnails.forEach((thumb, index) => {
    if (index === currentImageIndex) {
      thumb.classList.add("active-thumbnail");
      // Optional: Scroll active thumbnail into view
      thumb.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    } else {
      thumb.classList.remove("active-thumbnail");
    }
  });
}

// Dynamic Year
document.getElementById("currentYear").textContent = new Date().getFullYear();

// Close modal with Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    modal.style.display = "none";
  }
  // Navigate with arrow keys only when modal is open
  if (modal.style.display === "flex") {
    if (e.key === "ArrowLeft") {
      plusSlides(-1);
    } else if (e.key === "ArrowRight") {
      plusSlides(1);
    }
  }
});
