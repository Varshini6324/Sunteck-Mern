// Available coupons
let coupons = {
  WELCOME10: { type: "percentage", value: 10, minAmount: 1000 },
  FLAT500: { type: "flat", value: 500, minAmount: 5000 },
  ELECTRONICS20: { type: 'percentage', value: 20, minAmount: 10000, category: 'electronics' }
};

//1. Check if coupon exists
// 2. Check minimum amount requirement
// 3. Check category requirement (if any)
// Return { valid: true/false, message: '...' }
export function validateCoupon(couponCode, cartTotal, cartItems) {
  // Check if coupon exists
  const coupon = coupons[couponCode];
  if (!coupon) {
    return { valid: false, message: "Invalid coupon code" };
  }

  // Check minimum amount requirement
  if (cartTotal < coupon.minAmount) {
    return { valid: false, message: "Minimum amount not satisfied" };
  }

  // Check category requirement (if any)
  if (coupon.category) {
    let categoryFound = false;

    for (let item of cartItems) {
      if (item.category === coupon.category) {
        categoryFound = true;
        break;
      }
    }

    if (!categoryFound) {
      return {
        valid: false,
        message: "Coupon applicable only for " + coupon.category
      };
    }
  }

  // If all checks passed
  return { valid: true, message: "Coupon applied successfully" };
}

// 2️ Calculate discount amount
export function calculateDiscount(couponCode, cartTotal) {
  const coupon = coupons[couponCode];

  // Percentage discount
  if (coupon.type === "percentage") {
    return (cartTotal * coupon.value) / 100;
  }

  // Flat discount
  if (coupon.type === "flat") {
    return coupon.value;
  }

  return 0;
}

// 3️ Apply discount
export function applyDiscount(cartTotal, couponCode, cartItems) {
  // Validate coupon
  const result = validateCoupon(couponCode, cartTotal, cartItems);

  // If coupon is invalid
  if (!result.valid) {
    return {
      originalTotal: cartTotal,
      discount: 0,
      finalTotal: cartTotal,
      message: result.message
    };
  }

  // Calculate discount
  const discount = calculateDiscount(couponCode, cartTotal);

  // Return final values
  return {
    originalTotal: cartTotal,
    discount: discount,
    finalTotal: cartTotal - discount,
    message: "Discount applied successfully"
  };
}