$("#btn-payment").click(function () {
  var phone_pattern = /^(\(0\d{1,3}\)\d{7})|(0\d{9})$/;
  // check valid input
  if (
    $("#firstName").val() == "" ||
    $("#lastName").val() == "" ||
    $("#telephone").val() == "" ||
    $("#address").val() == ""
  ) {
    $("#payment-error").text("Please fill in all fields.");
    return;
  }
  if (!phone_pattern.test($("#telephone").val())) {
    $("#payment-error").text("Invalid phone number.");
    return;
  }

  $("body").append(
    '<div class="overlay"><div class="dot-spinner center"><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div></div></div>'
  );
  $.ajax({
    url: "/payment/save",
    type: "POST",
    data: {
      first_name: $("#firstName").val(),
      last_name: $("#lastName").val(),
      telephone: $("#telephone").val(),
      address: $("#address").val(),
    },
    success: function (data) {
      $(".overlay").remove();
      console.log(data);
      Swal.fire("Success", data.message, "success").then((result) => {
        window.location.href = "/shop";
      });
    },
    error: function (err) {
      $(".overlay").remove();
      console.log(err);
    },
  });
});
