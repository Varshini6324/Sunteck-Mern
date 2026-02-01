const products = [
  { id: 1, name: "Laptop", price: 50000, stock: 10, category: "electronics" },
  { id: 2, name: "Phone", price: 30000, stock: 15, category: "electronics" },
  { id: 3, name: "Headphones", price: 2000, stock: 25, category: "accessories" },
  { id: 4, name: "Mouse", price: 500, stock: 50, category: "accessories" },
  { id: 5, name: "Keyboard", price: 1500, stock: 30, category: "accessories" }
];

 // Find and return product by ID
export function getProduct(id) {
  return products.find(p => p.id === id);
}

// Return all products
export function getAllProducts() {
  return products;
}

// Filter products by category
export function getProductsByCategory(category) {
  return products.filter(p => p.category === category);
}

 // Search products by name (case-insensitive)
export function searchProducts(query) {
  return products.filter(p =>p.name.toLowerCase().includes(query.toLowerCase()));
}

//Check if product has enough stock
// Return true/false
export function checkStock(pid, quantity) {
    const product = getProduct(pid);
  return product && product.stock >= quantity;
}

// Reduce product stock after purchase
export function reduceStock(pid, quantity) {
  const product = getProduct(pid);
  if (product) product.stock -= quantity;
}