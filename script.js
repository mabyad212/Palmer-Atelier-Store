/* =====================================
   PALMER ATELIER
   Website functionality
===================================== */

// LANGUAGE TRANSLATIONS

const translations = {
    fr: {
        navHome: "Accueil",
        navCollection: "Collection",
        navAbout: "Notre histoire",
        shopNow: "Acheter",
        eyebrow: "COLLECTION 001 — MAROC",
        heroTitle: "Le style est<br>une affirmation.",
        heroDescription: "Conçu pour ceux qui apprécient la simplicité, la qualité et l'individualité.",
        discover: "Découvrir la collection",
        collectionLabel: "LA COLLECTION",
        collectionTitle: "Les essentiels.",
        collectionDescription: "Une approche réfléchie du style quotidien.",
        productDescription: "Confort contemporain. Design intemporel.",
        addToCart: "Ajouter au panier",
        storyTitle: "Moins, mais mieux.",
        storyDescription: "Nous croyons que le style naît des détails réfléchis, de la simplicité et de la confiance.",
        added: "Produit ajouté au panier !"
    },

    en: {
        navHome: "Home",
        navCollection: "Collection",
        navAbout: "Our story",
        shopNow: "Shop",
        eyebrow: "COLLECTION 001 — MOROCCO",
        heroTitle: "Style is a<br>statement.",
        heroDescription: "Designed for those who appreciate simplicity, quality and individuality.",
        discover: "Discover the collection",
        collectionLabel: "THE COLLECTION",
        collectionTitle: "Essential pieces.",
        collectionDescription: "A considered approach to everyday style.",
        productDescription: "Contemporary comfort. Timeless design.",
        addToCart: "Add to cart",
        storyTitle: "Less, but better.",
        storyDescription: "We believe great style comes from thoughtful details, simplicity and confidence.",
        added: "Product added to cart!"
    }
};

// CURRENT LANGUAGE

let currentLanguage = "fr";

// CART

let cart = [];

// UPDATE LANGUAGE

function updateLanguage() {

    const elements = document.querySelectorAll("[data-i18n]");

    elements.forEach(element => {

        const key = element.dataset.i18n;

        if (translations[currentLanguage][key]) {
            element.innerHTML = translations[currentLanguage][key];
        }

    });

    document.getElementById("languageBtn").textContent =
        currentLanguage === "fr" ? "EN" : "FR";

    document.documentElement.lang = currentLanguage;
}

// LANGUAGE BUTTON

document.getElementById("languageBtn").addEventListener("click", () => {

    currentLanguage = currentLanguage === "fr" ? "en" : "fr";

    updateLanguage();

});

// ADD PRODUCT TO CART

document.getElementById("addToCart").addEventListener("click", () => {

    cart.push({
        name: "Palmer Essential Tracksuit",
        price: 399,
        currency: "MAD"
    });

    updateCart();

    alert(translations[currentLanguage].added);

});

// UPDATE CART COUNTER

function updateCart() {

    document.getElementById("cartCount").textContent = cart.length;

}

// INITIALIZE WEBSITE

updateLanguage();
updateCart();
