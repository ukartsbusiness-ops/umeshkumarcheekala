/*!

 =========================================================
 * Now-ui-kit - v1.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/now-ui-kit
 * Copyright 2017 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/now-ui-kit/blob/master/LICENSE.md)

 * Designed by www.invisionapp.com Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */

var transparent = true;

var transparentDemo = true;
var fixedTop = false;

var navbar_initialized,
    backgroundOrange = false,
    toggle_initialized = false;

$(document).ready(function() {
    //  Activate the Tooltips
    $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();

    // Activate Popovers and set color for popovers
    $('[data-toggle="popover"]').each(function() {
        color_class = $(this).data('color');
        $(this).popover({
            template: '<div class="popover popover-' + color_class + '" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        });
    });

    // Activate the image for the navbar-collapse
    nowuiKit.initNavbarImage();

    $navbar = $('.navbar[color-on-scroll]');
    scroll_distance = $navbar.attr('color-on-scroll') || 500;

    // Check if we have the class "navbar-color-on-scroll" then add the function to remove the class "navbar-transparent" so it will transform to a plain color.

    if ($('.navbar[color-on-scroll]').length != 0) {
        nowuiKit.checkScrollForTransparentNavbar();
        $(window).on('scroll', nowuiKit.checkScrollForTransparentNavbar)
    }

    $('.form-control').on("focus", function() {
        $(this).parent('.input-group').addClass("input-group-focus");
    }).on("blur", function() {
        $(this).parent(".input-group").removeClass("input-group-focus");
    });

    // Activate bootstrapSwitch
    $('.bootstrap-switch').each(function() {
        $this = $(this);
        data_on_label = $this.data('on-label') || '';
        data_off_label = $this.data('off-label') || '';

        $this.bootstrapSwitch({
            onText: data_on_label,
            offText: data_off_label
        });
    });

    
document.addEventListener("DOMContentLoaded", function () {
  const progressBars = document.querySelectorAll(".progress-fill");

  const observer = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const bar = entry.target;

          // Read the percentage from the existing inline width
          const percentage = bar.style.width || "0%";

          // Set the target width for the animation
          bar.style.setProperty("--progress-width", percentage);

          // Start from zero, then animate to the target
          requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              bar.classList.add("animate");
            });
          });

          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.2 }
  );

  progressBars.forEach(function (bar) {
    observer.observe(bar);
  });
});


    if ($(window).width() >= 992) {
        big_image = $('.page-header-image[data-parallax="true"]');

        $(window).on('scroll', nowuiKitDemo.checkScrollForParallax);
    }

    // Activate Carousel
    $('.carousel').carousel({
        interval: 4000
    });

    $('.date-picker').each(function() {
        $(this).datepicker({
            templates: {
                leftArrow: '<i class="now-ui-icons arrows-1_minimal-left"></i>',
                rightArrow: '<i class="now-ui-icons arrows-1_minimal-right"></i>'
            }
        }).on('show', function() {
            $('.datepicker').addClass('open');

            datepicker_color = $(this).data('datepicker-color');
            if (datepicker_color.length != 0) {
                $('.datepicker').addClass('datepicker-' + datepicker_color + '');
            }
        }).on('hide', function() {
            $('.datepicker').removeClass('open');
        });
    });


});

$(window).on('resize', function() {
    nowuiKit.initNavbarImage();
});

$(document).on('click', '.navbar-toggler', function() {
    $toggle = $(this);

    if (nowuiKit.misc.navbar_menu_visible == 1) {
        $('html').removeClass('nav-open');
        nowuiKit.misc.navbar_menu_visible = 0;
        $('#bodyClick').remove();
        setTimeout(function() {
            $toggle.removeClass('toggled');
        }, 550);
    } else {
        setTimeout(function() {
            $toggle.addClass('toggled');
        }, 580);
        div = '<div id="bodyClick"></div>';
        $(div).appendTo('body').click(function() {
            $('html').removeClass('nav-open');
            nowuiKit.misc.navbar_menu_visible = 0;
            setTimeout(function() {
                $toggle.removeClass('toggled');
                $('#bodyClick').remove();
            }, 550);
        });

        $('html').addClass('nav-open');
        nowuiKit.misc.navbar_menu_visible = 1;
    }
});


document.addEventListener("DOMContentLoaded", function () {
  const bars = document.querySelectorAll(
    ".progress-container .progress-bar[data-progress]"
  );

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const value = Math.min(
          100,
          Math.max(0, Number(bar.dataset.progress) || 0)
        );

        bar.style.setProperty("--target-width", value + "%");

        requestAnimationFrame(function () {
          bar.classList.add("is-animated");
        });

        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.2 });

  bars.forEach(function (bar) {
    observer.observe(bar);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const projects = document.querySelector("#Projects");

  if (!projects) return;

  const cards = projects.querySelectorAll(".project-card");

  if (!("IntersectionObserver" in window)) {
    cards.forEach(card => card.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const card = entry.target;
      card.classList.add("is-visible");
      observer.unobserve(card);
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -35px 0px"
  });

  projects.querySelectorAll(".project-card").forEach((card, index) => {
    card.classList.remove("is-visible");
    card.classList.add("reveal-ready");

    // Small stagger; prevents every card moving at once
    card.style.transitionDelay = `${(index % 2) * 100}ms`;

    observer.observe(card);
  });

  // Ensure cards in newly selected tabs become visible
  projects.querySelectorAll('[data-toggle="tab"]').forEach(tab => {
    tab.addEventListener("shown.bs.tab", function () {
      const target = this.getAttribute("href");
      const pane = target && projects.querySelector(target);

      if (!pane) return;

      pane.querySelectorAll(".project-card").forEach(card => {
        card.classList.add("is-visible");
      });
    });
  });
});

