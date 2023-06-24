// ADD NEW PRODUCT
var format = /[!@#$%^&*()_+\=\[\]{};':"\\|<>\/?]+/;
var regex = /^[+]?([0-9]*\.)?[0-9]+([eE][-+]?[0-9]+)?$/;

// Get the input elements
inputAddProductName = document.getElementById("add-product-name");
inputAddProductBrand = document.getElementById("add-product-brand");
inputAddProductBranch = document.getElementById("add-product-branch");
inputAddProductSupplier = document.getElementById("add-product-supplier");
inputAddProductSmallDescription = document.getElementById(
  "add-product-small-description"
);
inputAddProductDetailDescription = document.getElementById(
  "add-product-detail-description"
);
inputAddProductPrice = document.getElementById("add-product-price");
inputAddProductQuantity = document.getElementById("add-product-quantity");
inputAddProductGender = document.getElementsByName("add-product-gender");
inputAddProductImage = document.getElementById("add-product-image");

// Get the error message elements
errorAddProductName = document.getElementById("errorAddProductName");
errorAddProductBrand = document.getElementById("errorAddProductBrand");
errorAddProductBranch = document.getElementById("errorAddProductBranch");
errorAddProductSupplier = document.getElementById("errorAddProductSupplier");
errorAddProductSmallDescription = document.getElementById(
  "errorAddProductSmallDescription"
);
errorAddProductDetailDescription = document.getElementById(
  "errorAddProductDetailDescription"
);
errorAddProductPrice = document.getElementById("errorAddProductPrice");
errorAddProductQuantity = document.getElementById("errorAddProductQuantity");
errorAddProductGender = document.getElementById("errorAddProductGender");
errorAddProductImage = document.getElementById("errorAddProductImage");

// Get the button element
buttonAddProduct = document.getElementById("buttonAddProduct");

// Add event listeners for the input elements
inputAddProductName.addEventListener("input", function () {
  var inputValue = inputAddProductName.value;
  // Perform validation or error checking on the entered value
  if (format.test(inputValue)) {
    RemoveDataBSDismissOfAddButton();
    errorAddProductName.textContent =
      "Invalid product's name, please enter again";
  } else {
    errorAddProductName.textContent = ""; // Clear any previous error message
    AddDataBSDismissOfAddButton();
  }
});

// Add event listeners for the input elements
inputAddProductBrand.addEventListener("input", function () {
  var inputValue = inputAddProductBrand.value;
  // Perform validation or error checking on the entered value
  if (inputValue == 0) {
    RemoveDataBSDismissOfAddButton();
    errorAddProductBrand.textContent = "Please choose product's brand";
  } else {
    errorAddProductBrand.textContent = ""; // Clear any previous error message
    AddDataBSDismissOfAddButton();
  }
});

// Add event listeners for the input elements
inputAddProductBranch.addEventListener("input", function () {
  var inputValue = inputAddProductBranch.value;
  // Perform validation or error checking on the entered value
  if (inputValue == 0) {
    RemoveDataBSDismissOfAddButton();
    errorAddProductBranch.textContent = "Please choose product's branch";
  } else {
    errorAddProductBranch.textContent = ""; // Clear any previous error message
    AddDataBSDismissOfAddButton();
  }
});

// Add event listeners for the input elements
inputAddProductSupplier.addEventListener("input", function () {
  var inputValue = inputAddProductSupplier.value;
  // Perform validation or error checking on the entered value
  if (inputValue == 0) {
    RemoveDataBSDismissOfAddButton();
    errorAddProductSupplier.textContent = "Please choose product's supplier";
  } else {
    errorAddProductSupplier.textContent = ""; // Clear any previous error message
    AddDataBSDismissOfAddButton();
  }
});

// Add event listeners for the input elements
inputAddProductSmallDescription.addEventListener("input", function () {
  var inputValue = inputAddProductSmallDescription.value;
  // Perform validation or error checking on the entered value
  if (format.test(inputValue)) {
    RemoveDataBSDismissOfAddButton();
    errorAddProductSmallDescription.textContent =
      "Invalid product's small description, please enter again";
  } else {
    errorAddProductSmallDescription.textContent = ""; // Clear any previous error message
    AddDataBSDismissOfAddButton();
  }
});

// Add event listeners for the input elements
inputAddProductDetailDescription.addEventListener("input", function () {
  var inputValue = inputAddProductDetailDescription.value;
  // Perform validation or error checking on the entered value
  if (inputValue == "") {
    RemoveDataBSDismissOfAddButton();
    errorAddProductDetailDescription.textContent =
      "Invalid product's detail description, please enter again";
  } else {
    errorAddProductDetailDescription.textContent = ""; // Clear any previous error message
    AddDataBSDismissOfAddButton();
  }
});

// Add event listeners for the input elements
inputAddProductPrice.addEventListener("input", function () {
  var inputValue = inputAddProductPrice.value;
  // Perform validation or error checking on the entered value
  if (!regex.test(inputValue) || inputValue == 0) {
    RemoveDataBSDismissOfAddButton();
    errorAddProductPrice.textContent = "Invalid product's price";
  } else {
    errorAddProductPrice.textContent = ""; // Clear any previous error message
    AddDataBSDismissOfAddButton();
  }
});

// Add event listeners for the input elements
inputAddProductQuantity.addEventListener("input", function () {
  var inputValue = inputAddProductQuantity.value;
  // Perform validation or error checking on the entered value
  if (!regex.test(inputValue) || inputValue == 0) {
    RemoveDataBSDismissOfAddButton();
    errorAddProductQuantity.textContent = "Invalid product's quantity";
  } else {
    errorAddProductQuantity.textContent = ""; // Clear any previous error message
    AddDataBSDismissOfAddButton();
  }
});

// Add event listeners for the input elements
inputAddProductImage.addEventListener("input", function () {
  var inputValue = inputAddProductImage.value;
  // Perform validation or error checking on the entered value
  if (inputValue == "") {
    RemoveDataBSDismissOfAddButton();
    errorAddProductImage.textContent = "Please choose product's image";
  } else {
    errorAddProductImage.textContent = ""; // Clear any previous error message
    AddDataBSDismissOfAddButton();
  }
});

buttonAddProduct.addEventListener("click", function () {
  if (inputAddProductName.value == "") {
    RemoveDataBSDismissOfAddButton();
    errorAddProductName.textContent = "Please enter product's name";
    return;
  }
  if (inputAddProductBrand.value == 0) {
    RemoveDataBSDismissOfAddButton();
    errorAddProductBrand.textContent = "Please choose product's brand";
    return;
  }
  if (inputAddProductBranch.value == 0) {
    RemoveDataBSDismissOfAddButton();
    errorAddProductBranch.textContent = "Please choose product's branch";
    return;
  }
  if (inputAddProductSupplier.value == 0) {
    RemoveDataBSDismissOfAddButton();
    errorAddProductSupplier.textContent = "Please choose product's supplier";
    return;
  }
  var gender = "";
  for (var i = 0; i < inputAddProductGender.length; i++) {
    if (inputAddProductGender[i].checked) {
      gender = inputAddProductGender[i].value;
      break;
    }
  }
  if (gender == "") {
    RemoveDataBSDismissOfAddButton();
    errorAddProductGender.textContent = "Please choose product for gender";
    return;
  } else {
    errorAddProductGender.textContent = "";
  }
  if (inputAddProductSmallDescription.value == "") {
    RemoveDataBSDismissOfAddButton();
    errorAddProductSmallDescription.textContent =
      "Please enter product's small description";
    return;
  }
  if (inputAddProductDetailDescription.value === "") {
    RemoveDataBSDismissOfAddButton();
    errorAddProductDetailDescription.textContent =
      "Please enter product's detail description";
    return;
  } else {
    errorAddProductDetailDescription.textContent = "";
  }
  if (inputAddProductPrice.value == "") {
    RemoveDataBSDismissOfAddButton();
    errorAddProductPrice.textContent = "Please enter product's price";
    return;
  }
  if (inputAddProductQuantity.value == "") {
    RemoveDataBSDismissOfAddButton();
    errorAddProductQuantity.textContent = "Please enter product's quantity";
    return;
  }
  if (inputAddProductImage.value == "") {
    RemoveDataBSDismissOfAddButton();
    errorAddProductImage.textContent = "Please choose product's image";
    return;
  }
  if (
    errorAddProductName.textContent != "" ||
    errorAddProductBrand.textContent != "" ||
    errorAddProductBranch.textContent != "" ||
    errorAddProductSupplier.textContent != "" ||
    errorAddProductSmallDescription.textContent != "" ||
    errorAddProductDetailDescription.textContent != "" ||
    errorAddProductPrice.textContent != "" ||
    errorAddProductQuantity.textContent != "" ||
    errorAddProductGender.textContent != "" ||
    errorAddProductImage.textContent != ""
  ) {
    RemoveDataBSDismissOfAddButton();
    return;
  }

  const formData = new FormData();
  formData.append("name", inputAddProductName.value);
  formData.append("brand", inputAddProductBrand.value);
  formData.append("branch", inputAddProductBranch.value);
  formData.append("supplier", inputAddProductSupplier.value);
  formData.append("smallDescription", inputAddProductSmallDescription.value);
  formData.append("detailDescription", inputAddProductDetailDescription.value);
  formData.append("price", inputAddProductPrice.value);
  formData.append("quantity", inputAddProductQuantity.value);
  formData.append("gender", gender);
  formData.append("image", inputAddProductImage.files[0]);
  $("body").append(
    '<div class="overlay"><div class="dot-spinner center"><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div></div></div>'
  );
  $.ajax({
    url: "/manage/product",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      $(".overlay").remove();
      Swal.fire({
        icon: "success",
        title: "Add product successfully",
        showConfirmButton: false,
        timer: 2000,
      });

      const newProduct = document.createElement("tr");
      newProduct.setAttribute("id", "product_" + response.product.id);
      newProduct.setAttribute(
        "class",
        "text-center align-middle animate__animated animate__fadeInUp"
      );
      newProduct.innerHTML = `
            <td>${response.product.id}</td>
            <td>${response.product.name}</td>
            <td>${response.product.price}</td>
            <td>${response.product.gender}</td>
            <td>${response.product.quantity}</td>
            <td>${response.product.brand}</td>
            <td>${response.product.branch}</td>
            <td>${response.product.supplier}</td>
            <td>
                <img src="/img/product/${response.product.image}" alt="product's image" width="150">
            </td>
            <td>
                <button class="bi bi-pencil-square border-0 bg-white" onclick="UpdateProduct(${response.product.id})" data-bs-toggle="modal" data-bs-target="#updateProductModal"></button>
            </td>
            <td>
                <button class="bi bi-trash3 border-0 bg-white" onclick="DeleteProduct(${response.product.id})"></button>
            </td>
        `;
      const table = document.getElementById("productList");
      const firstRow = table.getElementsByTagName("tr")[0]; // Get the first row of the table
      table.insertBefore(newProduct, firstRow);

      // clear input
      inputAddProductName.value = "";
      inputAddProductBrand.value = 0;
      inputAddProductBranch.value = 0;
      inputAddProductSupplier.value = 0;
      inputAddProductSmallDescription.value = "";
      inputAddProductDetailDescription.value = "";
      inputAddProductPrice.value = "";
      inputAddProductQuantity.value = "";
      inputAddProductGender.value = "";
      inputAddProductImage.value = "";
      RemoveDataBSDismissOfAddButton();
    },
    error: function (error) {
      $(".overlay").remove();
      console.error(error);
      if (error.status === 400) {
        Swal.fire("Warning", error.responseJSON.error, "warning");
      }
      if (error.status === 500) {
        Swal.fire("Error", error.responseJSON.error, "error");
      }
    },
  });
});

