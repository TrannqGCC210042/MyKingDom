function plusProduct(id) {
  $("body").append(
    '<div class="overlay"><div class="dot-spinner center"><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div></div></div>'
  );
  $.ajax({
    url: "/cart/update",
    type: "POST",
    data: {
      cart_id: id,
      action: "plus",
    },
    success: function (response) {
      $(".overlay").remove();
      Swal.fire({
        icon: "success",
        title: "Change quantity successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      const quantity = document.getElementById(`quantity` + id);
      quantity.value = response.count;
      const price = document.getElementById(`price` + id);
      price.textContent = "$" + response.price.toFixed(2);
      const total = document.getElementById(`total`);
      total.textContent = "$" + response.total_price.toFixed(2);
      const count = document.getElementById(`count`);
      count.textContent = "ITEMS " + response.items;
    },
    error: function (error) {
      $(".overlay").remove();
      Swal.fire({
        icon: "error",
        title: "Update cart failed",
        text: error.responseJSON.message,
      });
    },
  });
}

function changeQuantity(event, id) {
  if (event.key === "Enter") {
    const quantity = document.getElementById(`quantity` + id);
    $("body").append(
      '<div class="overlay"><div class="dot-spinner center"><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div></div></div>'
    );
    $.ajax({
      url: "/cart/update",
      type: "POST",
      data: {
        cart_id: id,
        quantity: quantity.value,
        action: "change",
      },
      success: function (response) {
        $(".overlay").remove();
        Swal.fire({
          icon: "success",
          title: "Change quantity successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        const quantity = document.getElementById(`quantity` + id);
        quantity.value = response.count;
        const price = document.getElementById(`price` + id);
        price.textContent = "$" + response.price.toFixed(2);
        const total = document.getElementById(`total`);
        total.textContent = "$" + response.total_price.toFixed(2);
        const count = document.getElementById(`count`);
        count.textContent = response.total.items;
      },
      error: function (error) {
        $(".overlay").remove();
        Swal.fire({
          icon: "error",
          title: "Change quantity failed",
          text: error.responseJSON.message,
        });
      },
    });
  }
}

function minusProduct(id) {
  const quantity = document.getElementById(`quantity` + id);
  if (quantity.value == 1) {
    // DELETE CART
    deleteProduct(id);
  } else {
    // UPDATE CART MINUS
    $("body").append(
      '<div class="overlay"><div class="dot-spinner center"><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div></div></div>'
    );
    $.ajax({
      url: "/cart/update",
      type: "POST",
      data: {
        cart_id: id,
        action: "minus",
      },
      success: function (response) {
        $(".overlay").remove();
        Swal.fire({
          icon: "success",
          title: "Change quantity successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        quantity.value = response.count;
        const price = document.getElementById(`price` + id);
        price.textContent = "$" + response.price;
        const total = document.getElementById(`total`);
        total.textContent = "$" + response.total_price.toFixed(2);
        const count = document.getElementById(`count`);
        count.textContent = "ITEMS " + response.items;
      },
      error: function (error) {
        $(".overlay").remove();
        Swal.fire({
          icon: "error",
          title: "Update cart failed",
          text: error.responseJSON.message,
        });
      },
    });
  }
}

function deleteProduct(id) {
  Swal.fire({
    title: "Are you sure to remove?",
    showCancelButton: true,
    confirmButtonText: "Ok",
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      // DELETE CART
      $("body").append(
        '<div class="overlay"><div class="dot-spinner center"><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div></div></div>'
      );
      $.ajax({
        url: "/cart/delete",
        type: "POST",
        data: {
          cart_id: id,
        },
        success: function (response) {
          $(".overlay").remove();
          Swal.fire({
            icon: "success",
            title: "Remove cart successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          const count = document.getElementById(`cart-count`);
          count.textContent = parseInt(count.textContent) - 1;
          const remove_tag = document.getElementById(`row_cart` + id);
          remove_tag.remove();

          const cartProduct = document.getElementById("cartProduct");
          if (cartProduct.textContent.trim() === "") {
            const remove_shoppingCart = document.getElementById(`shoppingCart`);
            remove_shoppingCart.remove();

            const remove_summary = document.getElementById(`summary`);
            remove_summary.remove();

            const cartNew = document.getElementById(`cartNew`);
            cartNew.innerHTML = `<div id="cartEmpty"><img src="/img/cart/empty.gif" style=" display: block; margin-left: auto; margin-right: auto; width: 50%;" alt><p class="text-center" style=" display: block; margin-left: auto; margin-right: auto; ">Product Cart is empty</p></div>
            <div class="pt-5"><h6 class="mb-3 back"><a href="/shop" class="text-body fw-semibold"><i class="fas fa-long-arrow-alt-left ms-5 me-2"></i>Back to shop</a></h6></div>`;
          } else {
            const total = document.getElementById(`total`);
            const count = document.getElementById(`count`);

            total.textContent = "$" + response.total_price.toFixed(2);
            count.textContent = "ITEMS " + response.items;
          }
        },
      });
    }
  });
}
