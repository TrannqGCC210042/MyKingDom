$("#contact-form").submit(function (e) {
  e.preventDefault();
  const errorContact = document.querySelector("#error-contact");
  var name = $("#name").val();
  var subject = $("#subject").val();
  var email = $("#email").val();
  var message = $("#message").val();
  var email_pattern = /^[a-zA-Z]\w*(\.\w+)*\@\w+(\.\w{2,3})+$/;

  // Validate input fields
  if (!name || !subject || !email || !message) {
    errorContact.textContent = "Please fill in all fields!";
    errorContact.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  // Validate email
  if (!email_pattern.test(email)) {
    errorContact.textContent = "Invalid email!";
    errorContact.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  $("body").append(
    '<div class="overlay"><div class="dot-spinner center"><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div></div></div>'
  );
  $.ajax({
    url: "/contact",
    type: "POST",
    data: {
      name: name,
      subject: subject,
      email: email,
      message: message,
    },
    success: function (data) {
      $(".overlay").remove();
      Swal.fire({
        position: "center",
        icon: "success",
        title: data.message,
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        // clear form
        $("#name").val("");
        $("#subject").val("");
        $("#email").val("");
        $("#message").val("");
        errorContact.textContent = "";
      });
    },
  });
});