function AddDataBSDismissOfAddButton() {
  if (
    !buttonAddProduct.hasAttribute("data-bs-dismiss") &&
    errorAddProductName.textContent == "" &&
    errorAddProductBrand.textContent == "" &&
    errorAddProductBranch.textContent == "" &&
    errorAddProductSupplier.textContent == "" &&
    errorAddProductSmallDescription.textContent == "" &&
    errorAddProductDetailDescription.textContent == "" &&
    errorAddProductPrice.textContent == "" &&
    errorAddProductQuantity.textContent == "" &&
    errorAddProductGender.textContent == "" &&
    errorAddProductImage.textContent == "" &&
    inputAddProductName.value != "" &&
    inputAddProductBrand.value != 0 &&
    inputAddProductBranch.value != 0 &&
    inputAddProductSupplier.value != 0 &&
    inputAddProductSmallDescription.value != "" &&
    inputAddProductDetailDescription.value != "" &&
    inputAddProductPrice.value != "" &&
    inputAddProductQuantity.value != "" &&
    inputAddProductGender.value != "" &&
    inputAddProductImage.value != ""
  ) {
    buttonAddProduct.setAttribute("data-bs-dismiss", "modal");
  }
}

function RemoveDataBSDismissOfAddButton() {
  if (buttonAddProduct.hasAttribute("data-bs-dismiss")) {
    buttonAddProduct.removeAttribute("data-bs-dismiss");
  }
}

