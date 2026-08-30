var backgrounds = [
    "images/1.jpg",
    "images/2.jpg",
    "images/3.jpg",
    "images/4.jpg",
    "images/5.jpg",
    "images/6.jpg",
    "images/7.jpg",
    "images/8.jpg",
    "images/9.jpg",
    "images/10.jpg",
    "images/11.jpg",
    "images/12.jpg"
];


// =====================================================
// انتخاب تصویر بک‌گراند
// =====================================================

var backgroundIndex = 0;

function getNextBackground() {

    var image =
        backgrounds[backgroundIndex];

    backgroundIndex++;

    if (
        backgroundIndex >=
        backgrounds.length
    ) {

        backgroundIndex = 0;

    }

    return image;

}


// =====================================================
// HERO SLIDER
// =====================================================

function initSlider() {

    var menu = [];

    jQuery('.swiper-slide').each(
        function (index) {

            menu.push(
                jQuery(this)
                    .find('.slide-inner')
                    .attr("data-text")
            );

        }
    );


    var interleaveOffset =
        0.5;


    var swiperOptions = {

        loop: true,

        speed: 1000,

        parallax: true,


        autoplay: {

            delay: 6500,

            disableOnInteraction: false

        },


        watchSlidesProgress: true,


        pagination: {

            el: '.swiper-pagination',

            clickable: true,

            type: "progressbar"

        },


        navigation: {

            nextEl: '.swiper-button-next',

            prevEl: '.swiper-button-prev'

        },


        on: {

            progress: function () {

                var swiper =
                    this;


                for (
                    var i = 0;
                    i < swiper.slides.length;
                    i++
                ) {

                    var slideProgress =
                        swiper.slides[i]
                            .progress;


                    var innerOffset =
                        swiper.width *
                        interleaveOffset;


                    var innerTranslate =
                        slideProgress *
                        innerOffset;


                    var inner =
                        swiper.slides[i]
                            .querySelector(
                                ".slide-inner"
                            );


                    if (inner) {

                        inner.style.transform =
                            "translate3d(" +
                            innerTranslate +
                            "px, 0, 0)";

                    }

                }

            },


            touchStart: function () {

                var swiper =
                    this;


                for (
                    var i = 0;
                    i < swiper.slides.length;
                    i++
                ) {

                    swiper.slides[i]
                        .style
                        .transition = "";

                }

            },


            setTransition: function (speed) {

                var swiper =
                    this;


                for (
                    var i = 0;
                    i < swiper.slides.length;
                    i++
                ) {

                    swiper.slides[i]
                        .style
                        .transition =
                        speed + "ms";


                    var inner =
                        swiper.slides[i]
                            .querySelector(
                                ".slide-inner"
                            );


                    if (inner) {

                        inner.style.transition =
                            speed + "ms";

                    }

                }

            }

        }

    };


    var swiper =
        new Swiper(
            ".swiper-container",
            swiperOptions
        );


    // =================================================
    // DATA BACKGROUND IMAGE
    // =================================================

    var sliderBgSetting =
        $(".slide-bg-image");


    sliderBgSetting.each(
        function (indx) {

            var background =
                $(this)
                    .attr("data-background");


            if (background) {

                $(this).css(
                    "background-image",
                    "url(" +
                    background +
                    ")"
                );

            }

        }
    );

}


// =====================================================
// ابزار تشخیص تصویر
// =====================================================

function debugNewsItem(item, index) {

    console.log(
        "RSS NEWS ITEM #" +
        (index + 1),
        item
    );


    try {

        console.log(
            "RSS NEWS KEYS #" +
            (index + 1),
            Object.keys(item)
        );

    }

    catch (error) {

        console.log(
            "RSS NEWS KEYS ERROR",
            error
        );

    }


    if (
        item &&
        typeof item === "object"
    ) {

        try {

            console.log(
                "RSS NEWS JSON #" +
                (index + 1),
                JSON.stringify(
                    item,
                    null,
                    2
                )
            );

        }

        catch (error) {

            console.log(
                "RSS NEWS JSON ERROR",
                error
            );

        }

    }

}


// =====================================================
// دریافت اخبار
// =====================================================

