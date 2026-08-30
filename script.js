var backgrounds=["img/default.jpg","img/default1.jpg","img/default2.jpg","img/default3.jpg","img/default4.jpg"];
function initSlider() {
    // HERO SLIDER
    var menu = [];
    jQuery('.swiper-slide').each(function (index) {
        menu.push(jQuery(this).find('.slide-inner').attr("data-text"));
    });
    var interleaveOffset = 0.5;
    var swiperOptions = {
        loop: true,
        speed: 1000,
        parallax: true,
        autoplay: {
            delay: 6500,
            disableOnInteraction: false,
        },
        watchSlidesProgress: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            type: "progressbar",
        },
        // effect: 'coverflow',
        // coverflowEffect: {
        //   rotate: 30,
        //   slideShadows: false,
        // },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        on: {
            progress: function () {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    var slideProgress = swiper.slides[i].progress;
                    var innerOffset = swiper.width * interleaveOffset;
                    var innerTranslate = slideProgress * innerOffset;
                    swiper.slides[i].querySelector(".slide-inner").style.transform =
                        "translate3d(" + innerTranslate + "px, 0, 0)";
                }
            },

            touchStart: function () {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = "";
                }
            },

            setTransition: function (speed) {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = speed + "ms";
                    swiper.slides[i].querySelector(".slide-inner").style.transition =
                        speed + "ms";
                }
            }
        }
    };

    var swiper = new Swiper(".swiper-container", swiperOptions);

    // DATA BACKGROUND IMAGE
    var sliderBgSetting = $(".slide-bg-image");
    sliderBgSetting.each(function (indx) {
        if ($(this).attr("data-background")) {
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });
}

function getNews() {

    var setting = JSON.parse(getParam("settings"));
   // var setting = JSON.parse('{ "url": "https://content.rayboard.ir/rss_reader_1/index.html", "dataLibraries": [{ "type": "rss", "params": { "url": "https://www.mehrnews.com/rss" }, "options": { "limit": 10 } }], "name": "rss" }');

    var urlSelection = setting.dataLibraries[0].params.url;
    try {
        urlSelection = urlSelection.replace("https://", "").replace("http://", "");

    } catch (error) {

    }

    try {
        urlSelection = urlSelection.substring(0, urlSelection.indexOf("/"));

    } catch (error) {

    }

    try {
        urlSelection = urlSelection.substring(0, urlSelection.lastIndexOf("."));

    } catch (error) {

    }


    try {
        urlSelection = urlSelection.substring(urlSelection.lastIndexOf(".") + 1, urlSelection.length);

    } catch (error) {

    }







    var graphic_setup = null;
    var options = null;
    try { graphic_setup = JSON.parse(getParam("graphic_setup")); } catch (ee) { }
    getLibraryFeeds(setting.dataLibraries, graphic_setup, options, function (list) {




        for (let i = 0; i < list.length; i++) {
            
            var imagesrc =list[i].image;
            if((!imagesrc.toLowerCase().includes(".jpg"))&&
            !imagesrc.toLowerCase().includes(".jpeg")&&
            !imagesrc.toLowerCase().includes(".png")&&
            !imagesrc.toLowerCase().includes(".webp")&&
            !imagesrc.toLowerCase().includes(".svg"))
            {                
                var item = backgrounds[Math.floor(Math.random()*backgrounds.length)];
                imagesrc=item;
            }

          
            var dateString = list[i].date;
            var date= new Date(dateString);
            dateString= date.toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' })



            var d = list[i].description;
            d = d.replaceAll("<br>", "");
            d = d.replaceAll("<br/>", "");
            var code = '<div class="swiper-slide"> <div class="slide-inner slide-bg-image" data-background="">  <img  class="slide-image" src="' + imagesrc
                + '" /> <div class="container"> '
                // + '<h3 class="nameOfsite" >' + urlSelection + '</h3>'
                // + '<h3 class="dayOfnews" >' + dateString + '</h3>'
                + ' <div data-swiper-parallax="400" class="slide-text">  <h2>' + list[i].title
                + '</h2> '
               // + '<p>' + d + '</p> '
                + '<h3>' + dateString  + "   |   "+ urlSelection + '</h3> '
                + ' </div> <div class="clearfix"></div> <div data-swiper-parallax="500" class="slide-btns">   </div> </div> </div> </div>';


            document.getElementById("slideContainer").insertAdjacentHTML("beforeend", code);
            
        }

        initSlider();

    }, function (er) {

        console.error(er);


    });
}


function init(){
  
    getNews();

    
}
try {
    onDelayedParamsReady(function () {
        init();
    });
} catch (error) {}
