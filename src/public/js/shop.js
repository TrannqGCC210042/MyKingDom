var rangeInput = document.getElementById("rangeInput");
var valueSpan = document.getElementById("valueSpan");
var insert = document.getElementById("insert_button");

rangeInput.addEventListener("input", function () {
  valueSpan.textContent = rangeInput.value;

  if (valueSpan.textContent > "0") {
    window.location.href = "/shop?sort_by=price&price=" + valueSpan.textContent;
  }
});

function addToCart(id) {
  const cartCount = document.getElementById("cart-count");
  if (cartCount !== null) {
    $("body").append(
      '<div class="overlay"><div class="dot-spinner center"><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div></div></div>'
    );
    $.ajax({
      url: "/cart",
      type: "POST",
      data: {
        product_id: id,
        quantity: 1,
      },
      success: function (data) {
        $(".overlay").remove();
        Swal.fire({
          icon: "success",
          title: "Added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        if (cartCount !== null) {
          cartCount.textContent = data.count;
        }
      },
      error: function (error) {
        $(".overlay").remove();
        console.log(error);
      },
    });
  } else {
    window.location.href = "/login";
  }
}

function copyLink(id) {
  // Get the text field
  const url = window.location.origin;
  var copyText = url + "/detail/" + id;

  // Copy the text inside the text field
  navigator.clipboard.writeText(copyText);

  Swal.fire("Copy successfully!", copyText, "success");
}
