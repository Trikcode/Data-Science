$(document).ready(function () {
  getPhoneNumbers();
  $("#submit-email").click(function () {
    var email = $("#email-address").val();
    var subject = $("#subject").val();
    var bodycontentt = $("#body-content").val();
    var regex =
      /^([a-zA-Z0-9_.+-])+\@@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (body - content.length < 1) {
      $("#body-content").addClass("warnEmpytForm");
      errorNoti("Please enter some content");
      return;
    }
    if (!regex.test(email)) {
      $("#email-address").addClass("warnEmpytForm");
      errorNoti("Please enter a valid email");
      return regex.test(email);
    }

    var data = new FormData();
    data.append("email-address", email);
    data.append("subject", subject);
    data.append("body-content", bodycontentt);

    showLoader();
    $.ajax({
      type: "post",
      url: "/PhoneNumber/PortClientPhoneNumber",
      processData: false,
      contentType: false,
      data: data,
      success: function (data) {
        successNoti(data);
        $("#email-address").val("");
        $("#subject").val("");
        $("#body-content").val("");
      },
      error: function () {
        errorNoti("There was a problem sending the email");
      },
    });
    hideLoader();
  });

  $("#submit-number").click(function (event) {
    event.preventDefault();

    $.post(
      "/PhoneNumber/BuyClientPhoneNumber",
      $("#client-email").serialize(),
      function (data) {
        getPhoneNumbers();
        if (data.indexOf("success") > -1) {
          successNoti(data);
        } else {
          errorNoti(data);
        }
      }
    ).error(function () {
      errorNoti("Number was was not saved");
    });
  });
});

function getPhoneNumbers() {
  $.post("/PhoneNumber/GetClientPhoneNumbers", function (data) {
    $("#client-number-container").html(data);
  }).fail(function () {
    errorNoti("Could not fetch numbers, Please try again");
  });
}
