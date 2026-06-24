// ============================
// Cart Functionality
// ============================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count
function updateCartCount() {
    const count = document.getElementById("cart-count");

    if (count) {
        count.textContent = cart.length;
    }
}

// Add to cart
function addToCart(name, price, image) {

    cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        name,
        price,
        image
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(`${name} added to cart`);
}

// Open cart page
function viewCart() {
    window.location.href = "cart.html";
}

// Display cart on cart.html
function displayCart() {

    const cartContainer =
        document.getElementById("cart-container");

    const cartTotal =
        document.getElementById("cart-total");

    if (!cartContainer) return;

    cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cartContainer.innerHTML = "";

    if (cart.length === 0) {

        cartContainer.innerHTML =
            "<h2>Your cart is empty</h2>";

        return;
    }

    cart.forEach((item, index) => {

        total += Number(item.price);

        cartContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}"
                     width="150">

                <h3>${item.name}</h3>

                <p>₹${item.price}</p>

                <button onclick="removeItem(${index})">
                    Remove
                </button>
            </div>
        `;
    });

    if (cartTotal) {
        cartTotal.textContent =
            `Total: ₹${total}`;
    }
}

// Remove item
function removeItem(index) {

    cart.splice(index, 1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();

    updateCartCount();
}

// Clear cart
function clearCart() {

    cart = [];

    localStorage.removeItem("cart");

    displayCart();

    updateCartCount();
}

// Page load
document.addEventListener("DOMContentLoaded", () => {

    cart = JSON.parse(localStorage.getItem("cart")) || [];

    updateCartCount();

    displayCart();
});
