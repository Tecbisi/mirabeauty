const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const thumbnailContainer = document.getElementById("thumbnailContainer");
const galleryItems = document.querySelectorAll(".gallery-item");
let currentImageIndex;
let currentSlideshowImages = [];

// Define your image data structure (using higher res images for modal)
const imageData = {
  sunsetBreeze_01: [
    "img/7/1.jpeg",
    "img/7/2.jpeg",
    "img/7/3.jpeg",
    "img/7/4.jpeg",
    "img/7/5.jpeg",
  ],
  sunsetBreeze_03: [
    "img/8/1.jpeg",
    "img/8/2.jpeg",
    "img/8/3.jpeg",
    "img/8/4.jpeg",
    "img/8/5.jpeg",
  ],
  sunsetBreeze_02: [
    "img/14/1.jpeg",
    "img/14/2.jpeg",
    "img/14/3.jpeg",
    "img/14/4.jpeg",
  ],
  sunsetBreeze_04: [
    "img/9/1.jpeg",
    "img/9/2.jpeg",
    "img/9/3.jpeg",
    "img/9/4.jpeg",
    "img/9/5.jpeg",
    "img/9/6.jpeg",
  ],
  sunsetBreeze_05: [
    "img/10/1.jpeg",
    "img/10/2.jpeg",
    "img/10/3.jpeg",
    "img/10/4.jpeg",
    "img/10/5.jpeg",
    "img/10/6.jpeg",
  ],
  sunsetBreeze_06: [
    "img/11/1.jpeg",
    "img/11/2.jpeg",
    "img/11/3.jpeg",
    "img/11/4.jpeg",
    "img/11/5.jpeg",
    "img/11/6.jpeg",
    "img/11/6.jpeg",
    "img/11/7.jpeg",
    "img/11/8.jpeg",
  ],
  sunsetBreeze_07: [
    "img/12/1.jpeg",
    "img/12/2.jpeg",
    "img/12/3.jpeg",
    "img/12/4.jpeg",
    "img/12/5.jpeg",
    "img/12/6.jpeg",
    "img/12/6.jpeg",
  ],
  sunsetBreeze_08: [
    "img/13/1.jpeg",
    "img/13/2.jpeg",
    "img/13/3.jpeg",
    "img/13/4.jpeg",
  ],
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

const translations = {
  en: {
    siteTitle: "Crowned in Style 👑",
    roseGarden: "Rose Garden",
    lavenderFields: "Lavender Fields",
    cherryBlossoms: "Cherry Blossoms",
    sunsetBreeze: "Sunset Breeze",
    dewyMorning: "Dewy Morning",
    goldenHour: "Golden Hour",
    developedBy: "Developed By",
    rights: "All Rights Reserved",
    rightsText: "@Mira Beauty ...",
    socialFollow: "Social Media - Follow Us",
  },
  fr: {
    siteTitle: "Couronnée avec Style 👑",
    roseGarden: "Jardin de Roses",
    lavenderFields: "Champs de Lavande",
    cherryBlossoms: "Fleurs de Cerisier",
    sunsetBreeze: "Brise au Coucher du Soleil",
    dewyMorning: "Matinée Rosée",
    goldenHour: "Heure Dorée",
    developedBy: "Développé Par",
    rights: "Tous Droits Réservés",
    rightsText: "@Mira Beauty...",
    socialFollow: "Réseaux Sociaux - Suivez-nous",
  },
  it: {
    siteTitle: "Incoronata con Stile 👑",
    roseGarden: "Giardino di Rose",
    lavenderFields: "Campi di Lavanda",
    cherryBlossoms: "Fiori di Ciliegio",
    sunsetBreeze: "Brezza al Tramonto",
    dewyMorning: "Mattina Rugiadosa",
    goldenHour: "Ora d'Oro",
    developedBy: "Sviluppato Da",
    rights: "Tutti i Diritti Riservati",
    rightsText: "@Mira Beauty...",
    socialFollow: "Social Media - Seguici",
  },
};

function setLanguage(lang) {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  localStorage.setItem("preferredLanguage", lang);
}

const languageSwitcher = document.getElementById("languageSwitcher");
languageSwitcher.addEventListener("change", () => {
  setLanguage(languageSwitcher.value);
});

// Initialize language on load
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("preferredLanguage") || "fr";
  languageSwitcher.value = savedLang;
  setLanguage(savedLang);
});
