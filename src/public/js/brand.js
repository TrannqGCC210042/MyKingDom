// ADD NEW BRAND
var format = /[!@#$%^&*()_+\=\[\]{};':"\\|<>\/?]+/;

// Get the input elements
inputAddBrandName = document.getElementById("add-brand-name");
inputAddBrandImage = document.getElementById("add-brand-image");

// Get the error message elements
errorAddBrandName = document.getElementById("errorAddBrandName");
errorAddBrandImage = document.getElementById("errorAddBrandImage");

// Get the button element
buttonAddBrand = document.getElementById("buttonAddBrand");

// Add event listeners for the input elements
inputAddBrandName.addEventListener("input", function () {
  var inputValue = inputAddBrandName.value;
  // Perform validation or error checking on the entered value
  if (format.test(inputValue)) {
    RemoveDataBSDismissOfAddButton();
    errorAddBrandName.textContent = "Invalid brand's name, please enter again";
  } else {
    errorAddBrandName.textContent = ""; // Clear any previous error message
    AddDataBSDismissOfAddButton();
  }
});

// Add event listeners for the input elements
inputAddBrandImage.addEventListener("input", function () {
  var inputValue = inputAddBrandImage.value;
  // Perform validation or error checking on the entered value
  if (inputValue == "") {
    RemoveDataBSDismissOfAddButton();
    errorAddBrandImage.textContent = "Please choose brand's image";
  } else {
    errorAddBrandImage.textContent = ""; // Clear any previous error message
    AddDataBSDismissOfAddButton();
  }
});

buttonAddBrand.addEventListener("click", function () {
  if (inputAddBrandName.value == "") {
    RemoveDataBSDismissOfAddButton();
    errorAddBrandName.textContent = "Please enter brand's name";
    return;
  }
  if (inputAddBrandImage.value == "") {
    RemoveDataBSDismissOfAddButton();
    errorAddBrandImage.textContent = "Please choose brand's image";
    return;
  }
  if (
    errorAddBrandName.textContent != "" ||
    errorAddBrandImage.textContent != ""
  ) {
    RemoveDataBSDismissOfAddButton();
    return;
  }

  const formData = new FormData();
  formData.append("name", inputAddBrandName.value);
  formData.append("image", inputAddBrandImage.files[0]);
  $("body").append(
    '<div class="overlay"><div class="dot-spinner center"><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div></div></div>'
  );
  // SEND DATA TO SERVER USING AJAX
  $.ajax({
    url: "/manage/brand",
    method: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      $(".overlay").remove();
      Swal.fire({
        icon: "success",
        title: "Add brand successfully",
        showConfirmButton: false,
        timer: 2000,
      });

      const newBrand = document.createElement("tr");
      newBrand.setAttribute("id", "brand_" + response.brand.id);
      newBrand.setAttribute(
        "class",
        "text-center align-middle animate__animated animate__fadeInUp"
      );
      newBrand.innerHTML = `
                <td>${response.brand.id}</td>
                <td>${response.brand.name}</td>
                <td>
                    <img src="/img/brand/${response.brand.image}" alt="brand's image">
                </td>
                <td>
                    <button class="bi bi-pencil-square border-0 bg-white" onclick="UpdateBrand(${response.brand.id})" data-bs-toggle="modal" data-bs-target="#updateBrandModal"></button>
                </td>
                <td>
                    <button class="bi bi-trash3 border-0 bg-white" onclick="DeleteBrand(${response.brand.id})"></button>
                </td>
            `;
      const table = document.getElementById("brandList");
      const firstRow = table.getElementsByTagName("tr")[0]; // Get the first row of the table
      table.insertBefore(newBrand, firstRow);

      // clear input
      inputAddBrandName.value = "";
      inputAddBrandImage.value = "";
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
    !buttonAddBrand.hasAttribute("data-bs-dismiss") &&
    errorAddBrandName.textContent == "" &&
    errorAddBrandImage.textContent == "" &&
    inputAddBrandName.value != "" &&
    inputAddBrandImage.value != ""
  ) {
    buttonAddBrand.setAttribute("data-bs-dismiss", "modal");
  }
}

function RemoveDataBSDismissOfAddButton() {
  if (buttonAddBrand.hasAttribute("data-bs-dismiss")) {
    buttonAddBrand.removeAttribute("data-bs-dismiss");
  }
}

// UPDATE BRAND
// Get the input elements
inputUpdateBrandName = document.getElementById("update-brand-name");
inputUpdateBrandImage = document.getElementById("update-brand-image");
displayImageUpdateBrand = document.getElementById("display-image-update-brand");

// Get the error message elements
errorUpdateBrandName = document.getElementById("errorUpdateBrandName");

// Get the button element
buttonUpdateBrand = document.getElementById("buttonUpdateBrand");

// Add event listeners for the input elements
inputUpdateBrandName.addEventListener("input", function () {
  var inputValue = inputUpdateBrandName.value;
  // Perform validation or error checking on the entered value
  if (format.test(inputValue)) {
    RemoveDataBSDismissOfUpdateButton();
    errorUpdateBrandName.textContent =
      "Invalid brand's name, please enter again";
  } else {
    errorUpdateBrandName.textContent = ""; // Clear any previous error message
    AddDataBSDismissOfUpdateButton();
  }
});

function UpdateBrand(brandId) {
  $("body").append(
    '<div class="overlay"><div class="dot-spinner center"><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div></div></div>'
  );
  // GET A BRAND AJAX
  const path = "/manage/brand/" + brandId;
  $.ajax({
    url: path,
    type: "GET",
    processData: false,
    contentType: false,
    success: function (response) {
      $(".overlay").remove();
      inputUpdateBrandName.value = response.brand.name;
      displayImageUpdateBrand.src = "/img/brand/" + response.brand.image;
      buttonUpdateBrand.setAttribute("data-bs-dismiss", "modal");
      buttonUpdateBrand.setAttribute(
        "onclick",
        "UpdateBrandSubmit(" + brandId + ")"
      );
    },
    error: function (error) {
      $(".overlay").remove();
      console.error(error);
    },
  });
}

function UpdateBrandSubmit(id) {
  if (inputUpdateBrandName.value == "") {
    RemoveDataBSDismissOfUpdateButton();
    errorUpdateBrandName.textContent = "Please enter brand's name";
    return;
  }
  if (errorUpdateBrandName.textContent != "") {
    RemoveDataBSDismissOfUpdateButton();
    return;
  }

  const formData = new FormData();
  formData.append("name", inputUpdateBrandName.value);
  if (inputUpdateBrandImage.files.length === 0) {
    formData.append("image", "");
  } else {
    formData.append("image", inputUpdateBrandImage.files[0]);
  }

  $("body").append(
    '<div class="overlay"><div class="dot-spinner center"><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div></div></div>'
  );
  // SEND DATA TO SERVER USING AJAX
  const path = "/manage/brand/" + id;
  $.ajax({
    url: path,
    type: "PUT",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      $(".overlay").remove();
      Swal.fire({
        icon: "success",
        title: "Update brand successfully",
        showConfirmButton: false,
        timer: 2000,
      });

      const brand = document.getElementById("brand_" + response.brand.id);
      brand.innerHTML = `
                <td>${response.brand.id}</td>
                <td>${response.brand.name}</td>
                <td>
                    <img src="/img/brand/${response.brand.image}" alt="brand's image">
                </td>
                <td>
                    <button class="bi bi-pencil-square border-0 bg-white" onclick="UpdateBrand(${response.brand.id})" data-bs-toggle="modal" data-bs-target="#updateBrandModal"></button>
                </td>
                <td>
                    <button class="bi bi-trash3 border-0 bg-white" onclick="DeleteBrand(${response.brand.id})"></button>
                </td>
            `;

      // clear input
      inputUpdateBrandName.value = "";
      inputUpdateBrandImage.value = "";
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

// DELETE BRAND
function DeleteBrand(brandId) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success me-2",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      icon: "question",
      title: "Are you sure?",
      text: "This brand will be deleted",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No, keep it",
    })
    .then((result) => {
      if (result.isConfirmed) {
        $("body").append(
          '<div class="overlay"><div class="dot-spinner center"><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div></div></div>'
        );
        // DELETE A BRAND AJAX
        const path = "/manage/brand/" + brandId;
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

            var el = document.getElementById("brand_" + brandId);
            $(el)
              .closest("#brand_" + brandId)
              .css("background", "#f27474")
              .closest("#brand_" + brandId)
              .fadeOut(800, function () {
                $("#brand_" + brandId).remove();
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

function AddDataBSDismissOfUpdateButton() {
  if (
    !buttonUpdateBrand.hasAttribute("data-bs-dismiss") &&
    errorUpdateBrandName.textContent == "" &&
    inputUpdateBrandName.value != ""
  ) {
    buttonUpdateBrand.setAttribute("data-bs-dismiss", "modal");
  }
}

function RemoveDataBSDismissOfUpdateButton() {
  if (buttonUpdateBrand.hasAttribute("data-bs-dismiss")) {
    buttonUpdateBrand.removeAttribute("data-bs-dismiss");
  }
}
