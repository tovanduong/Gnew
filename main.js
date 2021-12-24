$(document).ready(function () {
    load();
    $(".notif").html('Chào mừng bạn tới trang tin tức GNew.<br> Click vào kính lúp để tìm kiếm tin tức, click kính lần nữa để tắt công cụ tìm kiếm.<br> Cảm ơn.')
    $("#close").click(function () {
        $(".notif-contain").css('display','none');
    })
    fetch('https://gnews.io/api/v4/top-headlines?' + "&" + "lang=" + "en" + "&" + '&token=6ea0f0008da321e78595316786e99675')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var arrContent = data.articles;
        console.log(arrContent);
        var htmlsContent = arrContent.map(function (arrContent) {
            return `<img class='col-sm-4' src=${arrContent.image}>
                   <div class='col-sm-8'>
                        <p><a href=${arrContent.url} target="_blank" style="text-decoration: none; color: black; font-size: 20px;">${arrContent.title}</a></p>
                        <p> ${arrContent.publishedAt}</p>
                        <p> ${arrContent.description}</p>
                    </div>`
        })
        var htmlContent = htmlsContent.join("");
        document.getElementById("content-search").innerHTML= htmlContent;
    })
        // =============notifi============
    
    $('#search').click(function () {
        $('#input').slideToggle("slow")  
    })
    $('#btn-input').click(function () {   
        var keywords = $('#text-input').val();
        if(keywords==""){
                $('#input').blur(function () {
                    $('#input').css('backgroundColor','white')
                }) 
        }else {
            let loader = '<div class="loader">'+
            '<span class="fas fa-spinner xoay icon"></span>'+
            '</div>';
            document.getElementById("content-search").innerHTML= loader;
            fetch('https://gnews.io/api/v4/search?q=' + keywords + "&" + "lang=" + "en" + "&" + '&token=6ea0f0008da321e78595316786e99675')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {       
                var tim = data.articles;
                console.log(tim);
                var htmls = tim.map(function (tim) {
                    return `<img class='col-sm-4' src=${tim.image}>
                        <div class='col-sm-8'>
                            <p><a href=${tim.url} target="_blank" style="text-decoration: none; color: black; font-size: 20px;">${tim.title}</a></p>
                            <p>${tim.publishedAt}</p>
                            <p>${tim.description}</p>
                        </div>`
                })
                var html = htmls.join("");
                document.getElementById("content-search").innerHTML= html;
            });
        }
        
        $('#input').slideUp("slow")
    })
    function load() {
        var x = document.onreadystatechange;
        if (x == 'interactive') {
            document.getElementsByClassName('main-content').style.visibility="hidden";
            document.getElementById('content-search').style.visibility="hidden";
            document.getElementsByClassName('notif-contain').style.visibility="hidden";
       } else if (x == 'complete') {
           setTimeout(function(){
              document.getElementById('interactive');
              document.getElementsByClassName('loader').style.visibility="hidden";
              document.getElementsByClassName('xoay').style.visibility="hidden";
              document.getElementsByClassName('icon').style.visibility="hidden";
              document.getElementsByClassName('main-content').style.visibility="visible";
              document.getElementsByClassName('notif-contain').style.display="block";
              document.getElementById('content-search').style.visibility="visible";
           },1000);
       }
    }   
})