// UPDATE PRODUCT
// Get the input elements
inputUpdateProductName = document.getElementById("update-product-name");
inputUpdateProductBrand = document.getElementById("update-product-brand");
inputUpdateProductBranch = document.getElementById("update-product-branch");
inputUpdateProductSupplier = document.getElementById("update-product-supplier");
inputUpdateProductSmallDescription = document.getElementById(
  "update-product-small-description"
);
inputUpdateProductDetailDescription = document.getElementById(
  "update-product-detail-description"
);
inputUpdateProductPrice = document.getElementById("update-product-price");
inputUpdateProductQuantity = document.getElementById("update-product-quantity");
inputUpdateProductGender = document.getElementsByName("update-product-gender");
inputUpdateProductImage = document.getElementById("update-product-image");
inputUpdateProductStatus = document.getElementsByName("update-product-status");
displayUpdateProductImage = document.getElementById(
  "display-image-update-product"
);

// Get the error message elements
errorUpdateProductName = document.getElementById("errorUpdateProductName");
errorUpdateProductBrand = document.getElementById("errorUpdateProductBrand");
errorUpdateProductBranch = document.getElementById("errorUpdateProductBranch");
errorUpdateProductSupplier = document.getElementById(
  "errorUpdateProductSupplier"
);
errorUpdateProductSmallDescription = document.getElementById(
  "errorUpdateProductSmallDescription"
);
errorUpdateProductDetailDescription = document.getElementById(
  "errorUpdateProductDetailDescription"
);
errorUpdateProductPrice = document.getElementById("errorUpdateProductPrice");
errorUpdateProductQuantity = document.getElementById(
  "errorUpdateProductQuantity"
);
errorUpdateProductGender = document.getElementById("errorUpdateProductGender");
errorUpdateProductStatus = document.getElementById("errorUpdateProductStatus");

