    $(document).ready(function () {
            let isToggling = false;

            function toggleMenu() {
                if (isToggling) return;
                isToggling = true;

                const $nav = $('nav ul');
                const $menu = $('.mobile-menu');
                const $overlay = $('.mobile-menu-overlay');
                const isActive = $nav.hasClass('active');

                if (!isActive) {
                    $nav.addClass('active');
                    $menu.addClass('active');
                    $overlay.addClass('active');
                    $('.mobile-menu .fa-bars').hide();
                    $('.mobile-menu .fa-times').show();
                    $menu.attr('aria-expanded', 'true');
                } else {
                    $nav.removeClass('active');
                    $menu.removeClass('active');
                    $overlay.removeClass('active');
                    $('.mobile-menu .fa-bars').show();
                    $('.mobile-menu .fa-times').hide();
                    $menu.attr('aria-expanded', 'false');
                }

                setTimeout(() => { isToggling = false; }, 400);
            }

            $('.mobile-menu').click(toggleMenu);

            $('.mobile-menu-overlay').click(toggleMenu);

            $('nav ul li a').click(function () {
                if ($(window).width() <= 768) {
                    toggleMenu();
                }
            });

            $('.features-carousel').slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 3000,
                arrows: true,
                dots: true,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            arrows: false,
                            dots: true
                        }
                    }
                ]
            });

            $('.financial-gallery-carousel').slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 3000,
                arrows: true,
                dots: true,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            arrows: false,
                            dots: true
                        }
                    }
                ]
            });

            $('.modules-carousel').slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 3000,
                arrows: true,
                dots: true,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            arrows: false,
                            dots: true
                        }
                    }
                ]
            });

            function checkScroll() {
                $('.animate-on-scroll').each(function () {
                    var elementTop = $(this).offset().top;
                    var windowBottom = $(window).scrollTop() + $(window).height();
                    if (windowBottom > elementTop + 100) {
                        $(this).addClass('animate__animated animate__fadeInUp');
                    }
                });
            }

            $(window).on('scroll', checkScroll);
            checkScroll();

            $('.faq-question').click(function () {
                $(this).next('.faq-answer').slideToggle();
                $(this).toggleClass('active');
            });

            $('a[href*="#"]').click(function (event) {
                if (this.hash !== "") {
                    event.preventDefault();
                    var hash = this.hash;
                    $('html, body').animate({
                        scrollTop: $(hash).offset().top
                    }, 800);
                }
            });
        });