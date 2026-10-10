"use strict";
let products = [];
let nextId = 1;
const form = document.getElementById("productForm");
const nameInput = document.getElementById("productName");
const priceInput = document.getElementById("productPrice");
const quantityInput = document.getElementById("productQuantity");
const table = document.getElementById("inventoryTable");
const total = document.getElementById("totalProducts");
function displayProducts() {
    table.innerHTML = "";
    products.forEach((product) => {
        const row = document.createElement("tr");
        const nameCell = document.createElement("td");
        nameCell.textContent = product.name;
        const priceCell = document.createElement("td");
        priceCell.textContent = product.price.toFixed(2);
        const quantityCell = document.createElement("td");
        quantityCell.textContent = String(product.quantity);
        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Remove";
        deleteButton.addEventListener("click", () => {
            products = products.filter((item) => item.id !== product.id);
            displayProducts();
        });
        actionCell.appendChild(deleteButton);
        row.append(nameCell, priceCell, quantityCell, actionCell);
        table.appendChild(row);
    });
    total.textContent = String(products.length);
}
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    const price = Number(priceInput.value);
    const quantity = Number(quantityInput.value);
    if (name === "" || price <= 0 || quantity <= 0 ||
        !Number.isFinite(price) || !Number.isInteger(quantity)) {
        alert("Enter a valid product name, price, and quantity.");
        return;
    }
    const product = {
        id: nextId++,
        name: name,
        price: price,
        quantity: quantity
    };
    products.push(product);
    displayProducts();
    form.reset();
});
displayProducts();