// Get the button element
buttonUpdateProduct = document.getElementById("buttonUpdateProduct");

// Add event listeners for the input elements
inputUpdateProductName.addEventListener("input", function () {
  var inputValue = inputUpdateProductName.value;
  // Perform validation or error checking on the entered value
  if (format.test(inputValue)) {
    RemoveDataBSDismissOfUpdateButton();
    errorUpdateProductName.textContent =
      "Invalid product's name, please enter again";
  } else {
    errorUpdateProductName.textContent = ""; // Clear any previous error message
    AddDataBSDismissOfUpdateButton();
  }
});

// Add event listeners for the input elements
inputUpdateProductBrand.addEventListener("input", function () {
  var inputValue = inputUpdateProductBrand.value;
  // Perform validation or error checking on the entered value
  if (inputValue == 0) {
    RemoveDataBSDismissOfUpdateButton();
    errorUpdateProductBrand.textContent = "Please choose product's brand";
  } else {
    errorUpdateProductBrand.textContent = ""; // Clear any previous error message
    AddDataBSDismissOfUpdateButton();
  }
});

// Add event listeners for the input elements
inputUpdateProductBranch.addEventListener("input", function () {
  var inputValue = inputUpdateProductBranch.value;
  // Perform validation or error checking on the entered value
  if (inputValue == 0) {
    RemoveDataBSDismissOfUpdateButton();
    errorUpdateProductBranch.textContent = "Please choose product's branch";
  } else {
    errorUpdateProductBranch.textContent = ""; // Clear any previous error message
    AddDataBSDismissOfUpdateButton();
  }
});

