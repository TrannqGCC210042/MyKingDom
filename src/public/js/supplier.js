// ADD NEW BRANCH
var format = /[!@#$%^&*()_+\=\[\]{};':"\\|<>\/?]+/;
var phone_pattern = /^(\(0\d{1,3}\)\d{7})|(0\d{9,10})$/;
var email_pattern = /^[a-zA-Z]\w*(\.\w+)*\@\w+(\.\w{2,3})+$/;

// Get the input elements
inputAddSupplierName = document.getElementById("add-supplier-name");
inputAddSupplierAddress = document.getElementById("add-supplier-address");
inputAddSupplierPhone = document.getElementById("add-supplier-phone");
inputAddSupplierEmail = document.getElementById("add-supplier-email");

// Get the error message elements
errorAddSupplierName = document.getElementById("errorAddSupplierName");
errorAddSupplierAddress = document.getElementById("errorAddSupplierAddress");
errorAddSupplierPhone = document.getElementById("errorAddSupplierPhone");
errorAddSupplierEmail = document.getElementById("errorAddSupplierEmail");

// Get the button element
buttonAddSupplier = document.getElementById("buttonAddSupplier");

// Add event listeners for the input elements
inputAddSupplierName.addEventListener("input", function () {
  var inputValue = inputAddSupplierName.value;
  // Perform validation or error checking on the entered value
  if (format.test(inputValue)) {
    RemoveDataBSDismissOfAddButton();
    errorAddSupplierName.textContent =
      "Invalid supplier's name, please enter again";
  } else {
    errorAddSupplierName.textContent = ""; // Clear any previous error message
    AddDataBSDismissOfAddButton();
  }
});

// Add event listeners for the input elements
inputAddSupplierAddress.addEventListener("input", function () {
  var inputValue = inputAddSupplierAddress.value;
  // Perform validation or error checking on the entered value
  if (inputValue == "") {
    RemoveDataBSDismissOfAddButton();
    errorAddSupplierAddress.textContent =
      "Invalid supplier's address, please enter again";
  } else {
    errorAddSupplierAddress.textContent = ""; // Clear any previous error message
    AddDataBSDismissOfAddButton();
  }
});

// Add event listeners for the input elements
inputAddSupplierPhone.addEventListener("input", function () {
  var inputValue = inputAddSupplierPhone.value;
  // Perform validation or error checking on the entered value
  if (phone_pattern.test(inputValue) == false) {
    RemoveDataBSDismissOfAddButton();
    errorAddSupplierPhone.textContent =
      "Invalid supplier's phone, please enter again";
  } else {
    errorAddSupplierPhone.textContent = ""; // Clear any previous error message
    AddDataBSDismissOfAddButton();
  }
});

// Add event listeners for the input elements
inputAddSupplierEmail.addEventListener("input", function () {
  var inputValue = inputAddSupplierEmail.value;
  // Perform validation or error checking on the entered value
  if (email_pattern.test(inputValue) == false) {
    RemoveDataBSDismissOfAddButton();
    errorAddSupplierEmail.textContent =
      "Invalid supplier's email, please enter again";
  } else {
    errorAddSupplierEmail.textContent = ""; // Clear any previous error message
    AddDataBSDismissOfAddButton();
  }
});

buttonAddSupplier.addEventListener("click", function () {
  if (inputAddSupplierName.value == "") {
    RemoveDataBSDismissOfAddButton();
    errorAddSupplierName.textContent = "Please enter supplier's name";
    return;
  }
  if (inputAddSupplierPhone.value == "") {
    RemoveDataBSDismissOfAddButton();
    errorAddSupplierPhone.textContent = "Please enter supplier's phone";
    return;
  }
  if (inputAddSupplierAddress.value == "") {
    RemoveDataBSDismissOfAddButton();
    errorAddSupplierAddress.textContent = "Please choose supplier's address";
    return;
  }
  if (inputAddSupplierEmail.value == "") {
    RemoveDataBSDismissOfAddButton();
    errorAddSupplierEmail.textContent = "Please enter supplier's email";
    return;
  }
  if (
    errorAddSupplierName.textContent != "" ||
    errorAddSupplierPhone.textContent != "" ||
    errorAddSupplierAddress.textContent != "" ||
    errorAddSupplierEmail.textContent != ""
  ) {
    RemoveDataBSDismissOfAddButton();
    return;
  }

  const data = {
    name: inputAddSupplierName.value,
    address: inputAddSupplierAddress.value,
    phone: inputAddSupplierPhone.value,
    email: inputAddSupplierEmail.value,
  };
  $("body").append(
    '<div class="overlay"><div class="dot-spinner center"><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div></div></div>'
  );
  $.ajax({
    url: "/manage/supplier",
    type: "POST",
    data: data,
    success: function (response) {
      $(".overlay").remove();
      Swal.fire({
        icon: "success",
        title: "Add supplier successfully",
        showConfirmButton: false,
        timer: 2000,
      });

      const newSupplier = document.createElement("tr");
      newSupplier.setAttribute("id", "supplier_" + response.supplier.id);
      newSupplier.setAttribute(
        "class",
        "text-center align-middle animate__animated animate__fadeInUp"
      );
      newSupplier.innerHTML = `
                <td>${response.supplier.id}</td>
                <td>${response.supplier.name}</td>
                <td>${response.supplier.phone}</td>
                <td>${response.supplier.address}</td>
                <td>${response.supplier.email}</td>
                <td>
                    <button class="bi bi-pencil-square border-0 bg-white" onclick="UpdateSupplier(${response.supplier.id})" data-bs-toggle="modal" data-bs-target="#updateSupplierModal"></button>
                </td>
                <td>
                    <button class="bi bi-trash3 border-0 bg-white" onclick="DeleteSupplier(${response.supplier.id})"></button>
                </td>
            `;
      const table = document.getElementById("supplierList");
      const firstRow = table.getElementsByTagName("tr")[0]; // Get the first row of the table
      table.insertBefore(newSupplier, firstRow);

      // clear input
      inputAddSupplierName.value = "";
      inputAddSupplierPhone.value = "";
      inputAddSupplierAddress.value = "";
      inputAddSupplierEmail.value = "";
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
    !buttonAddSupplier.hasAttribute("data-bs-dismiss") &&
    errorAddSupplierName.textContent == "" &&
    errorAddSupplierPhone.textContent == "" &&
    errorAddSupplierAddress.textContent == "" &&
    errorAddSupplierEmail.textContent == "" &&
    inputAddSupplierName.value != "" &&
    inputAddSupplierPhone.value != "" &&
    inputAddSupplierAddress.value != "" &&
    inputAddSupplierEmail.value != ""
  ) {
    buttonAddSupplier.setAttribute("data-bs-dismiss", "modal");
  }
}

function RemoveDataBSDismissOfAddButton() {
  if (buttonAddSupplier.hasAttribute("data-bs-dismiss")) {
    buttonAddSupplier.removeAttribute("data-bs-dismiss");
  }
}

// UPDATE BRANCH
// Get the input elements
inputUpdateSupplierName = document.getElementById("update-supplier-name");
inputUpdateSupplierAddress = document.getElementById("update-supplier-address");
inputUpdateSupplierPhone = document.getElementById("update-supplier-phone");
inputUpdateSupplierEmail = document.getElementById("update-supplier-email");

// Get the error message elements
errorUpdateSupplierName = document.getElementById("errorUpdateSupplierName");
errorUpdateSupplierAddress = document.getElementById(
  "errorUpdateSupplierAddress"
);
errorUpdateSupplierPhone = document.getElementById("errorUpdateSupplierPhone");
errorUpdateSupplierEmail = document.getElementById("errorUpdateSupplierEmail");

// Get the button element
buttonUpdateSupplier = document.getElementById("buttonUpdateSupplier");

// Add event listeners for the input elements
inputUpdateSupplierName.addEventListener("input", function () {
  var inputValue = inputUpdateSupplierName.value;
  // Perform validation or error checking on the entered value
  if (format.test(inputValue)) {
    RemoveDataBSDismissOfUpdateButton();
    errorUpdateSupplierName.textContent =
      "Invalid supplier's name, please enter again";
  } else {
    errorUpdateSupplierName.textContent = ""; // Clear any previous error message
    AddDataBSDismissOfUpdateButton();
  }
});

// Add event listeners for the input elements
inputUpdateSupplierAddress.addEventListener("input", function () {
  var inputValue = inputUpdateSupplierAddress.value;
  // Perform validation or error checking on the entered value
  if (inputValue == "") {
    RemoveDataBSDismissOfUpdateButton();
    errorUpdateSupplierAddress.textContent =
      "Invalid supplier's address, please enter again";
  } else {
    errorUpdateSupplierAddress.textContent = ""; // Clear any previous error message
    AddDataBSDismissOfUpdateButton();
  }
});

// Add event listeners for the input elements
inputUpdateSupplierPhone.addEventListener("input", function () {
  var inputValue = inputUpdateSupplierPhone.value;
  // Perform validation or error checking on the entered value
  if (phone_pattern.test(inputValue) == false) {
    RemoveDataBSDismissOfUpdateButton();
    errorUpdateSupplierPhone.textContent =
      "Invalid supplier's phone, please enter again";
  } else {
    errorUpdateSupplierPhone.textContent = ""; // Clear any previous error message
    AddDataBSDismissOfUpdateButton();
  }
});

// Add event listeners for the input elements
inputUpdateSupplierEmail.addEventListener("input", function () {
  var inputValue = inputUpdateSupplierEmail.value;
  // Perform validation or error checking on the entered value
  if (email_pattern.test(inputValue) == false) {
    RemoveDataBSDismissOfUpdateButton();
    errorUpdateSupplierEmail.textContent =
      "Invalid supplier's email, please enter again";
  } else {
    errorUpdateSupplierEmail.textContent = ""; // Clear any previous error message
    AddDataBSDismissOfUpdateButton();
  }
});

function UpdateSupplier(id) {
  $("body").append(
    '<div class="overlay"><div class="dot-spinner center"><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div></div></div>'
  );
  const path = "/manage/supplier/" + id;
  $.ajax({
    url: path,
    type: "GET",
    success: function (response) {
      $(".overlay").remove();
      inputUpdateSupplierName.value = response.supplier.name;
      inputUpdateSupplierAddress.value = response.supplier.address;
      inputUpdateSupplierPhone.value = response.supplier.phone;
      inputUpdateSupplierEmail.value = response.supplier.email;
      buttonUpdateSupplier.setAttribute("data-bs-dismiss", "modal");
      buttonUpdateSupplier.setAttribute(
        "onclick",
        "UpdateSupplierSubmit(" + id + ")"
      );
    },
    error: function (error) {
      $(".overlay").remove();
      console.error(error);
    },
  });
}

function UpdateSupplierSubmit(id) {
  if (inputUpdateSupplierName.value == "") {
    RemoveDataBSDismissOfUpdateButton();
    errorUpdateSupplierName.textContent = "Please enter supplier's name";
    return;
  }
  if (inputUpdateSupplierPhone.value == "") {
    RemoveDataBSDismissOfUpdateButton();
    errorUpdateSupplierPhone.textContent = "Please enter supplier's phone";
    return;
  }
  if (inputUpdateSupplierAddress.value == "") {
    RemoveDataBSDismissOfUpdateButton();
    errorUpdateSupplierAddress.textContent = "Please choose supplier's address";
    return;
  }
  if (inputUpdateSupplierEmail.value == "") {
    RemoveDataBSDismissOfUpdateButton();
    errorUpdateSupplierEmail.textContent = "Please enter supplier's email";
    return;
  }
  if (
    errorUpdateSupplierName.textContent != "" ||
    errorUpdateSupplierPhone.textContent != "" ||
    errorUpdateSupplierAddress.textContent != "" ||
    errorUpdateSupplierEmail.textContent != ""
  ) {
    RemoveDataBSDismissOfUpdateButton();
    return;
  }

  const data = {
    name: inputUpdateSupplierName.value,
    address: inputUpdateSupplierAddress.value,
    phone: inputUpdateSupplierPhone.value,
    email: inputUpdateSupplierEmail.value,
  };
  $("body").append(
    '<div class="overlay"><div class="dot-spinner center"><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div></div></div>'
  );
  $.ajax({
    url: "/manage/supplier/" + id,
    type: "PUT",
    data: data,
    success: function (response) {
      $(".overlay").remove();
      Swal.fire({
        icon: "success",
        title: "Update supplier successfully",
        showConfirmButton: false,
        timer: 2000,
      });

      const supplier = document.getElementById("supplier_" + id);
      supplier.innerHTML = `
                <td>${response.supplier.id}</td>
                <td>${response.supplier.name}</td>
                <td>${response.supplier.phone}</td>
                <td>${response.supplier.address}</td>
                <td>${response.supplier.email}</td>
                <td>
                    <button class="bi bi-pencil-square border-0 bg-white" onclick="UpdateSupplier(${response.supplier.id})" data-bs-toggle="modal" data-bs-target="#updateSupplierModal"></button>
                </td>
                <td>
                    <button class="bi bi-trash3 border-0 bg-white" onclick="DeleteSupplier(${response.supplier.id})"></button>
                </td>
            `;

      // clear input
      inputUpdateSupplierName.value = "";
      inputUpdateSupplierPhone.value = "";
      inputUpdateSupplierAddress.value = "";
      inputUpdateSupplierEmail.value = "";
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

// DELETE BRANCH
function DeleteSupplier(id) {
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
      text: "This supplier will be deleted",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No, keep it",
    })
    .then((result) => {
      if (result.isConfirmed) {
        $("body").append(
          '<div class="overlay"><div class="dot-spinner center"><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div></div></div>'
        );
        const path = "/manage/supplier/" + id;
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

            var el = document.getElementById("supplier_" + id);
            $(el)
              .closest("#supplier_" + id)
              .css("background", "#f27474")
              .closest("#supplier_" + id)
              .fadeOut(800, function () {
                $("#supplier_" + id).remove();
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
    !buttonUpdateSupplier.hasAttribute("data-bs-dismiss") &&
    errorUpdateSupplierName.textContent == "" &&
    errorUpdateSupplierPhone.textContent == "" &&
    errorUpdateSupplierAddress.textContent == "" &&
    errorUpdateSupplierEmail.textContent == "" &&
    inputUpdateSupplierName.value != "" &&
    inputUpdateSupplierPhone.value != "" &&
    inputUpdateSupplierAddress.value != "" &&
    inputUpdateSupplierEmail.value != ""
  ) {
    buttonUpdateSupplier.setAttribute("data-bs-dismiss", "modal");
  }
}

function RemoveDataBSDismissOfUpdateButton() {
  if (buttonUpdateSupplier.hasAttribute("data-bs-dismiss")) {
    buttonUpdateSupplier.removeAttribute("data-bs-dismiss");
  }
}
