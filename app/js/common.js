$(function() {
    // validation
    //let namePattern = /^а-яёА-ЯЁ$/;
    let inputName = $('#cd-name');
    inputName.bind("change keyup input click", function() {
        if ( this.value.match(/[^а-яёА-ЯЁ]/) ) {
            this.value = this.value.replace( /[^а-яёА-ЯЁ]/, '' );
        }
    });
    inputName.focus(function () {
        $(this).siblings('span').removeClass('error').addClass('valid').html('Русские буквы, более 2х символов');
    }).blur(function () {
        if( $(this).val().length > 2 ) {
            $(this).siblings('span').html('');
        } else if ( $(this).val().length === 0 ) {
            $(this).siblings('span').removeClass('valid').addClass('error').html('Это поле обязательно для заполнения');
        } else {
            $(this).siblings('span').removeClass('valid').addClass('error').html('Имя должно быть длинне 2 букв');
        }
    });
    // end -------------------------------------
    // click menu
    $('.menu').on('click', function () {
        $(this).toggleClass('active');
        $('header nav').toggleClass('active');
    });
    $(document).mouseup(function (e) {
        let cart = $('.menu-wrapper');
        if (cart.has(e.target).length === 0) {
            $('header nav, .menu').removeClass('active');
        }
    });
    $('header a').on('click', function () {
        if ( $(document).width() < 992 ) {
            $('header nav, .menu').removeClass('active');
        }
    });
    // end ---------------------------------------------
    // form-input move top animation
    if ( $('.floating-labels').length > 0 ) floatLabels();
    function floatLabels() {
        let inputFields = $('.floating-labels .cd-label').next();
        inputFields.each(function() {
            let singleInput = $(this);
            singleInput.keyup(function() {
                checkVal(singleInput);
            });
        });
    }
    function checkVal(inputField) {
        ( inputField.val() == '' ) ? inputField.prev('.cd-label').removeClass('move-top') : inputField.prev('.cd-label').addClass('move-top');
    }
    // end ---------------------------------------

    // main slider -------------------------------------
    let owl = $('.work-slider').owlCarousel({
        loop: true,
        items: 3,
        margin: 30,
        nav: false,
        dotsContainer: '#ulcarousel-custom-dots',
        animateIn: "fadeIn",
        animateOut: "fadeOut",
        responsive: {
            0: {
                items:1
            },
            1000: {
                items:3
            }
        }
    });
    $('.button-prev').click(function() {
        $('.main-slider').owlCarousel().trigger('prev.owl.carousel');
    });
    $('.button-next').click(function() {
        $('.main-slider').owlCarousel().trigger('next.owl.carousel');
    });
    $('.owl-dot').click(function () {
        owl.trigger('to.owl.carousel', [$(this).index(), 300]);
    });
    // end ------------------------------------
    // team slider ------------------------------
    let owlTeam = $('.team-slider').owlCarousel({
        loop: true,
        items: 3,
        margin: 30,
        nav: false,
        dotsContainer: '#ulcarousel-custom-dots',
        animateIn: "fadeIn",
        animateOut: "fadeOut",
        responsive: {
            0: {
                items:1
            },
            1000: {
                items:3
            }
        }
    });
    $('.button-prev').click(function() {
        $('.main-slider').owlCarousel().trigger('prev.owl.carousel');
    });
    $('.button-next').click(function() {
        $('.main-slider').owlCarousel().trigger('next.owl.carousel');
    });
    $('.owl-dot').click(function () {
        owlTeam.trigger('to.owl.carousel', [$(this).index(), 300]);
    });
    // end -----------------------------------
    // scroll-to -----------------------------------------------
    $("a[href^='#']").click(function() {
        let _href = $(this).attr("href");
        if ( _href.length > 1 ) {
            $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
            return false;
        }
    });
    // end --------------------------------------------------
    // header nav - line
    let liActive = $('.l-active');
    let newPosition = liActive.position().left;
    let nWidth = liActive.width();
    $('.bot-line').css({'left': newPosition - 10, 'width': nWidth + 20});
    $('.header-nav').mouseover( function () {
            $('.header-nav li').hover(function() {
                let position = $(this).children('a').position().left;
                let _width = $(this).children('a').width();
                $('.bot-line').css(
                    {
                        'left': position - 10,
                        'width': _width + 20,
                        'transition': 'left 0.5s ease-out, width 0.5s ease-out'
                    }
                )
            });
        }).mouseleave( function () {
            $('.bot-line').css({'left': newPosition - 10, 'width': nWidth + 20});
        });
    // end --------------------------------------------------
    // header nav - on scroll add class "active" + scroll-box
    function onScroll() {
        let scroll_top = $(window).scrollTop();
        $('.scroll-box i:eq(0)').html('').append(scroll_top);
        $('.header-nav a').each(function()
        {
            let hash = $(this).attr("href");
            let target = $(hash);
            let targetStart = target.position().top;
            let targetHeight = target.outerHeight();
            let targetStartC = Math.floor(targetStart);
            let targetHeightC = Math.floor(targetHeight);
            let targetStartAndHeight = parseInt(targetStartC) + parseInt(targetHeightC);
            //console.log(targetStartAndHeight);
            if (targetStartC <= scroll_top && targetStartAndHeight > scroll_top && scroll_top !== 0)
            {
                $(this).addClass("active");
                $('.scroll-box i:eq(1)').html('').append(targetStart);
                $('.scroll-box i:eq(2)').html('').append(targetStartAndHeight);
            } else
            {
                $(this).removeClass("active");
            }
        });
    }
    $(document).on("scroll", onScroll);
    // end ------------------------------------
    $(window).on('scroll', function() {
        // services animation
        let windowScroll = $(window).scrollTop();
        let servicesStartPosition = $('#services').offset().top;
        let servicesHeight = $('#services').height();
        let windowHeight = $(window).height();
        if ( (servicesStartPosition - (windowHeight - servicesHeight)/2) <= windowScroll && windowScroll <= (servicesStartPosition + servicesHeight/2) ) {
            $('.services-item').css(
                {
                    'opacity': '1',
                    'transform': 'translateX(0px)'
                })
        } else {
            $('.services-item').css(
                {
                    'opacity': '0',
                    'transform': 'translateX(-100px)'
                });
        }
        // end ------------------------------------------------
        let windowWidth = $(document).width();
        if ( windowScroll > 0 && windowWidth >= 992 ) {
            $('nav').addClass('fixed-nav');
            $('.dot').addClass('visible');
        } else {
            $('nav').removeClass('fixed-nav');
            $('.dot').removeClass('visible');
        }
    });
});