// Add event listeners for the input elements
inputUpdateProductSupplier.addEventListener("input", function () {
  var inputValue = inputUpdateProductSupplier.value;
  // Perform validation or error checking on the entered value
  if (inputValue == 0) {
    RemoveDataBSDismissOfUpdateButton();
    errorUpdateProductSupplier.textContent = "Please choose product's supplier";
  } else {
    errorUpdateProductSupplier.textContent = ""; // Clear any previous error message
    AddDataBSDismissOfUpdateButton();
  }
});

// Add event listeners for the input elements
inputUpdateProductSmallDescription.addEventListener("input", function () {
  var inputValue = inputUpdateProductSmallDescription.value;
  // Perform validation or error checking on the entered value
  if (format.test(inputValue)) {
    RemoveDataBSDismissOfUpdateButton();
    errorUpdateProductSmallDescription.textContent =
      "Invalid product's small description, please enter again";
  } else {
    errorUpdateProductSmallDescription.textContent = ""; // Clear any previous error message
    AddDataBSDismissOfUpdateButton();
  }
});

// Add event listeners for the input elements
inputUpdateProductDetailDescription.addEventListener("input", function () {
  var inputValue = inputUpdateProductDetailDescription.value;
  // Perform validation or error checking on the entered value
  if (inputValue == "") {
    RemoveDataBSDismissOfUpdateButton();
    errorUpdateProductDetailDescription.textContent =
      "Invalid product's detail description, please enter again";
  } else {
    errorUpdateProductDetailDescription.textContent = ""; // Clear any previous error message
    AddDataBSDismissOfUpdateButton();
  }
});

// Add event listeners for the input elements
inputUpdateProductPrice.addEventListener("input", function () {
  var inputValue = inputUpdateProductPrice.value;
  // Perform validation or error checking on the entered value
  if (!regex.test(inputValue) || inputValue == 0) {
    RemoveDataBSDismissOfUpdateButton();
    errorUpdateProductPrice.textContent = "Invalid product's price";
  } else {
    errorUpdateProductPrice.textContent = ""; // Clear any previous error message
    AddDataBSDismissOfUpdateButton();
  }
});

// Add event listeners for the input elements
inputUpdateProductQuantity.addEventListener("input", function () {
  var inputValue = inputUpdateProductQuantity.value;
  // Perform validation or error checking on the entered value
  if (!regex.test(inputValue) || inputValue == 0) {
    RemoveDataBSDismissOfUpdateButton();
    errorUpdateProductQuantity.textContent = "Invalid product's quantity";
  } else {
    errorUpdateProductQuantity.textContent = ""; // Clear any previous error message
    AddDataBSDismissOfUpdateButton();
  }
});

function UpdateProduct(id) {
  $("body").append(
    '<div class="overlay"><div class="dot-spinner center"><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div></div></div>'
  );
  const path = "/manage/product/" + id;
  $.ajax({
    url: path,
    type: "GET",
    success: function (response) {
      $(".overlay").remove();
      inputUpdateProductName.value = response.product.name;
      inputUpdateProductBrand.value = response.product.brand_id;
      inputUpdateProductBranch.value = response.product.branch_id;
      inputUpdateProductSupplier.value = response.product.supplier_id;
      inputUpdateProductSmallDescription.value =
        response.product.short_description;
      inputUpdateProductDetailDescription.value =
        response.product.detail_description;
      inputUpdateProductPrice.value = response.product.price;
      inputUpdateProductQuantity.value = response.product.quantity;
      const gender = response.product.for_gender;
      for (var i = 0; i < inputUpdateProductGender.length; i++) {
        if (inputUpdateProductGender[i].value == gender) {
          inputUpdateProductGender[i].checked = true;
          break;
        }
      }
      const status = response.product.status;
      if (status) {
        inputUpdateProductStatus[0].checked = true;
      } else {
        inputUpdateProductStatus[1].checked = true;
      }
      displayUpdateProductImage.src = "/img/product/" + response.product.image;
      buttonUpdateProduct.setAttribute("data-bs-dismiss", "modal");
      buttonUpdateProduct.setAttribute(
        "onclick",
        "UpdateProductSubmit(" + id + ")"
      );
    },
    error: function (error) {
      $(".overlay").remove();
      console.error(error);
    },
  });
}

