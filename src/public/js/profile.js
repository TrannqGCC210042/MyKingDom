const isGender = document.getElementById("isGender");
if (isGender.value == "true") {
  const femaleGender = document.getElementById("femaleGender");
  femaleGender.checked = true;
} else {
  const maleGender = document.getElementById("maleGender");
  maleGender.checked = true;
}

// UPDATE PROFILE
$("#profile-form").submit(function (e) {
  e.preventDefault();

  var phone_pattern = /^(\(0\d{1,3}\)\d{7})|(0\d{9})$/;

  const firstNameInput = document.getElementById("first-name");
  const lastNameInput = document.getElementById("last-name");
  const genderInput = document.getElementsByName("gender");
  const birthdayInput = document.getElementById("birthday");
  const telephoneInput = document.getElementById("telephone");
  const addressInput = document.getElementById("address");
  const profileError = document.getElementById("profile-error");
  profileError.textContent = "";

  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  var gender;
  for (var i = 0; i < genderInput.length; i++) {
    if (genderInput[i].checked) {
      gender = genderInput[i].value;
      break;
    }
  }
  const birthday = birthdayInput.value;
  const telephone = telephoneInput.value;
  const address = addressInput.value;

  // Validate input fields
  if (!firstName || !lastName || !birthday || !telephone || !address) {
    profileError.textContent = "Please fill in all fields.";
    return;
  }

  // Validate telephone
  if (phone_pattern.test(telephone) == false) {
    profileError.textContent = "Telephone must be 10 digits.";
    return;
  }

  // Validate birthday
  var today = new Date();
  var birthDate = new Date(birthday);
  var age = today.getFullYear() - birthDate.getFullYear();
  var month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  if (age < 12) {
    profileError.textContent = "You must be at least 12 years old.";
    return;
  }
  // check address
  if (address.length < 5) {
    profileError.textContent = "Address must be at least 5 characters.";
    return;
  }

  var formData = new FormData(this);
  $("body").append(
    '<div class="overlay"><div class="dot-spinner center"><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div></div></div>'
  );
  $.ajax({
    url: "/user/update",
    type: "PUT",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      $(".overlay").remove();
      Swal.fire("Success", response.message, "success").then((result) => {
        window.location.href = "/user/profile";
      });
    },
    error: function (error) {
      $(".overlay").remove();
      console.error(error);
      if (error.status === 400) {
        profileError.textContent = error.responseJSON.error;
      }
    },
  });
});

// CHANGE PASSWORD
$("#change-password-form").submit(function (e) {
  // check valid new password
  e.preventDefault();
  const newPasswordInput = document.getElementById("newPassword");
  const newPassword = newPasswordInput.value;
  const newPasswordError = document.getElementById("newPasswordError");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const confirmPassword = confirmPasswordInput.value;  
  const oldPasswordInput = document.getElementById("oldPassword");
  const oldPassword = oldPasswordInput.value;
  const oldPasswordError = document.getElementById("oldPasswordError");
  oldPasswordError.textContent = "";
  //   change-password-error
  const changePasswordError = document.getElementById("change-password-error");
  changePasswordError.textContent = "";
  newPasswordError.textContent = "";

  //   check fill in all fields
  if (!newPassword || !confirmPassword || !oldPassword) {
    changePasswordError.textContent = "Please fill in all fields.";
    return;
  }

  if (newPassword.length < 6) {
    newPasswordError.textContent = "Password must more than 6 characters.";
    return;
  }

  // check valid confirm password
  if (confirmPassword != newPassword) {
    newPasswordError.textContent = "Confirm password does not match.";
    return;
  }

  // check old password and new password
  if (oldPassword == newPassword) {
    oldPasswordError.textContent =
      "New password must be different from old password.";
    return;
  }

  $.ajax({
    url: "/user/change-password",
    type: "PUT",
    data: {
      oldPassword: oldPassword,
      newPassword: newPassword,
    },
    success: function (response) {
      Swal.fire("Success", response.message, "success").then((result) => {
        window.location.href = "/user/profile";
      });
    },
    error: function (error) {
      console.error(error);
      if (error.status === 400) {
        oldPasswordError.textContent = error.responseJSON.error;
      }
      if (error.status === 500) {
        Swal.fire("Error", error.responseJSON.error, "error");
      }
    },
  });
});
