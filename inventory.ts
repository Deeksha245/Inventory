
let products: Product[] = [];
let nextId: number = 1;

const form = document.getElementById("productForm") as HTMLFormElement;
const nameInput = document.getElementById("productName") as HTMLInputElement;
const priceInput = document.getElementById("productPrice") as HTMLInputElement;
const quantityInput = document.getElementById("productQuantity") as HTMLInputElement;
const table = document.getElementById("inventoryTable") as HTMLTableSectionElement;
const total = document.getElementById("totalProducts") as HTMLSpanElement;

function displayProducts(): void {
    table.innerHTML = "";

    products.forEach((product: Product) => {
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
            products = products.filter((item: Product) => item.id !== product.id);
            displayProducts();
        });

        actionCell.appendChild(deleteButton);
        row.append(nameCell, priceCell, quantityCell, actionCell);
        table.appendChild(row);
    });

    total.textContent = String(products.length);
}

form.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const price = Number(priceInput.value);
    const quantity = Number(quantityInput.value);

    if (name === "" || price <= 0 || quantity <= 0 ||
        !Number.isFinite(price) || !Number.isInteger(quantity)) {
        alert("Enter a valid product name, price, and quantity.");
        return;
    }

    const product: Product = {
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
