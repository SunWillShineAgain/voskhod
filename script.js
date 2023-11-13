document.addEventListener('DOMContentLoaded', () => {
    // ------------SLIDES--------------

    const swiperWrapper = document.querySelector('.swiper-wrapper')
    const swiper = document.querySelector('.swiper')

    for (let i = 1; i < 7; i++) {
        let str = `
            <div class="swiper-slide">
                <div class="project-summary">
                    <div class="project-icon"><img src="/icons/${i}.png"></div>
                    <div class="project-name">Проект номер ${i}</div>
                    <a target="_blank" href="https://google.com" class="project-link">
                        <p>О проекте</p>
                        <svg viewBox="0 0 14 15" >
                            <path d="M0 1.5H13V14.5" stroke-width="2" stroke-linejoin="bevel"></path>
                            <path d="M0 14.5L13 1.5" stroke-width="2" stroke-linejoin="bevel"></path>
                        </svg>
                    </a>
                </div>
                <img src="/images/${i}.jpg" alt="Проект №${i}"/>
                <div class="shade"></div>
            </div>
        `
        swiperWrapper.insertAdjacentHTML('beforeend', str)
    }

    new Swiper(swiper, {
        direction: 'horizontal',
        loop: true,
        navigation: {
            nextEl: '.button-next',
            prevEl: '.button-prev',
        },
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        speed: 1000,
        effect: 'creative',
        creativeEffect: {
            prev: {
                translate: ['-100%', 0, 0],
                scale: [1.1]
            },
            next: {
                translate: ['100%', 0, 0],
                scale: [1.1]
            },
        },
    });

    // ------------MENU and Lottie--------------

    const hamburger = document.querySelector('.header-hamburger')
    const body = document.querySelector('body')
    const menuWrap = document.querySelector('.main-menu-wrap')
    let background = document.createElement('DIV')
    background.classList.add('background')
    let container = document.querySelector('.container')

    let animation = bodymovin.loadAnimation({
        container: hamburger,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: 'burger.json'
    })

    chechBackgroundHeight()

    hamburger.addEventListener('click', () => {
        container.insertAdjacentElement('afterbegin', background)

        hamburger.classList.contains('active')
            ? animation.playSegments([16, 35], true)
            : animation.playSegments([30, 60], true);

        hamburger.classList.toggle('active')
        body.classList.add('active')
        background.classList.add('active')
        checkIsMenuActive()
        window.addEventListener('click', checkClick)
    })

    function chechBackgroundHeight() {
        background.style.height = body.clientHeight + 'px'
    }
    window.addEventListener('resize', chechBackgroundHeight)

    function checkClick(e) {
        if (e.target.classList.contains('background')) {
            menuWrap.style.display = 'none'
            body.classList.remove('active')
            hamburger.classList.remove('active')
            background.classList.remove('active')
            animation.playSegments([30, 60], true);
            background.remove()
        }
    }

    function checkIsMenuActive() {
        if (hamburger.classList.contains('active')) {
            menuWrap.style.display = 'block'
            animation.playSegments([16, 35], true);
        } else {
            menuWrap.style.display = 'none'
            body.classList.remove('active')
            animation.playSegments([30, 60], true);
            background.remove()
        }
    }

    // -----------IntersectionObserver-----------

    const root = document.querySelector('header')
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                root.dataset.color = `${entry.target.dataset.sectionColor}`
            }
        })
    }, {
        rootMargin: '-85% 0px 3% 0px',
        threshold: 0.1
    })

    document.querySelectorAll('section').forEach(i => observer.observe(i))
})