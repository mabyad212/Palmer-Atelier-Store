/* =========================================
   PALMER ATELIER
   Product Selection & Shopping Cart
========================================= */

const PRODUCT = {
    name: "Palmer Essential Tracksuit",
    price: 699,
    currency: "MAD"
};

// =========================================
// PRODUCT COLORS
// =========================================

const colors = {
    "Beige": {
        image: "images/product-beige.jpeg"
    },
    "Black": {
        image: "images/product-black.jpeg"
    },
    "Forest Green": {
        image: "images/product-forest-green.jpeg"
    },
    "Sage": {
        image: "images/product-sage.jpeg"
    },
    "Olive": {
        image: "images/product-olive.jpeg"
    },
    "Baby Blue": {
        image: "images/product-baby-blue.jpeg"
    }
};

const availableSizes = ["S", "M", "L", "XL", "XXL"];

let selectedColor = "Beige";
let selectedSize = "M";
let quantity = 1;
let cart = [];

// =========================================
// TRANSLATIONS
// =========================================

const translations = {
    fr: {
        home: "Accueil",
       collectionTag: "COLLECTION 001 — MAROC",
        collection: "Collection",
        about: "Notre histoire",
        shop: "Acheter",

        heroTitle: "Le style est<br>une affirmation.",
        heroDescription: "Un style naturel. Des tons raffinés. Le luxe au quotidien.",
        discover: "Découvrir la collection",

        collectionTitle: "La collection essentielle",
        collectionDescription: "Une même coupe. Plusieurs personnalités.",

        productName: "Palmer Essential Tracksuit",
        productSubtitle: "Confort contemporain. Design intemporel.",

        colorLabel: "Couleur",
        sizeLabel: "Choisir la taille",
        allSizes: "Toutes les tailles disponibles",
        quantity: "Quantité",
        addToCart: "Ajouter au panier",

        benefit1: "✓ Paiement à la livraison disponible",
        benefit2: "✓ Livraison partout au Maroc",
        benefit3: "✓ Confirmation sécurisée de commande",

        storyTitle: "Moins, mais mieux.",
        storyDescription: "Une approche réfléchie du style quotidien. Conçu pour ceux qui apprécient la simplicité, la qualité et l'individualité.",

        added: "Produit ajouté au panier !",
        chooseSize: "Veuillez sélectionner une taille.",
        cartEmpty: "Votre panier est vide.",
        cartTitle: "Votre panier",
        total: "Total",
        continue: "Continuez vos achats"
    },

    en: {
        home: "Home",
       collectionTag: "COLLECTION 001 — MOROCCO",
        collection: "Collection",
        about: "Our story",
        shop: "Shop",

        heroTitle: "Style is a<br>statement.",
        heroDescription: "Effortless style. Refined tones. Everyday luxury.",
        discover: "Discover the collection",

        collectionTitle: "The Essential Collection",
        collectionDescription: "The same fit. Different vibes.",

        productName: "Palmer Essential Tracksuit",
        productSubtitle: "Contemporary comfort. Timeless design.",

        colorLabel: "Color",
        sizeLabel: "Select size",
        allSizes: "All sizes available",
        quantity: "Quantity",
        addToCart: "Add to cart",

        benefit1: "✓ Cash on delivery available",
        benefit2: "✓ Delivery throughout Morocco",
        benefit3: "✓ Secure order confirmation",

        storyTitle: "Less, but better.",
        storyDescription: "A considered approach to everyday style. Designed for those who appreciate simplicity, quality and individuality.",

        added: "Product added to cart!",
        chooseSize: "Please select a size.",
        cartEmpty: "Your cart is empty.",
        cartTitle: "Your shopping cart",
        total: "Total",
        continue: "Continue shopping"
    }
};

let currentLanguage = "fr";

// =========================================
// CART STORAGE
// =========================================

function saveCart() {
    try {
        localStorage.setItem(
            "palmerAtelierCart",
            JSON.stringify(cart)
        );
    } catch (error) {
        console.warn("Cart could not be saved.", error);
    }
}

function loadCart() {
    try {
        const saved = localStorage.getItem("palmerAtelierCart");

        if (saved) {
            const parsed = JSON.parse(saved);

            if (Array.isArray(parsed)) {
                cart = parsed.filter(item =>
                    item.name === PRODUCT.name &&
                    colors[item.color] &&
                    availableSizes.includes(item.size) &&
                    Number.isInteger(item.quantity) &&
                    item.quantity > 0
                );
            }
        }
    } catch (error) {
        cart = [];
    }
}

