$("#login-form").submit(function (e) {
  e.preventDefault();

  const usernameInput = document.getElementById("login-username");
  const passwordInput = document.getElementById("login-password");
  const loginError = document.getElementById("login-error");
  loginError.textContent = "";

  const username = usernameInput.value;
  const password = passwordInput.value;

  // Validate input fields
  if (!username || !password) {
    loginError.textContent = "Please fill in all fields.";
    return;
  }

  const data = { username, password };
  $("body").append(
    '<div class="overlay"><div class="dot-spinner center"><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div></div></div>'
  );
  $.ajax({
    url: "/login",
    type: "post",
    data: data,

    success: function (response) {
      $(".overlay").remove();
      if (response.role) {
        window.location.href = "/manage/statistic";
      } else {
        window.location.href = "/";
      }
    },
    error: function (error) {
      $(".overlay").remove();
      console.error(error);
      loginError.textContent = error.responseJSON.error;
    },
  });
});

$("#google-form").submit(function (e) {
  e.preventDefault();

  const usernameInput = document.getElementById("register-username");
  const passwordInput = document.getElementById("register-password");
  const passwordConfirmInput = document.getElementById(
    "register-confirm-password"
  );
  const usernameError = document.getElementById("username-error");
  usernameError.textContent = "";
  const passwordError = document.getElementById("password-error");
  passwordError.textContent = "";
  const registerError = document.getElementById("register-error");
  registerError.textContent = "";

  const username = usernameInput.value;
  const password = passwordInput.value;
  const confirm = passwordConfirmInput.value;

  // Validate input fields
  if (!username || !password || !confirm) {
    registerError.textContent = "Please fill in all fields.";
    return;
  }

  // Username must be more than 6 characters
  if (username.length < 6) {
    usernameError.textContent = "Username must be more than 6 characters.";
    return;
  }

  // Username must be less than 18 characters
  if (username.length > 18) {
    usernameError.textContent = "Username must be less than 18 characters.";
    return;
  }

  //  Username must not contain whitespace
  if (username.includes(" ")) {
    usernameError.textContent = "Username must not contain whitespace.";
    return;
  }

  // Password must be more than 6 characters
  if (password.length < 6) {
    passwordError.textContent = "Password must be more than 6 characters.";
    passwordConfirmInput.value = "";
    return;
  }

  // Password and confirm password must match
  if (password !== confirm) {
    passwordError.textContent = "Password and confirm password must match.";
    passwordConfirmInput.value = "";
    return;
  }

  const data = { username, password };
  $("body").append(
    '<div class="overlay"><div class="dot-spinner center"><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div></div></div>'
  );
  $.ajax({
    url: "/login/google-register",
    type: "post",
    data: data,

    success: function (response) {
      $(".overlay").remove();
      Swal.fire({
        icon: "success",
        title: response.message,
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        window.location.href = "/";
      });
    },
    error: function (error) {
      $(".overlay").remove();
      if (error.status === 400) {
        registerError.textContent = error.responseJSON.error;
      }
      console.log(error);
    },
  });
});

$("#facebook-form").submit(function (e) {
  e.preventDefault();

  const usernameInput = document.getElementById("register-username");
  const passwordInput = document.getElementById("register-password");
  const passwordConfirmInput = document.getElementById(
    "register-confirm-password"
  );
  const usernameError = document.getElementById("username-error");
  usernameError.textContent = "";
  const passwordError = document.getElementById("password-error");
  passwordError.textContent = "";
  const registerError = document.getElementById("register-error");
  registerError.textContent = "";

  const username = usernameInput.value;
  const password = passwordInput.value;
  const confirm = passwordConfirmInput.value;

  // Validate input fields
  if (!username || !password || !confirm) {
    registerError.textContent = "Please fill in all fields.";
    return;
  }

  // Username must be more than 6 characters
  if (username.length < 6) {
    usernameError.textContent = "Username must be more than 6 characters.";
    return;
  }

  // Username must be less than 18 characters
  if (username.length > 18) {
    usernameError.textContent = "Username must be less than 18 characters.";
    return;
  }

  //  Username must not contain whitespace
  if (username.includes(" ")) {
    usernameError.textContent = "Username must not contain whitespace.";
    return;
  }

  // Password must be more than 6 characters
  if (password.length < 6) {
    passwordError.textContent = "Password must be more than 6 characters.";
    return;
  }

  // Password and confirm password must match
  if (password !== confirm) {
    passwordError.textContent = "Password and confirm password must match.";
    passwordConfirmInput.value = "";
    return;
  }

  const data = { username, password };
  $("body").append(
    '<div class="overlay"><div class="dot-spinner center"><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div></div></div>'
  );
  $.ajax({
    url: "/login/facebook-register",
    type: "post",
    data: data,

    success: function (response) {
      $(".overlay").remove();
      Swal.fire({
        icon: "success",
        title: response.message,
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        window.location.href = "/";
      });
    },
    error: function (error) {
      $(".overlay").remove();
      if (error.status === 400) {
        registerError.textContent = error.responseJSON.error;
      }
      console.log(error);
    },
  });
});