nowuiKit = {
    misc: {
        navbar_menu_visible: 0
    },

    checkScrollForTransparentNavbar: debounce(function() {
        if ($(document).scrollTop() > scroll_distance) {
            if (transparent) {
                transparent = false;
                $('.navbar[color-on-scroll]').removeClass('navbar-transparent');
            }
        } else {
            if (!transparent) {
                transparent = true;
                $('.navbar[color-on-scroll]').addClass('navbar-transparent');
            }
        }
    }, 17),

    initNavbarImage: function() {
        var $navbar = $('.navbar').find('.navbar-translate').siblings('.navbar-collapse');
        var background_image = $navbar.data('nav-image');

        if ($(window).width() < 991 || $('body').hasClass('burger-menu')) {
            if (background_image != undefined) {
                $navbar.css('background', "url('" + background_image + "')")
                    .removeAttr('data-nav-image')
                    .css('background-size', "cover")
                    .addClass('has-image');
            }
        } else if (background_image != undefined) {
            $navbar.css('background', "")
                .attr('data-nav-image', '' + background_image + '')
                .css('background-size', "")
                .removeClass('has-image');
        }
    },

    initSliders: function() {
        // Sliders for demo purpose in refine cards section
        var slider = document.getElementById('sliderRegular');

        noUiSlider.create(slider, {
            start: 40,
            connect: [true, false],
            range: {
                min: 0,
                max: 100
            }
        });

        var slider2 = document.getElementById('sliderDouble');

        noUiSlider.create(slider2, {
            start: [20, 60],
            connect: true,
            range: {
                min: 0,
                max: 100
            }
        });
    }
}


var big_image;

// Javascript just for Demo purpose, remove it from your project
nowuiKitDemo = {
    checkScrollForParallax: debounce(function() {
        var current_scroll = $(this).scrollTop();

        oVal = ($(window).scrollTop() / 3);
        big_image.css({
            'transform': 'translate3d(0,' + oVal + 'px,0)',
            '-webkit-transform': 'translate3d(0,' + oVal + 'px,0)',
            '-ms-transform': 'translate3d(0,' + oVal + 'px,0)',
            '-o-transform': 'translate3d(0,' + oVal + 'px,0)'
        });

    }, 6)

}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

document.addEventListener("DOMContentLoaded", function () {
  const section = document.getElementById("Projects");

  if (!section) return;

  const tabs = Array.from(
    section.querySelectorAll("[data-project-tab]")
  );

  const panels = Array.from(
    section.querySelectorAll(".project-panel")
  );

  function activateTab(tab, moveFocus = false) {
    const targetId = tab.dataset.projectTab;
    const targetPanel = section.querySelector(
      "#" + CSS.escape(targetId)
    );

    if (!targetPanel) return;

    tabs.forEach(function (item) {
      const active = item === tab;

      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", String(active));
      item.tabIndex = active ? 0 : -1;
    });

    panels.forEach(function (panel) {
      panel.hidden = panel === targetPanel ? false : true;
    });

    if (moveFocus) tab.focus();
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      activateTab(tab);
    });

    tab.addEventListener("keydown", function (event) {
      let nextIndex = index;

      if (event.key === "ArrowRight") {
        nextIndex = (index + 1) % tabs.length;
      } else if (event.key === "ArrowLeft") {
        nextIndex = (index - 1 + tabs.length) % tabs.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = tabs.length - 1;
      } else {
        return;
      }

      event.preventDefault();
      activateTab(tabs[nextIndex], true);
    });
  });

  const initialTab = tabs.find(function (tab) {
    return tab.dataset.projectTab === "uiux-design";
  });

  if (initialTab) {
    activateTab(initialTab);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll("[data-project-tab]");
  const panels = document.querySelectorAll(
    "#Projects .project-panel"
  );

  function activateTab(tab) {
    const targetId = tab.dataset.projectTab;

    tabs.forEach((item) => {
      const isActive = item === tab;

      item.classList.toggle("active", isActive);
      item.setAttribute("aria-selected", String(isActive));
      item.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach((panel) => {
      const isActive = panel.id === targetId;

      panel.hidden = !isActive;
      panel.style.display = isActive ? "block" : "none";
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => activateTab(tab));
  });

  const initialTab =
    document.querySelector("[data-project-tab].active") || tabs[0];

  if (initialTab) {
    activateTab(initialTab);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#Projects");
  if (!section) return;

  const tabs = section.querySelectorAll(".project-tab");
  const panels = section.querySelectorAll(".project-panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.getAttribute("data-project-tab");

      tabs.forEach((item) => {
        const active = item === tab;
        item.classList.toggle("active", active);
        item.setAttribute("aria-selected", String(active));
      });

      panels.forEach((panel) => {
        panel.hidden = panel.id !== targetId;
      });
    });
  });

  // Show only the initially active category
  const activeTab =
    section.querySelector(".project-tab.active") || tabs[0];

  if (activeTab) activeTab.click();
});



function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
};