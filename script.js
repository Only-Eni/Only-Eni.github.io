document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       PROJECT DATA
    ========================================== */

    const projects = {

        decodelabs: [
            "assets/projects/decodelabs/DecodeLabs_main.png",
            "assets/projects/decodelabs/decodelabs.png",
            "assets/projects/decodelabs/decodelabs2.png",
            "assets/projects/decodelabs/decodelabs3.png"
        ],

        datacamp: [
            "assets/projects/datacamp/DA Associate - Twitter.png",
            "assets/projects/datacamp/DA Associate - badge.png",
            "assets/projects/datacamp/image-1779691356360.jpg"
        ],

        digitavista: [
            "assets/projects/digitavista/digiavista_main.png",
            "assets/projects/digitavista/digitavista2.png",
            "assets/projects/digitavista/digitavista3.png"
        ],

        statistical: [
            "assets/projects/statistical-analysis/Stat1.png",
            "assets/projects/statistical-analysis/Stat2.png",
            "assets/projects/statistical-analysis/Stat3.png"
        ],

        creator: [
            "assets/projects/creator-performance/youtube_performance.png",
            "assets/projects/creator-performance/youtube_performance1.png",
            "assets/projects/creator-performance/youtube_performance2.png"
        ]

    };


    /* =========================================
       IMAGE CACHE
    ========================================== */

    const imageCache = new Map();


    function preloadImage(src) {

        if (imageCache.has(src)) {
            return imageCache.get(src);
        }

        const promise = new Promise(
            (resolve, reject) => {

                const image = new Image();

                image.onload = () => {
                    resolve(image);
                };

                image.onerror = () => {
                    console.error(
                        "Portfolio image could not load:",
                        src
                    );

                    reject(
                        new Error(
                            `Image failed to load: ${src}`
                        )
                    );
                };

                image.src = src;

            }
        );

        imageCache.set(src, promise);

        return promise;
    }


    /* =========================================
       PROJECT IMAGE SLIDESHOWS
    ========================================== */

    document
        .querySelectorAll(".project-image-frame")
        .forEach(frame => {

            const projectName =
                frame.dataset.project;

            const images =
                projects[projectName];

            if (
                !images ||
                !images.length
            ) {
                return;
            }


            const image =
                frame.querySelector(
                    ".project-image"
                );

            const currentCounter =
                frame.querySelector(
                    ".image-current"
                );

            const totalCounter =
                frame.querySelector(
                    ".image-total"
                );

            const visual =
                frame.closest(
                    ".project-visual"
                );

            const previousButton =
                visual.querySelector(
                    ".image-prev"
                );

            const nextButton =
                visual.querySelector(
                    ".image-next"
                );


            if (
                !image ||
                !currentCounter ||
                !totalCounter ||
                !previousButton ||
                !nextButton
            ) {
                return;
            }


            let currentIndex = 0;

            let transitioning = false;

            let autoplay = null;


            totalCounter.textContent =
                String(
                    images.length
                ).padStart(2, "0");


            /* -----------------------------------------
               PRELOAD
            ------------------------------------------ */

            function preloadNearby() {

                const nextIndex =
                    (
                        currentIndex + 1
                    ) % images.length;

                const previousIndex =
                    (
                        currentIndex -
                        1 +
                        images.length
                    ) % images.length;


                preloadImage(
                    images[nextIndex]
                ).catch(() => {});


                preloadImage(
                    images[previousIndex]
                ).catch(() => {});
            }


            /* -----------------------------------------
               UPDATE COUNTER
            ------------------------------------------ */

            function updateCounter() {

                currentCounter.textContent =
                    String(
                        currentIndex + 1
                    ).padStart(2, "0");

            }


            /* -----------------------------------------
               SHOW IMAGE
            ------------------------------------------ */

            async function showImage(
                newIndex,
                direction
            ) {

                if (
                    transitioning ||
                    newIndex === currentIndex
                ) {
                    return;
                }


                const nextSrc =
                    images[newIndex];


                transitioning = true;


                /* Load before hiding current image */

                try {

                    await preloadImage(
                        nextSrc
                    );

                } catch {

                    transitioning = false;

                    return;
                }


                /* Outgoing */

                image.classList.remove(
                    "is-visible",
                    "is-entering"
                );

                image.classList.add(
                    "is-leaving"
                );


                setTimeout(() => {

                    currentIndex =
                        newIndex;

                    image.src =
                        nextSrc;

                    image.alt =
                        `Project preview ${currentIndex + 1}`;


                    updateCounter();


                    image.classList.remove(
                        "is-leaving"
                    );

                    image.classList.add(
                        "is-entering"
                    );


                    requestAnimationFrame(() => {

                        requestAnimationFrame(() => {

                            image.classList.remove(
                                "is-entering"
                            );

                            image.classList.add(
                                "is-visible"
                            );

                        });

                    });


                    setTimeout(() => {

                        transitioning =
                            false;

                        preloadNearby();

                    }, 550);

                }, 300);

            }


            /* -----------------------------------------
               NEXT
            ------------------------------------------ */

            function nextImage() {

                if (transitioning) {
                    return;
                }

                const nextIndex =
                    (
                        currentIndex + 1
                    ) % images.length;

                showImage(
                    nextIndex,
                    1
                );
            }


            /* -----------------------------------------
               PREVIOUS
            ------------------------------------------ */

            function previousImage() {

                if (transitioning) {
                    return;
                }

                const previousIndex =
                    (
                        currentIndex -
                        1 +
                        images.length
                    ) % images.length;

                showImage(
                    previousIndex,
                    -1
                );
            }


            /* -----------------------------------------
               BUTTONS
            ------------------------------------------ */

            nextButton.addEventListener(
                "click",
                () => {

                    nextImage();

                    restartAutoplay();

                }
            );


            previousButton.addEventListener(
                "click",
                () => {

                    previousImage();

                    restartAutoplay();

                }
            );


            /* -----------------------------------------
               AUTOPLAY
            ------------------------------------------ */

            function startAutoplay() {

                clearInterval(
                    autoplay
                );

                autoplay =
                    setInterval(
                        nextImage,
                        5000
                    );
            }


            function stopAutoplay() {

                clearInterval(
                    autoplay
                );

                autoplay = null;
            }


            function restartAutoplay() {

                stopAutoplay();

                startAutoplay();

            }


            /* -----------------------------------------
               PAUSE ON HOVER
            ------------------------------------------ */

            frame.addEventListener(
                "mouseenter",
                stopAutoplay
            );


            frame.addEventListener(
                "mouseleave",
                startAutoplay
            );


            /* -----------------------------------------
               INITIALISE
            ------------------------------------------ */

            image.classList.add(
                "is-visible"
            );

            updateCounter();

            preloadImage(
                images[0]
            ).catch(() => {});

            preloadNearby();

            startAutoplay();

        });


    /* =========================================
       MOBILE NAVIGATION
    ========================================== */

    const mobileToggle =
        document.getElementById(
            "mobileMenuToggle"
        );

    const navLinks =
        document.getElementById(
            "navLinks"
        );


    if (
        mobileToggle &&
        navLinks
    ) {

        mobileToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    navLinks.classList.toggle(
                        "open"
                    );

                mobileToggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

            }
        );


        navLinks
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        navLinks.classList.remove(
                            "open"
                        );

                        mobileToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }
                );

            });

    }


    /* =========================================
       BACKGROUND PERSONAL PHOTO
    ========================================== */

    const background =
        document.getElementById(
            "backgroundSlideshow"
        );


    /*
       At the moment there is one confirmed
       personal photo in the repository.

       When you upload more personal photos,
       simply add their paths here.

       Example:

       "assets/background/photo2.jpg"
       "assets/background/photo3.jpg"
    */

    const backgroundImages = [
        "assets/oluwapelumi-atanda.jpg"
    ];


    if (
        background &&
        backgroundImages.length
    ) {

        let backgroundIndex = 0;


        function showBackgroundImage() {

            const src =
                backgroundImages[
                    backgroundIndex
                ];


            background.style.backgroundImage =
                `url("${src}")`;


            background.style.transform =
                "scale(1.04)";


            setTimeout(() => {

                background.style.transform =
                    "scale(1.08)";

            }, 100);

        }


        showBackgroundImage();


        if (
            backgroundImages.length > 1
        ) {

            setInterval(() => {

                backgroundIndex =
                    (
                        backgroundIndex + 1
                    ) %
                    backgroundImages.length;


                showBackgroundImage();

            }, 7000);

        }

    }


    /* =========================================
       FOOTER YEAR
    ========================================== */

    const year =
        document.getElementById(
            "currentYear"
        );


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

});