function UpdateProductSubmit(id) {
  if (inputUpdateProductName.value == "") {
    RemoveDataBSDismissOfUpdateButton();
    errorUpdateProductName.textContent = "Please enter product's name";
    return;
  }
  if (inputUpdateProductSmallDescription.value == "") {
    RemoveDataBSDismissOfUpdateButton();
    errorUpdateProductSmallDescription.textContent =
      "Please enter product's small description";
    return;
  }
  if (inputUpdateProductDetailDescription.value === "") {
    RemoveDataBSDismissOfUpdateButton();
    errorUpdateProductDetailDescription.textContent =
      "Please enter product's detail description";
    return;
  } else {
    errorUpdateProductDetailDescription.textContent = "";
  }
  if (inputUpdateProductPrice.value == "") {
    RemoveDataBSDismissOfUpdateButton();
    errorUpdateProductPrice.textContent = "Please enter product's price";
    return;
  }
  if (inputUpdateProductQuantity.value == "") {
    RemoveDataBSDismissOfUpdateButton();
    errorUpdateProductQuantity.textContent = "Please enter product's quantity";
    return;
  }
  var updateStatus = "";
  if (inputUpdateProductStatus[0].checked) {
    updateStatus = inputUpdateProductStatus[0].value;
  } else {
    updateStatus = inputUpdateProductStatus[1].value;
  }
  if (updateStatus == "") {
    RemoveDataBSDismissOfUpdateButton();
    errorUpdateProductStatus.textContent = "Please choose product's status";
    return;
  } else {
    errorUpdateProductStatus.textContent = "";
  }
  if (inputUpdateProductBrand.value == 0) {
    RemoveDataBSDismissOfUpdateButton();
    errorUpdateProductBrand.textContent = "Please choose product's brand";
    return;
  }
  if (inputUpdateProductBranch.value == 0) {
    RemoveDataBSDismissOfUpdateButton();
    errorUpdateProductBranch.textContent = "Please choose product's branch";
    return;
  }
  if (inputUpdateProductSupplier.value == 0) {
    RemoveDataBSDismissOfUpdateButton();
    errorUpdateProductSupplier.textContent = "Please choose product's supplier";
    return;
  }
  var updateGender = "";
  for (var i = 0; i < inputUpdateProductGender.length; i++) {
    if (inputUpdateProductGender[i].checked) {
      updateGender = inputUpdateProductGender[i].value;
      break;
    }
  }
  if (updateGender == "") {
    RemoveDataBSDismissOfUpdateButton();
    errorAddProductGender.textContent = "Please choose product for gender";
    return;
  } else {
    errorAddProductGender.textContent = "";
  }
  if (
    errorUpdateProductName.textContent != "" ||
    errorUpdateProductBrand.textContent != "" ||
    errorUpdateProductBranch.textContent != "" ||
    errorUpdateProductSupplier.textContent != "" ||
    errorUpdateProductSmallDescription.textContent != "" ||
    errorUpdateProductDetailDescription.textContent != "" ||
    errorUpdateProductPrice.textContent != "" ||
    errorUpdateProductQuantity.textContent != "" ||
    errorUpdateProductGender.textContent != ""
  ) {
    RemoveDataBSDismissOfUpdateButton();
    return;
  }

  const formData = new FormData();
  formData.append("name", inputUpdateProductName.value);
  formData.append("brand", inputUpdateProductBrand.value);
  formData.append("branch", inputUpdateProductBranch.value);
  formData.append("supplier", inputUpdateProductSupplier.value);
  formData.append("smallDescription", inputUpdateProductSmallDescription.value);
  formData.append(
    "detailDescription",
    inputUpdateProductDetailDescription.value
  );
  formData.append("price", inputUpdateProductPrice.value);
  formData.append("quantity", inputUpdateProductQuantity.value);
  formData.append("status", updateStatus);
  formData.append("gender", updateGender);
  formData.append("image", inputUpdateProductImage.files[0]);
  $("body").append(
    '<div class="overlay"><div class="dot-spinner center"><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div></div></div>'
  );
  $.ajax({
    url: "/manage/product/" + id,
    type: "PUT",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      $(".overlay").remove();
      Swal.fire({
        icon: "success",
        title: "Update product successfully",
        showConfirmButton: false,
        timer: 2000,
      });

      const product = document.getElementById("product_" + id);
      product.innerHTML = `
                <td>${response.product.id}</td>
                <td>${response.product.name}</td>
                <td>${response.product.price}</td>
                <td>${response.product.for_gender}</td>
                <td>${response.product.quantity}</td>
                <td>${response.product.brand_name}</td>
                <td>${response.product.branch_name}</td>
                <td>${response.product.supplier_name}</td>
                <td>
                    <img src="/img/product/${response.product.image}" alt="product's image" width="150">
                </td>
                <td>
                    <button class="bi bi-pencil-square border-0 bg-white" onclick="UpdateProduct(${response.product.id})" data-bs-toggle="modal" data-bs-target="#updateProductModal"></button>
                </td>
                <td>
                    <button class="bi bi-trash3 border-0 bg-white" onclick="DeleteProduct(${response.product.id})"></button>
                </td>
            `;

      // clear input
      inputUpdateProductName.value = "";
      inputUpdateProductBrand.value = 0;
      inputUpdateProductBranch.value = 0;
      inputUpdateProductSupplier.value = 0;
      inputUpdateProductSmallDescription.value = "";
      inputUpdateProductDetailDescription.value = "";
      inputUpdateProductPrice.value = "";
      inputUpdateProductQuantity.value = "";
      inputUpdateProductGender.value = "";
      inputUpdateProductImage.value = "";
      RemoveDataBSDismissOfUpdateButton();
    },
    error: function (error) {
      $(".overlay").remove();
      console.error(error);
      if (error.status === 400) {
        Swal.fire("Warning", error.responseJSON.error, "warning");
      }
      if (error.status === 500) {
        Swal.fire("Error", error.responseJSON.error, "error");
      }
    },
  });
}

