import { getProduct, checkStock } from './product.js';

let cartItems = [];

// Add product to cart
export function addToCart(productId, quantity) {
  // 1. Get product details
  let product = getProduct(productId);
  if (!product) return "Product not found";

  // 2. Check stock availability
  if (!checkStock(productId, quantity))
    return "stock unavailable";

  // 3. Check if product already in cart
  let item = cartItems.find(i => i.productId === productId);

  if (item) {
    // If yes, update quantity
    item.quantity += quantity;
  } else {
    // If no, add new item
    cartItems.push({productId,name: product.name,price: product.price,quantity});
  }

  // 4. Return success message
  return "Item added to cart";
}

// Remove product from cart
export function removeFromCart(productId) {
  cartItems = cartItems.filter(i => i.productId !== productId);
  return "Item removed from cart";
}

// Update quantity of product in cart
export function updateQuantity(productId, newQuantity) {
  if (!checkStock(productId, newQuantity))
    return "Stock not available";

  let item = cartItems.find(i => i.productId === productId);
  if (!item) return "Item not found";

  item.quantity = newQuantity;
  return "Quantity updated";
}

// Return all cart items
export function getCartItems() {
  return cartItems;
}

// Calculate total price of cart
export function getCartTotal() {
  let total = 0;
  cartItems.forEach(item => {total += item.price * item.quantity;});
  return total;
}

// Empty the cart
export function clearCart() {
  cartItems = [];
}