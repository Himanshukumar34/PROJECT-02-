
const products = [
  { id: 1, name: "Smart Watch", price: 999, image: "https://via.placeholder.com/200?text=Smart+Watch", category: "Electronics" },
  { id: 2, name: "Headphones", price: 799, image: "https://via.placeholder.com/200?text=Headphones", category: "Electronics" },
  { id: 3, name: "Shoes", price: 1499, image: "https://via.placeholder.com/200?text=Shoes", category: "Fashion" },
  { id: 4, name: "Backpack", price: 699, image: "https://via.placeholder.com/200?text=Backpack", category: "Accessories" },
  { id: 5, name: "Sunglasses", price: 499, image: "https://via.placeholder.com/200?text=Sunglasses", category: "Accessories" },
  { id: 6, name: "T-shirt", price: 399, image: "https://via.placeholder.com/200?text=T-shirt", category: "Fashion" },
  { id: 7, name: "Bluetooth Speaker", price: 1299, image: "https://via.placeholder.com/200?text=Speaker", category: "Electronics" }
];


let cart = [];
let currentCategory = "all";


function displayProducts(list = products) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";
  if (list.length === 0) {
    container.innerHTML = '<p class="no-products">No products found.</p>';
    return;
  }
  list.forEach(p => {
    container.innerHTML += `
      <div class="product">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <span class="category">${p.category}</span>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}


function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCart();
  openCartModal();
}


function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");
  const count = document.getElementById("cart-count");
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, idx) => {
    total += item.price;
    cartItems.innerHTML += `<li>${item.name} - ₹${item.price} <button class='remove-btn' onclick='removeFromCart(${idx})'>Remove</button></li>`;
  });
  totalEl.innerText = total;
  count.innerText = cart.length;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}



function searchProduct() {
  const query = document.getElementById("search").value.toLowerCase();
  let filtered = products;
  if (currentCategory !== "all") {
    filtered = filtered.filter(p => p.category === currentCategory);
  }
  if (query) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(query));
  }
  displayProducts(filtered);
}

// Also trigger search on Enter key in search box
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('search').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      searchProduct();
    }
  });
});

function filterCategory() {
  const cat = document.getElementById("category-filter").value;
  currentCategory = cat;
  let filtered = products;
  if (cat !== "all") {
    filtered = products.filter(p => p.category === cat);
  }
  const query = document.getElementById("search").value.toLowerCase();
  if (query) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(query));
  }
  displayProducts(filtered);
}

// Modal functions
function openCartModal() {
  document.getElementById("cart-modal").style.display = "block";
  updateCart();
}
function closeCartModal() {
  document.getElementById("cart-modal").style.display = "none";
}

// Checkout
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Thank you for your purchase!\nOrder placed successfully.");
  cart = [];
  updateCart();
  closeCartModal();
}

// Load products
displayProducts();

// Close modal on outside click
window.onclick = function(event) {
  const modal = document.getElementById("cart-modal");
  if (event.target === modal) {
    closeCartModal();
  }
}
</html>