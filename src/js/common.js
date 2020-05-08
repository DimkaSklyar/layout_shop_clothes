$(document).ready(function () {

  $('.smart-basket__wrapper').smbasket({
    productElement: 'product__item',
    buttonAddToBasket: 'btn_order',
    countryCode: '+7',
    smartBasketCurrency: '₽',
    productSize: 'size__item',
    smartBasketMinArea: 'cart',
    productPrice: 'product__price',
    productQuantityWrapper: 'product__quantity',
    smartBasketMinIconPath: '../img/cart.png',
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


  $("a[href='#product-dialog']").click(function () {
    price = +$(this).closest(".product__item").find(".btn_order").data("sb-product-price");
    $("#product-form-price").text(price);
    $("#product-img").attr("src", $(this).closest(".product__item").find("img").attr("src"));
    $("#product-name").text($(this).closest(".product__item").find(".product__title").text());
    $("#product-description").text($(this).closest(".product__item").find(".product__description").text())
    $(".btn_form_order").attr("data-sb-product-price", +price);
    $(".btn_form_order").attr("data-sb-product-quantity", +price);
    $(".btn_form_order").attr("data-sb-id-or-vendor-code", $(this).closest(".product__item").find(".btn_order").data("sb-id-or-vendor-code"))
    $(".btn_form_order").attr("data-sb-product-name", $(this).closest(".product__item").find(".product__title").text());
    $(".btn_form_order").attr("data-sb-product-img", $(this).closest(".product__item").find("img").attr("src"));
    $("#product-dialog .size__item").attr("data-sb-curent-price", +price);
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
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
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