// ADD NEW BRANCH
var format = /[!@#$%^&*()_+\=\[\]{};':"\\|<>\/?]+/;
var phone_pattern = /^(\(0\d{1,3}\)\d{7})|(0\d{9,10})$/;

// Get the input elements
inputAddBranchName = document.getElementById("add-branch-name");
inputAddBranchAddress = document.getElementById("add-branch-address");
inputAddBranchPhone = document.getElementById("add-branch-phone");

// Get the error message elements
errorAddBranchName = document.getElementById("errorAddBranchName");
errorAddBranchAddress = document.getElementById("errorAddBranchAddress");
errorAddBranchPhone = document.getElementById("errorAddBranchPhone");

// Get the button element
buttonAddBranch = document.getElementById("buttonAddBranch");

// Add event listeners for the input elements
inputAddBranchName.addEventListener("input", function () {
  var inputValue = inputAddBranchName.value;
  // Perform validation or error checking on the entered value
  if (format.test(inputValue)) {
    RemoveDataBSDismissOfAddButton();
    errorAddBranchName.textContent =
      "Invalid branch's name, please enter again";
  } else {
    errorAddBranchName.textContent = ""; // Clear any previous error message
    AddDataBSDismissOfAddButton();
  }
});

// Add event listeners for the input elements
inputAddBranchAddress.addEventListener("input", function () {
  var inputValue = inputAddBranchAddress.value;
  // Perform validation or error checking on the entered value
  if (inputValue == "") {
    RemoveDataBSDismissOfAddButton();
    errorAddBranchAddress.textContent =
      "Invalid branch's address, please enter again";
  } else {
    errorAddBranchAddress.textContent = ""; // Clear any previous error message
    AddDataBSDismissOfAddButton();
  }
});

// Add event listeners for the input elements
inputAddBranchPhone.addEventListener("input", function () {
  var inputValue = inputAddBranchPhone.value;
  // Perform validation or error checking on the entered value
  if (phone_pattern.test(inputValue) == false) {
    RemoveDataBSDismissOfAddButton();
    errorAddBranchPhone.textContent =
      "Invalid branch's phone, please enter again";
  } else {
    errorAddBranchPhone.textContent = ""; // Clear any previous error message
    AddDataBSDismissOfAddButton();
  }
});

buttonAddBranch.addEventListener("click", function () {
  if (inputAddBranchName.value == "") {
    RemoveDataBSDismissOfAddButton();
    errorAddBranchName.textContent = "Please enter branch's name";
    return;
  }
  if (inputAddBranchPhone.value == "") {
    RemoveDataBSDismissOfAddButton();
    errorAddBranchPhone.textContent = "Please enter branch's phone";
    return;
  }
  if (inputAddBranchAddress.value == "") {
    RemoveDataBSDismissOfAddButton();
    errorAddBranchAddress.textContent = "Please choose branch's address";
    return;
  }
  if (
    errorAddBranchName.textContent != "" ||
    errorAddBranchPhone.textContent != "" ||
    errorAddBranchAddress.textContent != ""
  ) {
    RemoveDataBSDismissOfAddButton();
    return;
  }

  const data = {
    name: inputAddBranchName.value,
    address: inputAddBranchAddress.value,
    phone: inputAddBranchPhone.value,
  };
  $("body").append(
    '<div class="overlay"><div class="dot-spinner center"><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div></div></div>'
  );
  $.ajax({
    url: "/manage/branch",
    type: "POST",
    data: data,
    success: function (response) {
      $(".overlay").remove();
      Swal.fire({
        icon: "success",
        title: "Add branch successfully",
        showConfirmButton: false,
        timer: 2000,
      });

      const newBranch = document.createElement("tr");
      newBranch.setAttribute("id", "branch_" + response.branch.id);
      newBranch.setAttribute(
        "class",
        "text-center align-middle animate__animated animate__fadeInUp"
      );
      newBranch.innerHTML = `
                <td>${response.branch.id}</td>
                <td>${response.branch.name}</td>
                <td>${response.branch.phone}</td>
                <td>${response.branch.address}</td>
                <td>
                    <button class="bi bi-pencil-square border-0 bg-white" onclick="UpdateBranch(${response.branch.id})" data-bs-toggle="modal" data-bs-target="#updateBranchModal"></button>
                </td>
                <td>
                    <button class="bi bi-trash border-0 bg-white" onclick="DeleteBranch(${response.branch.id})"></button>
                </td>
            `;
      const table = document.getElementById("branchList");
      const firstRow = table.getElementsByTagName("tr")[0]; // Get the first row of the table
      table.insertBefore(newBranch, firstRow);

      // clear input
      inputAddBranchName.value = "";
      inputAddBranchPhone.value = "";
      inputAddBranchAddress.value = "";
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
    !buttonAddBranch.hasAttribute("data-bs-dismiss") &&
    errorAddBranchName.textContent == "" &&
    errorAddBranchAddress.textContent == "" &&
    errorAddBranchPhone.textContent == "" &&
    inputAddBranchName.value != "" &&
    inputAddBranchAddress.value != "" &&
    inputAddBranchPhone.value != ""
  ) {
    buttonAddBranch.setAttribute("data-bs-dismiss", "modal");
  }
}

function RemoveDataBSDismissOfAddButton() {
  if (buttonAddBranch.hasAttribute("data-bs-dismiss")) {
    buttonAddBranch.removeAttribute("data-bs-dismiss");
  }
}

// UPDATE BRANCH
// Get the input elements
inputUpdateBranchName = document.getElementById("update-branch-name");
inputUpdateBranchAddress = document.getElementById("update-branch-address");
inputUpdateBranchPhone = document.getElementById("update-branch-phone");

// Get the error message elements
errorUpdateBranchName = document.getElementById("errorUpdateBranchName");
errorUpdateBranchAddress = document.getElementById("errorUpdateBranchAddress");
errorUpdateBranchPhone = document.getElementById("errorUpdateBranchPhone");

// Get the button element
buttonUpdateBranch = document.getElementById("buttonUpdateBranch");

// Add event listeners for the input elements
inputUpdateBranchName.addEventListener("input", function () {
  var inputValue = inputUpdateBranchName.value;
  // Perform validation or error checking on the entered value
  if (format.test(inputValue)) {
    RemoveDataBSDismissOfUpdateButton();
    errorUpdateBranchName.textContent =
      "Invalid branch's name, please enter again";
  } else {
    errorUpdateBranchName.textContent = ""; // Clear any previous error message
    AddDataBSDismissOfUpdateButton();
  }
});

// Add event listeners for the input elements
inputUpdateBranchAddress.addEventListener("input", function () {
  var inputValue = inputUpdateBranchAddress.value;
  // Perform validation or error checking on the entered value
  if (inputValue == "") {
    RemoveDataBSDismissOfUpdateButton();
    errorUpdateBranchAddress.textContent =
      "Invalid branch's address, please enter again";
  } else {
    errorUpdateBranchAddress.textContent = ""; // Clear any previous error message
    AddDataBSDismissOfUpdateButton();
  }
});

// Add event listeners for the input elements
inputUpdateBranchPhone.addEventListener("input", function () {
  var inputValue = inputUpdateBranchPhone.value;
  // Perform validation or error checking on the entered value
  if (phone_pattern.test(inputValue) == false) {
    RemoveDataBSDismissOfUpdateButton();
    errorUpdateBranchPhone.textContent =
      "Invalid branch's phone, please enter again";
  } else {
    errorUpdateBranchPhone.textContent = ""; // Clear any previous error message
    AddDataBSDismissOfUpdateButton();
  }
});

function UpdateBranch(id) {
  $("body").append(
    '<div class="overlay"><div class="dot-spinner center"><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div></div></div>'
  );
  const path = "/manage/branch/" + id;
  $.ajax({
    url: path,
    type: "GET",
    success: function (response) {
      $(".overlay").remove();
      inputUpdateBranchName.value = response.branch.name;
      inputUpdateBranchAddress.value = response.branch.address;
      inputUpdateBranchPhone.value = response.branch.phone;
      buttonUpdateBranch.setAttribute("data-bs-dismiss", "modal");
      buttonUpdateBranch.setAttribute(
        "onclick",
        "UpdateBranchSubmit(" + id + ")"
      );
    },
    error: function (error) {
      $(".overlay").remove();
      console.error(error);
    },
  });
}

function UpdateBranchSubmit(id) {
  if (inputUpdateBranchName.value == "") {
    RemoveDataBSDismissOfUpdateButton();
    errorUpdateBranchName.textContent = "Please enter branch's name";
    return;
  }
  if (inputUpdateBranchPhone.value == "") {
    RemoveDataBSDismissOfUpdateButton();
    errorUpdateBranchPhone.textContent = "Please enter branch's phone";
    return;
  }
  if (inputUpdateBranchAddress.value == "") {
    RemoveDataBSDismissOfUpdateButton();
    errorUpdateBranchAddress.textContent = "Please choose branch's address";
    return;
  }
  if (
    errorUpdateBranchName.textContent != "" ||
    errorUpdateBranchPhone.textContent != "" ||
    errorUpdateBranchAddress.textContent != ""
  ) {
    RemoveDataBSDismissOfUpdateButton();
    return;
  }

  const data = {
    name: inputUpdateBranchName.value,
    address: inputUpdateBranchAddress.value,
    phone: inputUpdateBranchPhone.value,
  };
  $("body").append(
    '<div class="overlay"><div class="dot-spinner center"><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div></div></div>'
  );
  $.ajax({
    url: "/manage/branch/" + id,
    type: "PUT",
    data: data,
    success: function (response) {
      $(".overlay").remove();
      Swal.fire({
        icon: "success",
        title: "Update branch successfully",
        showConfirmButton: false,
        timer: 2000,
      });

      const branch = document.getElementById("branch_" + id);
      branch.innerHTML = `
                <td>${response.branch.id}</td>
                <td>${response.branch.name}</td>
                <td>${response.branch.phone}</td>
                <td>${response.branch.address}</td>
                <td>
                    <button class="bi bi-pencil-square border-0 bg-white" onclick="UpdateBranch(${response.branch.id})" data-bs-toggle="modal" data-bs-target="#updateBranchModal"></button>
                </td>
                <td>
                    <button class="bi bi-trash border-0 bg-white" onclick="DeleteBranch(${response.branch.id})"></button>
                </td>
            `;

      // clear input
      inputUpdateBranchName.value = "";
      inputUpdateBranchPhone.value = "";
      inputUpdateBranchAddress.value = "";
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
function DeleteBranch(id) {
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
      text: "This branch will be deleted",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No, keep it",
    })
    .then((result) => {
      if (result.isConfirmed) {
        $("body").append(
          '<div class="overlay"><div class="dot-spinner center"><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div></div></div>'
        );
        const path = "/manage/branch/" + id;
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

            var el = document.getElementById("branch_" + id);
            $(el)
              .closest("#branch_" + id)
              .css("background", "#f27474")
              .closest("#branch_" + id)
              .fadeOut(800, function () {
                $("#branch_" + id).remove();
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
    !buttonUpdateBranch.hasAttribute("data-bs-dismiss") &&
    errorUpdateBranchName.textContent == "" &&
    errorUpdateBranchAddress.textContent == "" &&
    errorUpdateBranchPhone.textContent == "" &&
    inputUpdateBranchName.value != "" &&
    inputUpdateBranchAddress.value != "" &&
    inputUpdateBranchPhone.value != ""
  ) {
    buttonUpdateBranch.setAttribute("data-bs-dismiss", "modal");
  }
}

function RemoveDataBSDismissOfUpdateButton() {
  if (buttonUpdateBranch.hasAttribute("data-bs-dismiss")) {
    buttonUpdateBranch.removeAttribute("data-bs-dismiss");
  }
}