function getNews() {

    var setting =
        JSON.parse(
            getParam("settings")
        );


    /*
     * لینک RSS فقط از پنل Rayboard
     * دریافت می‌شود.
     */

    var rssUrl =
        setting
            .dataLibraries[0]
            .params
            .url;


    var urlSelection =
        rssUrl;


    try {

        urlSelection =
            urlSelection
                .replace(
                    "https://",
                    ""
                )
                .replace(
                    "http://",
                    ""
                );

    }

    catch (error) {

    }


    try {

        urlSelection =
            urlSelection.substring(
                0,
                urlSelection.indexOf("/")
            );

    }

    catch (error) {

    }


    try {

        urlSelection =
            urlSelection.substring(
                0,
                urlSelection.lastIndexOf(".")
            );

    }

    catch (error) {

    }


    try {

        urlSelection =
            urlSelection.substring(
                urlSelection.lastIndexOf(".") + 1,
                urlSelection.length
            );

    }

    catch (error) {

    }


    var graphic_setup =
        null;


    var options =
        null;


    try {

        graphic_setup =
            JSON.parse(
                getParam(
                    "graphic_setup"
                )
            );

    }

    catch (error) {

    }


    // =================================================
    // دریافت Feed
    // =================================================

    getLibraryFeeds(

        setting.dataLibraries,

        graphic_setup,

        options,


        function (list) {


            // =================================================
            // DEBUG
            // فقط برای پیدا کردن فیلد تصویر
            // =================================================

            console.log(
                "RSS URL FROM PANEL:",
                rssUrl
            );


            console.log(
                "RSS TOTAL NEWS:",
                list
                    ? list.length
                    : 0
            );


            if (
                list &&
                list.length > 0
            ) {

                for (
                    var debugIndex = 0;
                    debugIndex <
                    Math.min(
                        list.length,
                        3
                    );
                    debugIndex++
                ) {

                    debugNewsItem(
                        list[debugIndex],
                        debugIndex
                    );

                }

            }


            // =================================================
            // ساخت اسلایدها
            // =================================================

            for (
                let i = 0;
                i < list.length;
                i++
            ) {


                // =============================================
                // بک‌گراند جدید از پوشه images
                // =============================================

                var imagesrc =
                    getNextBackground();


                // =============================================
                // تاریخ
                // =============================================

                var dateString =
                    list[i].date;


                var date =
                    new Date(
                        dateString
                    );


                dateString =
                    date.toLocaleDateString(
                        'fa-IR',
                        {

                            year:
                                'numeric',

                            month:
                                'long',

                            day:
                                'numeric'

                        }
                    );


                // =============================================
                // توضیحات خبر
                // =============================================

                var d =
                    list[i].description ||
                    "";


                d =
                    d.replaceAll(
                        "<br>",
                        ""
                    );


                d =
                    d.replaceAll(
                        "<br/>",
                        ""
                    );


                // =============================================
                // عنوان خبر
                // =============================================

                var title =
                    list[i].title ||
                    "";


                // =============================================
                // ساخت اسلاید
                // =============================================

                var code =

                    '<div class="swiper-slide">' +

                    ' <div class="slide-inner slide-bg-image" ' +

                    'data-background="' +
                    imagesrc +
                    '">' +


                    ' <img class="slide-image" ' +

                    'src="' +
                    imagesrc +
                    '" ' +

                    'alt="" ' +

                    'loading="lazy" ' +

                    'decoding="async" />' +


                    ' <div class="container">' +


                    ' <div data-swiper-parallax="400" ' +

                    'class="slide-text">' +


                    ' <h2>' +

                    title +

                    '</h2>' +


                    ' <h3>' +

                    dateString +

                    "   |   " +

                    urlSelection +

                    '</h3>' +


                    ' </div>' +


                    ' <div class="clearfix"></div>' +


                    ' <div data-swiper-parallax="500" ' +

                    'class="slide-btns">' +


                    ' </div>' +


                    ' </div>' +


                    ' </div>' +


                    '</div>';


                document
                    .getElementById(
                        "slideContainer"
                    )
                    .insertAdjacentHTML(
                        "beforeend",
                        code
                    );

            }


            // =================================================
            // راه‌اندازی اسلایدر
            // =================================================

            initSlider();

        },


        function (er) {

            console.error(
                "RSS ERROR:",
                er
            );

        }

    );

}


// =====================================================
// INIT
// =====================================================

function init() {

    getNews();

}


try {

    onDelayedParamsReady(

        function () {

            init();

        }

    );

}

catch (error) {

}