import { reduceStock } from "./product.js";
import { getCartItems, getCartTotal, clearCart } from "./cart.js";
import { applyDiscount } from "./discount.js";

// 1️ Process payment
export function processPayment(paymentMethod, couponCode = null) {

  // Get cart items and subtotal
  const cartItems = getCartItems();
  const subtotal = getCartTotal();

  // If cart is empty
  if (cartItems.length === 0) {
    return {
      status: "failed",
      message: "Cart is empty"
    };
  }

  // Apply discount (if coupon is given)
  let discount = 0;
  let total = subtotal;
  let discountMessage = "No coupon applied";

  if (couponCode) {
    const discountResult = applyDiscount(subtotal, couponCode, cartItems);
    discount = discountResult.discount;
    total = discountResult.finalTotal;
    discountMessage = discountResult.message;
  }

  // Validate payment method
  if (!validatePaymentMethod(paymentMethod)) {
    return {
      status: "failed",
      message: "Invalid payment method"
    };
  }

  // Process payment (simulation)
  const paymentSuccess = true; // assume payment always succeeds

  if (!paymentSuccess) {
    return {
      status: "failed",
      message: "Payment failed"
    };
  }

  // Reduce stock for each product
  for (let item of cartItems) {
    reduceStock(item.id, item.quantity);
  }

  //  Clear cart after payment
  clearCart();

  //  Generate order summary
  return {
    orderId: generateOrderId(),
    items: cartItems,
    subtotal: subtotal,
    discount: discount,
    total: total,
    paymentMethod: paymentMethod,
    status: "success",
    message: discountMessage
  };
}

// 2️ Validate payment method
export function validatePaymentMethod(method) {
  if (method === "card" || method === "upi" || method === "cod") {
    return true;
  }
  return false;
}

// 3️ Generate order ID
function generateOrderId() {
  return "ORD" + Date.now();
}