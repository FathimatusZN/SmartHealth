(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Sidebar Toggler
  $(".sidebar-toggler").click(function () {
    $(".sidebar, .content").toggleClass("open");
    return false;
  });

  // Progress Bar
  $(".pg-bar").waypoint(
    function () {
      $(".progress .progress-bar").each(function () {
        $(this).css("width", $(this).attr("aria-valuenow") + "%");
      });
    },
    { offset: "80%" }
  );

  // Calender
  $("#calender").datetimepicker({
    inline: true,
    format: "L",
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    items: 1,
    dots: true,
    loop: true,
    nav: false,
  });

  //Pendaftar Poli
  google.charts.load("current", { packages: ["corechart", "bar"] });
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    console.log("Mulai mengambil data dari adm_data_poli.php");

    $.ajax({
      url: "adm_data_poli.php", // Lokasi script PHP untuk mengambil data
      dataType: "json",
      async: true,
      success: function (response) {
        console.log("Data diterima:", response);

        // Create the data table from the JSON response
        var data = google.visualization.arrayToDataTable(response);

        var options = {
          title: "Jumlah Antrian per Poli",
          chartArea: { width: "50%" },
          hAxis: {
            title: "Jumlah Antrian",
            minValue: 0,
          },
          vAxis: {
            title: "Poli",
          },
        };

        var chart = new google.visualization.BarChart(
          document.getElementById("pendaftar-poli-chart")
        );

        chart.draw(data, options);
        console.log("Chart berhasil digambar");
      },
      error: function (xhr, status, error) {
        console.error("Error mengambil data:", status, error);
      },
    });
  }

  //Pendaftar Harian
  google.charts.load("current", {
    packages: ["corechart", "line"],
  });
  google.charts.setOnLoadCallback(drawHarianChart);

  function drawHarianChart() {
    console.log("Mulai mengambil data dari adm_data_harian.php");

    $.ajax({
      url: "adm_data_harian.php",
      dataType: "json",
      async: true,
      success: function (response) {
        console.log("Data diterima:", response);

        var data = google.visualization.arrayToDataTable(response);

        var options = {
          title: "Jumlah Pendaftar Harian (7 Hari Terakhir)",
          hAxis: {
            title: "Tanggal",
          },
          vAxis: {
            title: "Jumlah Pendaftar",
          },
        };

        var chart = new google.visualization.LineChart(
          document.getElementById("pendaftar-harian-chart")
        );

        chart.draw(data, options);
        console.log("Chart berhasil digambar");
      },
      error: function (xhr, status, error) {
        console.error("Error mengambil data:", status, error);
      },
    });
  }
})(jQuery);