// =========================================
// LANGUAGE SWITCHING
// =========================================

function updateLanguage() {

    const elements = document.querySelectorAll("[data-i18n]");

    elements.forEach(element => {

        const key = element.dataset.i18n;

        if (translations[currentLanguage][key]) {
            element.innerHTML = translations[currentLanguage][key];
        }
    });

    document.documentElement.lang = currentLanguage;

    document.getElementById("languageBtn").textContent =
        currentLanguage === "fr" ? "EN" : "FR";

    updateCartCounter();
}

document.getElementById("languageBtn").addEventListener("click", () => {

    currentLanguage = currentLanguage === "fr" ? "en" : "fr";

    updateLanguage();

});

// =========================================
// PRODUCT COLOR SELECTION
// =========================================

const mainImage = document.getElementById("mainProductImage");
const selectedColorText = document.getElementById("selectedColor");

function selectColor(color) {

    if (!colors[color]) return;

    selectedColor = color;

    mainImage.src = colors[color].image;
    mainImage.alt = `${PRODUCT.name} - ${color}`;

    selectedColorText.textContent = color;

    document.querySelectorAll(".color-option").forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.color === color
        );

    });

    document.querySelectorAll(".thumbnail").forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.image === colors[color].image
        );

    });
}

document.querySelectorAll(".color-option").forEach(button => {

    button.addEventListener("click", () => {
        selectColor(button.dataset.color);
    });

});

// =========================================
// PRODUCT IMAGE GALLERY
// =========================================

document.querySelectorAll(".thumbnail").forEach(button => {

    button.addEventListener("click", () => {

        const image = button.dataset.image;

        mainImage.src = image;

        document.querySelectorAll(".thumbnail").forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

    });

});

// =========================================
// PRODUCT SIZE SELECTION
// =========================================

document.querySelectorAll(".size-option").forEach(button => {

    button.addEventListener("click", () => {

        const size = button.dataset.size;

        if (!availableSizes.includes(size)) return;

        selectedSize = size;

        document.querySelectorAll(".size-option").forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

    });

});

// =========================================
// QUANTITY CONTROLS
// =========================================

const quantityDisplay = document.getElementById("quantity");

document.getElementById("increaseQty").addEventListener("click", () => {

    if (quantity < 10) {
        quantity++;
        quantityDisplay.textContent = quantity;
    }

});

document.getElementById("decreaseQty").addEventListener("click", () => {

    if (quantity > 1) {
        quantity--;
        quantityDisplay.textContent = quantity;
    }

});

// =========================================
// ADD TO CART
// =========================================

function addToCart() {

    if (!availableSizes.includes(selectedSize)) {

        showMessage(translations[currentLanguage].chooseSize);
        return;

    }

    const existingItem = cart.find(item =>
        item.color === selectedColor &&
        item.size === selectedSize
    );

    if (existingItem) {

        existingItem.quantity += quantity;

    } else {

        cart.push({
            name: PRODUCT.name,
            price: PRODUCT.price,
            color: selectedColor,
            size: selectedSize,
            quantity: quantity
        });

    }

    saveCart();
    updateCartCounter();

    showMessage(translations[currentLanguage].added);

}

document.getElementById("addToCart").addEventListener("click", addToCart);

// =========================================
// CART COUNTER
// =========================================

function updateCartCounter() {

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    document.getElementById("cartCount").textContent = totalItems;

}

// =========================================
// CART MESSAGE
// =========================================

function showMessage(message) {

    const messageElement = document.getElementById("cartMessage");

    messageElement.textContent = message;

}

// =========================================
// VIEW CART
// =========================================

function showCart() {

    if (cart.length === 0) {

        alert(translations[currentLanguage].cartEmpty);
        return;

    }

    let total = 0;

    let summary = translations[currentLanguage].cartTitle + "\n\n";

    cart.forEach(item => {

        const subtotal = item.price * item.quantity;

        total += subtotal;

        summary +=
            `${item.name}\n` +
            `Color: ${item.color}\n` +
            `Size: ${item.size}\n` +
            `Quantity: ${item.quantity}\n` +
            `Subtotal: ${subtotal} MAD\n\n`;

    });

    summary +=
        "----------------------\n" +
        `${translations[currentLanguage].total}: ${total} MAD`;

    alert(summary);

}

// =========================================
// CART BUTTON
// =========================================

document.querySelector(".cart-link").addEventListener("click", event => {

    event.preventDefault();
    showCart();

});

// =========================================
// INITIALIZE
// =========================================

loadCart();

updateLanguage();

updateCartCounter();

selectColor("Beige");
