$(document).ready(function () {

  $(".menu_btn").click(function (e) {
    e.preventDefault();
    $("nav").addClass("open");
    $(".close-mobile-menu").addClass("open")
  });

  $(".close-mobile-menu").click(function (e) {
    e.preventDefault();
    $("nav").removeClass("open");
    $(this).removeClass("open");
  });

  $('.smart-basket__wrapper').smbasket({
    productElement: 'product__item',
    buttonAddToBasket: 'btn_order',
    countryCode: '+7',
    smartBasketCurrency: '₽',
    productSize: 'size__item',
    smartBasketMinArea: 'cart',
    productPrice: 'product__price',
    productQuantityWrapper: 'product__quantity',
    smartBasketMinIconPath: 'img/cart.png',
    telIsRequired: false,
    emailIsRequired: true,
    agreement: {
      isRequired: true,
      isChecked: true,
      isLink: '../politic.html'
    }
  });

  $(".hidden__content__name").click(function (e) {
    e.preventDefault();
    $(this).closest(".lookbook__content").find("a[href='#product-dialog']").trigger("click")
  });

  $(".btn_order").click(function (e) {
    e.preventDefault();
    $("#product-dialog .size__item:nth-child(1)").attr("data-sb-curent-id-or-vendor-code", $(this).closest(".product__item").find(".btn_order").data("sb-id-or-vendor-code") + "-1");
    $("#product-dialog .size__item:nth-child(2)").attr("data-sb-curent-id-or-vendor-code", +$(this).closest(".product__item").find(".btn_order").data("sb-id-or-vendor-code") + "-2");
    $("#product-dialog .size__item:nth-child(3)").attr("data-sb-curent-id-or-vendor-code", +$(this).closest(".product__item").find(".btn_order").data("sb-id-or-vendor-code") + "-3");
  });

  $("a[href='#product-dialog']").click(function () {
    price = +$(this).closest(".product__item").find(".btn_order").data("sb-product-price");
    $("#product-form-price").text(price);
    $("#product-img").attr("src", $(this).closest(".product__item").find("img").attr("src"));
    $("#product-name").text($(this).closest(".product__item").find(".product__title").text());
    $("#product-description").text($(this).closest(".product__item").find(".product__description").text())
    $(".btn_form_order").attr("data-sb-product-size", "S");
    $(".btn_form_order").attr("data-sb-product-price", +price);
    $(".btn_form_order").attr("data-sb-product-quantity", +price);
    $(".btn_form_order").attr("data-sb-id-or-vendor-code", $(this).closest(".product__item").find(".btn_order").data("sb-id-or-vendor-code") + "-1")
    $(".btn_form_order").attr("data-sb-product-name", $(this).closest(".product__item").find(".product__title").text());
    $(".btn_form_order").attr("data-sb-product-img", $(this).closest(".product__item").find("img").attr("src"));
    $("#product-dialog .size__item").attr("data-sb-curent-price", +price);
    $("#product-dialog .size__item:nth-child(1)").attr("data-sb-curent-id-or-vendor-code", $(this).closest(".product__item").find(".btn_order").data("sb-id-or-vendor-code") + "-1");
    $("#product-dialog .size__item:nth-child(2)").attr("data-sb-curent-id-or-vendor-code", +$(this).closest(".product__item").find(".btn_order").data("sb-id-or-vendor-code") + "-2");
    $("#product-dialog .size__item:nth-child(3)").attr("data-sb-curent-id-or-vendor-code", +$(this).closest(".product__item").find(".btn_order").data("sb-id-or-vendor-code") + "-3");
  });
  $('.banner-slider').slick({
    dots: true,
    arrows: false
  });

  $('.slider-product').slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });

  $('.popup-with-zoom-anim').magnificPopup({
    type: 'inline',

    fixedContentPos: false,
    fixedBgPos: true,

    overflowY: 'auto',

    closeBtnInside: true,
    preloader: false,

    midClick: true,
    removalDelay: 300,
    mainClass: 'my-mfp-zoom-in'
  });

  $('.popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });


  $('.popup-with-form').magnificPopup({
    type: 'inline',
    preloader: false,
    focus: '#name',

    // When elemened is focused, some mobile browsers in some cases zoom in
    // It looks not nice, so we disable it:
    callbacks: {
      beforeOpen: function () {
        if ($(window).width() < 700) {
          this.st.focus = false;
        } else {
          this.st.focus = '#name';
        }
      }
    }
  });

});

// Выбираем все ссылки с хэшем
$('a[href*="#"]')
  /* Убираем ненужные, либо те которые нужны для других целей, например для галерей, так что сюда можешь добавить список хешей на который плавный скролл не будет реагировать */
  .not('[href="#"]')
  .not('[href="#0"]')
  .not('[href^="#p"]')
  .click(function (event) {
    // Проверяем что все хеши на том домене
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Находим цель
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Существует ли целевой элемент?
      if (target.length) {
        // Блокируем поведение по умлочанию, только в случае если анимация на понадобилась
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function () {
          // Callback after animation
          // Меняем фокус (бывает полезно, обычно не мешает)
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Получил ли целевой элемент фокус
            return false;
          } else {
            $target.attr('tabindex', '-1');
            $target.focus();
          };
        });
      }
    }
  });

  function AjaxFormRequest(result_id, formMain, url) {
    jQuery.ajax({
      url: url,
      type: "POST",
      dataType: "html",
      data: jQuery("#" + formMain).serialize(),
      success: function (response) {
        $(':input', '#' + formMain)
          .not(':button, :submit, :reset, :hidden')
          .val('')
          .removeAttr('checked')
          .removeAttr('selected');
        setTimeout(() => {
          $("#message").hide();
        }, 5000);
      },
      error: function (response) {
        var par = document.getElementById(result_id);
        var error = document.createElement('p');
        error.classList.add("mt-3","error");
        error.innerHTML = "Возникла ошибка при отправке формы.";
        par.appendChild(error);
        setTimeout(func, 700);
      }
    });
  }
  
  function func() {
    $("p.mt-3").detach();
  }

  $('#contacts-form').submit(function (e) {
    e.preventDefault();
    AjaxFormRequest('errorSvyaz', 'contacts-form', '../svyaz.php');
  });