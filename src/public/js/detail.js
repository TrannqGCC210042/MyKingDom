const addToCartBtns = document.getElementById("add-to-cart");

addToCartBtns.addEventListener("click", (event) => {
  const cartCount = document.getElementById("cart-count");
  if (cartCount !== null) {
    const id = event.target.getAttribute("data-product-id");
    const count = document.getElementById("quantity");
    $("body").append(
      '<div class="overlay"><div class="dot-spinner center"><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div></div></div>'
    );
    $.ajax({
      url: "/cart",
      type: "POST",
      data: {
        product_id: id,
        quantity: count.value,
      },
      success: function (data) {
        $(".overlay").remove();
        if (cartCount !== null) {
          cartCount.textContent = data.count;
        }
        // Animate the product flying effect (optional)
        const product = document.getElementById("image");
        const clonedProduct = product.cloneNode(true);
        const flyItem = document.createElement("div");
        flyItem.classList.add("fly-item");
        flyItem.appendChild(clonedProduct);

        // Append the fly item to the document
        document.getElementById("templete").appendChild(flyItem);

        // Animate the fly item
        setTimeout(() => {
          flyItem.style.opacity = 1;
          flyItem.style.transform = "translate(75vw, -20vh)";
        }, 50);

        setTimeout(() => {
          document.getElementById("templete").removeChild(flyItem);
        }, 2000);

        // RESET QUANTITY
        count.value = 1;
      },
      error: function (error) {
        $(".overlay").remove();
        console.log(error);
      },
    });
  } else {
    window.location.href = "/login";
  }
});

$(document).ready(function () {
  $(".qtyminus").on("click", function () {
    var now = $(".qty").val();
    if ($.isNumeric(now)) {
      if (parseInt(now) - 1 > 0) {
        now--;
      }
      $(".qty").val(now);
    }
  });

  $(".qtyplus").on("click", function () {
    var now = $(".qty").val();
    var stock = document.getElementById("stock").innerHTML;
    if ($.isNumeric(now)) {
      if (parseInt(now) + 1 <= parseInt(stock)) {
        now++;
      }
      $(".qty").val(now);
    }
  });
});

function CheckStock(stock) {
  if (parseInt(stock) === 0) {
    Swal.fire(
      "Out of Stock",
      "Out of stock, please choose another product",
      "warning"
    );
    return false;
  }
  return true;
}
