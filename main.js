$(document).ready(function () {
    var data = "";
    $.get(
      "https://gnews.io/api/v4/top-headlines?&lang=en&token=6ea0f0008da321e78595316786e99675",
      function (data, status) {
        console.log(data);
        var arrContent = data.articles;
        console.log(arrContent);
        var htmlsContent = arrContent.map(function (arrContent) {
          return `<div class="container-content row">
                    <div class='col-4'><img src=${arrContent.image}></div>
                    <div class='col-8'>
                          <p><a href=${arrContent.url} target="_blank" style="text-decoration: none; color: black; font-size: 20px;">${arrContent.title}</a></p>
                          <p> ${arrContent.publishedAt}</p>
                          <p> ${arrContent.description}</p>
                      </div>
                  </div>`;
        });
        var htmlContent = htmlsContent.join("");
        $("#content-search").html(htmlContent);
      }
    );
    // =============notifi============
  
    $("#search").click(function () {
      $("#input").slideToggle("slow");
    });
    $("#btn-input").click(function () {
      var keywords = $("#text-input").val();
      if (keywords == "") {
        $("#input").blur(function () {
          $("#input").css("backgroundColor", "white");
        });
      } else {
        let loader =
          '<div class="loader">' +
          '<span class="fas fa-spinner xoay icon"></span>' +
          "</div>";
        $("#content-search").html(loader);
        $.get(
          "https://gnews.io/api/v4/search?q=" +
            keywords +
            "&lang=en&&token=6ea0f0008da321e78595316786e99675",
          function (data, status) {
            var tim = data.articles;
            console.log(tim);
            var htmls = tim.map(function (tim) {
              return `<div class="container-content">
                          <img class='col-4' src=${tim.image}>
                          <div class='col-8'>
                              <p><a href=${tim.url} target="_blank" style="text-decoration: none; color: black; font-size: 20px;">${tim.title}</a></p>
                              <p>${tim.publishedAt}</p>
                              <p>${tim.description}</p>
                          </div>
                      </div>`;
            });
            var html = htmls.join("");
            $("#content-search").html(html);
          }
        );
      }
      $("#input").slideUp("slow");
    });
  });
  