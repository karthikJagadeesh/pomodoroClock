$(document).on("ready", function() {
  var tick, change = true, audio = $("#audio")[0]; // storing the reference of setInterval => tick
  var timer = {
    value: 1500,
    minutes: 24,
    seconds: 60,
    status: "work",
    changeStatus: function() {
      if (this.status == "work") this.status = "break";
      else if (this.status == "break") this.status = "work";
    },
    breakLength: 5,
    sessionLength: 25,
    isRunning: false,
    start: function() {
      var flag = true;
      clearInterval(tick);
      tick = setInterval(function() {
        if (timer.value > 0) {
          timer.seconds--
            if (timer.seconds == 0) {
              flag = false;
              $("#countdown").html(timer.minutes + ":0" + timer.seconds)
              timer.minutes--;
              timer.seconds = 60;
            }
        } else if (timer.value == 0) {
          timer.seconds--;
          audio.play();
          timer.changeStatus();
          if (timer.status == "break") {
            timer.value = timer.breakLength * 60;
            timer.minutes = timer.breakLength - 1;
          } else if (timer.status == "work") {
            timer.value = timer.sessionLength * 60;
            timer.minutes = timer.sessionLength - 1;
          }

          flag = false;
          $("#message").html(timer.status.toUpperCase());
          $("#countdown").html(timer.minutes + ":" + timer.seconds);
        }

        timer.value--;

        if (flag) {
          (timer.seconds >= 10) ? $("#countdown").html(timer.minutes + ":" + timer.seconds): $("#countdown").html(timer.minutes + ":0" + timer.seconds);
        }
        flag = true;
        console.log(timer.value);
      }, 1000)
    },
    stop: function() {
      clearInterval(tick);
    }
  }

  //The buttons on top

  $(".breakMinus").on("click", function() {
    if (change) {
      (timer.breakLength > 1) ? timer.breakLength--: timer.breakLength;
      $("#breakLength").html(timer.breakLength);
    }
    if (timer.status !== "work") {
      (timer.breakLength > 1) ? timer.breakLength--: timer.breakLength;
      timer.seconds = 60, timer.value = timer.breakLength * 60, timer.minutes = timer.breakLength - 1;
      $("#breakLength").html(timer.breakLength);
      if (timer.status !== "work") $("#countdown").html(timer.breakLength + ":00");
    }
  });
  $(".breakPlus").on("click", function() {
    if (change) {
      timer.breakLength++;
      $("#breakLength").html(timer.breakLength);
    }
    if (timer.status !== "work") {
      timer.breakLength++;
      timer.seconds = 60, timer.value = timer.breakLength * 60, timer.minutes = timer.breakLength - 1;
      $("#breakLength").html(timer.breakLength);
      if (timer.status !== "work") $("#countdown").html(timer.breakLength + ":00");
    }
  });

  $(".sessionMinus").on("click", function() {
    if (timer.status !== "break") {
      timer.seconds = 60;
      (timer.sessionLength > 1) ? timer.sessionLength--: timer.sessionLength;
      timer.value = timer.sessionLength * 60, timer.minutes = timer.sessionLength - 1;
      $("#sessionLength").html(timer.sessionLength);
      $("#countdown").html(timer.sessionLength + ":00");
    }
  });
  $(".sessionPlus").on("click", function() {
    if (timer.status !== "break") {
      timer.sessionLength++, timer.seconds = 60, timer.value = timer.sessionLength * 60, timer.minutes = timer.sessionLength - 1;
      $("#sessionLength").html(timer.sessionLength);
      $("#countdown").html(timer.sessionLength + ":00");
    }
  });

  //The Timer

  $(".start").on("click", function() {
    change = false;
    $(".breakMinus, .breakPlus, .sessionMinus, .sessionPlus").prop("disabled", true);
    if (timer.status == "work") timer.start();
    else if (timer.status == "break") timer.start();
  });

  $(".pause").on("click", function() {
    timer.stop();
    $(".breakMinus, .breakPlus, .sessionMinus, .sessionPlus").prop("disabled", false);
  });

});
