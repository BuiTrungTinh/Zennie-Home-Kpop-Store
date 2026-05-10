function addToCart(name, price, img, quantity = 1) {
  // Lấy giỏ hàng hiện tại từ localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Kiểm tra sản phẩm đã tồn tại chưa
  let productIndex = cart.findIndex((item) => item.name === name);

  if (productIndex > -1) {
    // Nếu tồn tại, cộng thêm số lượng mới vào số lượng cũ
    cart[productIndex].quantity += quantity;
  } else {
    // Nếu chưa có, thêm mới với số lượng tương ứng
    cart.push({ name, price, img, quantity: quantity });
  }

  // Lưu lại vào localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Thông báo cập nhật (giữ nguyên code cũ của bạn)
  window.parent.postMessage("cartUpdated", "*");
  showToast("Đã thêm " + name + " vào giỏ hàng!");
}
// tạo thông báo góc phải
function showToast(message) {
  const toast = document.createElement("div");
  toast.classList.add("toast-notification");
  toast.innerHTML = "✅ " + message;

  window.parent.document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  // Tự động thu hồi sau 3 giây
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 3000);
}
function updateCartBadge() {
  // Lấy dữ liệu từ localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Tính tổng số lượng (quantity) của tất cả sản phẩm
  const totalQty = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0,
  );

  const badge = document.getElementById("cart-badge");
  if (badge) {
    badge.innerText = totalQty;
    badge.setAttribute("data-count", totalQty); //
  }
}

// Chạy ngay khi tải trang
window.addEventListener("DOMContentLoaded", updateCartBadge);

// tín hiệu từ các trang iframe gửi lên khi bấm "Thêm vào giỏ"
window.addEventListener("message", function (event) {
  if (event.data === "cartUpdated") {
    updateCartBadge();
  }
});
