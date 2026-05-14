function resizeIframe(iframe, isNewLoad = false) {
  setTimeout(() => {
    try {
      //  ép trình duyệt tính toán lại từ đầu
      iframe.style.height = "10px";

      const doc = iframe.contentWindow.document;
      const newHeight = Math.max(
        doc.body.scrollHeight,
        doc.documentElement.scrollHeight,
      );

      // Cập nhật chiều cao
      iframe.style.height = newHeight + 50 + "px";

      if (isNewLoad) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    } catch (error) {
      console.error("Lỗi Iframe: Mở bằng Live Server!", error);
    }
  }, 100);
}
//load về đầu trang
let lastWindowWidth = window.innerWidth;

window.addEventListener("resize", function () {
  const currentWidth = window.innerWidth;

  // chạy lại nếu có sự thay đổi về chiều rộng
  if (currentWidth !== lastWindowWidth) {
    const iframe = document.getElementsByName("content-frame")[0];
    if (iframe) {
      resizeIframe(iframe, false);
    }
    lastWindowWidth = currentWidth;
  }
});

function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQty = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0,
  );

  const badge = document.getElementById("cart-badge");
  if (badge) {
    badge.innerText = totalQty;
    badge.setAttribute("data-count", totalQty);
  }
}

const searchInput = document.querySelector(".search-bar");
const searchResultsBox = document.getElementById("search-results");

if (searchInput && searchResultsBox) {
  searchInput.addEventListener("input", function (e) {
    const keyword = e.target.value.toLowerCase().trim();

    if (!keyword) {
      searchResultsBox.style.display = "none";
      return;
    }

    const matchedProducts =
      typeof productsDatabase !== "undefined"
        ? productsDatabase
            .filter((p) => p.name.toLowerCase().includes(keyword))
            .slice(0, 3)
        : [];

    if (matchedProducts.length === 0) {
      searchResultsBox.innerHTML =
        '<div class="search-no-result">Không tìm thấy sản phẩm!</div>';
    } else {
      searchResultsBox.innerHTML = matchedProducts
        .map(
          (product) => `
            <a href="${product.link}" target="content-frame" class="search-result-item" onclick="closeSearch()">
                <img src="${product.img}" class="search-result-img" alt="${product.name}">
                <div class="search-result-info">
                    <span class="search-result-name">${product.name}</span>
                    <span class="search-result-price">${product.price}</span>
                </div>
            </a>
        `,
        )
        .join("");
    }
    searchResultsBox.style.display = "block";
  });

  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const keyword = e.target.value.trim();
      if (keyword) {
        closeSearch();
        const iframe = document.getElementsByName("content-frame")[0];
        if (iframe) {
          iframe.src = `page/search-result.html?q=${encodeURIComponent(keyword)}`;
        }
      }
    }
  });
}
function closeSearch() {
  if (searchResultsBox) {
    searchResultsBox.style.display = "none";
    searchInput.value = "";
  }
}

document.addEventListener("click", function (e) {
  if (
    searchInput &&
    !searchInput.contains(e.target) &&
    searchResultsBox &&
    !searchResultsBox.contains(e.target)
  ) {
    closeSearch();
  }
});

window.addEventListener("message", function (event) {
  if (event.data === "cartUpdated") {
    updateCartBadge();
  }
});

window.addEventListener("DOMContentLoaded", updateCartBadge);

//show menu
const categoryToggle = document.getElementById("category-toggle");
const categoryDropdown = document.getElementById("category-dropdown");
const categoryMenu = document.querySelector(".category-menu");

if (categoryToggle && categoryDropdown && categoryMenu) {
  categoryToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    categoryDropdown.classList.toggle("show");
    categoryMenu.classList.toggle("active");
  });

  document.addEventListener("click", function (e) {
    if (
      !categoryToggle.contains(e.target) &&
      !categoryDropdown.contains(e.target)
    ) {
      categoryDropdown.classList.remove("show");
      categoryMenu.classList.remove("active");
    }
  });
}
