function validateContactForm(event) {
  event.preventDefault();

  var name = document.getElementById("nameInput").value.trim();
  var phone = document.getElementById("phoneInput").value.trim();
  var email = document.getElementById("emailInput").value.trim();
  var message = document.getElementById("messageInput").value.trim();

  var isValid = true;

  if (name === "") {
    document.getElementById("nameError").textContent =
      "Vui lòng nhập tên của bạn.";
    isValid = false;
  } else {
    document.getElementById("nameError").textContent = "";
  }

  // Kiểm tra số điện thoại (Regex từ file của bạn)
  if (!validateNum(phone)) {
    document.getElementById("phoneError").textContent =
      "Số điện thoại không hợp lệ.";
    isValid = false;
  } else {
    document.getElementById("phoneError").textContent = "";
  }

  // Kiểm tra email (Regex từ file của bạn)
  if (!validateEmail(email)) {
    document.getElementById("emailError").textContent =
      "Vui lòng nhập email hợp lệ.";
    isValid = false;
  } else {
    document.getElementById("emailError").textContent = "";
  }

  // Kiểm tra lời nhắn
  if (message === "") {
    document.getElementById("messageError").textContent =
      "Bạn chưa nhập lời nhắn.";
    isValid = false;
  } else {
    document.getElementById("messageError").textContent = "";
  }

  if (isValid) {
    alert("Đặt hàng thành công!");
    document.getElementById("contactForm").reset();
  }

  return isValid;
}

function validateEmail(email) {
  var emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}

function validateNum(num) {
  var numRegex = /^(0|84)([0-9]{9})$/;
  return numRegex.test(num);
}
