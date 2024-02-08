'use strict';

$(document).ready(() => {
    let menu = $('.menu');
    let btnMore = $('#more-projects');

    $('.header-burger').click(function () {
        menu.css('display', 'flex');
    });

    $('#menu-close').click(function () {
        menu.hide();
    });

    $('.btn-to-consultation').click(() => {
        $('#consultation')[0].scrollIntoView({behavior: "smooth"});
    });

    btnMore.click(function () {
        $('.project-more').css('display', 'grid');
        btnMore.parent('.action').hide();
    });

    $('.popup-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0,1]
        }
    });

    new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        shadowPerProgress: false,
        coverflowEffect: {
            rotate: 0,
            stretch: 1,
            depth: 300,
            modifier: 1,
            scale: 1,
            slideShadows: false,
        },
        direction: "horizontal",
        slidesPerView: "auto",
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    let phoneInput = $('#phone');
    let formInputs = $('.base-input');
    let inputColor = formInputs.css('border-color');
    let error = $('.error-input');
    let label = $('#label');

    formInputs.blur(function () {
        error.hide();
        formInputs.css('border-color', inputColor);
        for (let input of formInputs) {
            let element = $(input);
            if (!element.val()) {
                element.css('border-color', 'red');
                element.next().show();
            }
        }

        if (!checked) {
            label.attr('invalid', 'true');
        }
    });

    $('#consultation-btn').click(function () {
        let hasError = false;
        let checked = $('#checkbox').prop("checked");

        error.hide();
        formInputs.css('border-color', inputColor);
        label.attr('invalid', !checked);

        for (let input of formInputs) {
            let element = $(input);
            if (!element.val()) {
                element.css('border-color', 'red');
                element.next().show();
                hasError = true;
            }
        }

        if (!checked) {
            label.attr('invalid', 'true');
            hasError = true;
        }

        console.log(hasError);
        if (!hasError) {

            $.ajax({
                method: "POST",
                url: "https://testologia.site/checkout",
                data: {name: $('#name').val(), phone: phoneInput.val()}
            })
                .done(function (msg) {
                    if (msg.success) {
                        $('.consultation-info').hide();
                        $('.msg').show();
                    } else {
                        alert('Возникла ошибка при оформлении консультации, позвоните нам и запишитесь на консультацию');
                        formInputs.val('');
                        $('#checkbox').prop("checked", false);
                    }
                });
        }
    });

    phoneInput.inputmask({"mask": "+7 (999) 999-99-99"});

    $('.btn-sign-in').click(function () {
        $('.popup').show();
    });

    let popupFormInputs = $('.popup-input');

    $('#popup-close').click(function () {
        $('.popup').hide();
        $('.popup-info').show();
        $('.msg-popup').hide();
        popupFormInputs.val('');
        $('#checkbox-popup').prop("checked", false);
    });

    let popupPhoneInput = $('#phone-popup');
    let popupInputColor = popupFormInputs.css('border-color');


    popupFormInputs.blur(function () {
        error.hide();
        popupFormInputs.css('border-color', popupInputColor);
        for (let input of popupFormInputs) {
            let element = $(input);
            if (!element.val()) {
                element.css('border-color', 'red');
                element.next().show();
            }
        }

        if (!checked) {
            label.attr('invalid', 'true');
        }
    });

    $('#consultation-btn-popup').click(function () {
        let hasError = false;
        let label = $('#label-popup');
        let checked = $('#checkbox-popup').prop("checked");

        error.hide();
        popupFormInputs.css('border-color', popupInputColor);
        label.attr('invalid', !checked);

        for (let input of popupFormInputs) {
            let element = $(input);
            if (!element.val()) {
                element.css('border-color', 'red');
                element.next().show();
                hasError = true;
            }
        }

        if (!checked) {
            label.attr('invalid', 'true');
            hasError = true;
        }

        if (!hasError) {
            $.ajax({
                method: "POST",
                url: "https://testologia.site/checkout",
                data: {name: $('#name-popup').val(), phone: popupPhoneInput.val()}
            })
                .done(function (msg) {
                    if (msg.success) {
                        $('.popup-info').hide();
                        $('.msg-popup').show();
                    } else {
                        alert('Возникла ошибка при оформлении консультации, позвоните нам и запишитесь на консультацию');
                        popupFormInputs.val('');
                        $('#checkbox-popup').prop("checked", false);
                    }
                });
        }
    });

    popupPhoneInput.inputmask({"mask": "+7 (999) 999-99-99"});

    new WOW({
        animateClass: 'animate__animated'
    }).init();
});