function AddDataBSDismissOfUpdateButton() {
  if (
    !buttonUpdateProduct.hasAttribute("data-bs-dismiss") &&
    errorUpdateProductName.textContent == "" &&
    errorUpdateProductBrand.textContent == "" &&
    errorUpdateProductBranch.textContent == "" &&
    errorUpdateProductSupplier.textContent == "" &&
    errorUpdateProductSmallDescription.textContent == "" &&
    errorUpdateProductDetailDescription.textContent == "" &&
    errorUpdateProductPrice.textContent == "" &&
    errorUpdateProductQuantity.textContent == "" &&
    errorUpdateProductGender.textContent == "" &&
    inputUpdateProductName.value != "" &&
    inputUpdateProductBrand.value != 0 &&
    inputUpdateProductBranch.value != 0 &&
    inputUpdateProductSupplier.value != 0 &&
    inputUpdateProductSmallDescription.value != "" &&
    inputUpdateProductDetailDescription.value != "" &&
    inputUpdateProductPrice.value != "" &&
    inputUpdateProductQuantity.value != "" &&
    inputUpdateProductGender.value != ""
  ) {
    buttonUpdateProduct.setAttribute("data-bs-dismiss", "modal");
  }
}

function RemoveDataBSDismissOfUpdateButton() {
  if (buttonUpdateProduct.hasAttribute("data-bs-dismiss")) {
    buttonUpdateProduct.removeAttribute("data-bs-dismiss");
  }
}

// DELETE PRODUCT
function DeleteProduct(id) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success me-3",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      icon: "question",
      title: "Are you sure?",
      text: "This product will be deleted",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No, keep it",
    })
    .then((result) => {
      if (result.isConfirmed) {
        $("body").append(
          '<div class="overlay"><div class="dot-spinner center"><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div></div></div>'
        );
        const path = "/manage/product/" + id;
        $.ajax({
          url: path,
          type: "DELETE",
          success: function (response) {
            $(".overlay").remove();
            Swal.fire({
              icon: "success",
              title: response.message,
              showConfirmButton: false,
              timer: 2000,
            });

            var el = document.getElementById("product_" + id);
            $(el)
              .closest("#product_" + id)
              .css("background", "#f27474")
              .closest("#product_" + id)
              .fadeOut(800, function () {
                $("#product_" + id).remove();
              });
          },
          error: function (error) {
            $(".overlay").remove();
            console.error(error);
            if (error.status === 400) {
              Swal.fire("Warning", error.responseJSON.error, "warning");
            }
            if (error.status === 500) {
              Swal.fire("Error", error.responseJSON.error, "error");
            }
          },
        });
      }
    });
}
