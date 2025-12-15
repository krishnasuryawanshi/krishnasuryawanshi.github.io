// Add 'scrolled' class to top nav on scroll
$(function () {
  var $nav = $('.fixed-top');
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 0) {
      $nav.addClass('scrolled');
    } else {
      $nav.removeClass('scrolled');
    }
  });
});
// Update Add to Cart link based on radio selections
$(function () {
  function updateAddToCartLink() {
    var fragrance = $('input[name="fragrance"]:checked').val();
    var purchase = $('input[name="purchase-type"]:checked').val();
    // Fallback if not found
    if (!fragrance) fragrance = 'none';
    if (!purchase) purchase = 'none';
    // Compose dummy link (customize as needed)
    var link = `#addtocart?fragrance=${fragrance}&purchase=${purchase}`;
    $('.addtocart-btn a.btn').attr('href', link);
  }
  // Listen for changes on both radio groups
  $(document).on('change', 'input[name="fragrance"], input[name="purchase-type"]', updateAddToCartLink);
  // Run on page load
  updateAddToCartLink();
});
// Count-up animation for numbers-wrapper section
$(function () {
  function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    return (
      rect.top < (window.innerHeight - 60) && rect.bottom > 0
    );
  }
  var animated = false;
  function animateNumbers() {
    if (animated) return;
    var $section = $('.numbers-wrapper');
    if ($section.length && isInViewport($section[0])) {
      animated = true;
      $section.find('span').each(function () {
        var $this = $(this);
        var target = parseInt($this.text(), 10);
        $this.text('0%');
        $({ countNum: 0 }).animate({ countNum: target }, {
          duration: 1200,
          easing: 'swing',
          step: function () {
            $this.text(Math.floor(this.countNum) + '%');
          },
          complete: function () {
            $this.text(target + '%');
          }
        });
      });
    }
  }
  $(window).on('scroll load', animateNumbers);
});
// Simple accordion for .simple-accordion
$(function () {
  var $accBtns = $('.simple-accordion .accordion-btn');
  var $accContents = $('.simple-accordion .accordion-content');
  $accContents.not('.active').hide();
  $accBtns.on('click', function () {
    var tab = $(this).data('acc');
    if ($(this).hasClass('active')) return;
    var $parent = $(this).closest('.simple-accordion');
    var $parentBtns = $parent.find('.accordion-btn');
    var $parentContents = $parent.find('.accordion-content');
    $parentBtns.removeClass('active');
    $(this).addClass('active');
    $parentContents.filter('.active').slideUp(250, function() {
      $(this).removeClass('active');
      var $newContent = $parentContents.filter('#' + tab);
      $newContent.slideDown(250, function() {
        $newContent.addClass('active');
      });
    });
  });
});
// Accordion for subscription section
$(function () {
  var $accBtns = $('.subscription-accordion .accordion-btn');
  var $accContents = $('.subscription-accordion .accordion-content');
  $accContents.not('.active').hide();
  $accBtns.on('click', function () {
    var tab = $(this).data('acc');
    if ($(this).hasClass('active')) return;
    $accBtns.removeClass('active');
    $(this).addClass('active');
    $accContents.filter('.active').slideUp(250, function() {
      $(this).removeClass('active');
      var $newContent = $('#' + tab);
      $newContent.slideDown(250, function() {
        $newContent.addClass('active');
      });
    });
  });
});
// Subscription tabs switching with slide effect
$(function () {
  var $tabBtns = $('.subscription-tabs .tab-btn');
  var $tabContents = $('.tab-content');
  $tabContents.not('.active').hide();
  $tabBtns.on('click', function () {
    var tab = $(this).data('tab');
    if ($(this).hasClass('active')) return;
    $tabBtns.removeClass('active');
    $(this).addClass('active');
    $tabContents.filter('.active').slideUp(250, function() {
      $(this).removeClass('active');
      var $newContent = $('#' + tab);
      $newContent.slideDown(250, function() {
        $newContent.addClass('active');
      });
    });
  });
});
// Custom thumbnail grid click handler for Swiper
$(function () {
  if (typeof Swiper !== 'undefined' && $('.custom-thumbs-grid').length) {
    // Only main swiper, no thumbs swiper
    const mainSwiper = new Swiper('.main-swiper', {
      spaceBetween: 10,
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
    $('.custom-thumbs-grid .thumb').on('click', function () {
      var idx = parseInt($(this).attr('data-index'), 10);
      mainSwiper.slideToLoop(idx, 500, false);
      $('.custom-thumbs-grid .thumb').removeClass('active');
      $(this).addClass('active');
    });
    // Optionally, set first thumb as active
    $('.custom-thumbs-grid .thumb').first().addClass('active');
    // Update active thumb on slide change
    mainSwiper.on('slideChange', function () {
      var realIdx = mainSwiper.realIndex;
      $('.custom-thumbs-grid .thumb').removeClass('active');
      $('.custom-thumbs-grid .thumb[data-index="' + realIdx + '"]').addClass('active');
    });
  }
});
// Swiper JS initialization
$(function () {

  if (typeof Swiper !== 'undefined') {
    const thumbsSwiper = new Swiper('.thumbs-swiper', {
      spaceBetween: 10,
      slidesPerView: 8,
      freeMode: true,
      watchSlidesProgress: true,
      breakpoints: {
        0: { slidesPerView: 3 },
        600: { slidesPerView: 4 },
        900: { slidesPerView: 6 },
        1200: { slidesPerView: 8 }
      }
    });

    const mainSwiper = new Swiper('.main-swiper', {
      spaceBetween: 10,
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      thumbs: {
        swiper: thumbsSwiper,
      },
    });
  }
});
// hamburger menu script
$(function () {
  $(".navbar-toggler").on("click", function () {
    var $navbar = $(".main-navbar");
    if (!$navbar.hasClass("navbar-open")) {
      $navbar.addClass("navbar-open");
    } else {
      setTimeout(function () {
        $navbar.removeClass("navbar-open");
      }, 250);
    }
  });
});
// script for sliding input box
$(function () {
  $(".toggleButton").click(function (e) {
    e.preventDefault();
    var $container = $(".slidingInputContainer");
    if (window.innerWidth < 991) {
      if ($container.height() === 0) {
        $container.animate({ height: "40px" }, 500);
      } else {
        $container.animate({ height: "0px" }, 500);
      }
    } else {
      $container.animate(
        {
          width: $container.width() === 0 ? 180 : 0,
        },
        500
      );
    }
  });
});

