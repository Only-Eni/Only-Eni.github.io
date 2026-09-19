document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       PROJECT DATA
    ========================================================= */

    const projects = [
        {
            category: "DATA ANALYTICS INTERNSHIP",
            title: "DecodeLabs Data Analytics Internship",
            description:
                "Practical analytics work covering data preparation, SQL analysis and visualization across multiple internship tasks.",
            tags: ["SQL", "Excel", "Power BI", "Data Analysis"],
            images: [
                "assets/projects/decodelabs/DecodeLabs_main.png",
                "assets/projects/decodelabs/decodelabs.png",
                "assets/projects/decodelabs/decodelabs2.png",
                "assets/projects/decodelabs/decodelabs3.png"
            ],
            link: null
        },

        {
            category: "DATA ANALYTICS",
            title: "DataCamp Associate Practical",
            description:
                "A practical analytics project demonstrating data analysis, SQL and problem-solving skills through a structured assessment.",
            tags: ["SQL", "Data Analysis", "DataCamp"],
            images: [
                "assets/projects/datacamp/DA Associate - Twitter.png",
                "assets/projects/datacamp/DA Associate - badge.png",
                "assets/projects/datacamp/image-1779691356360.jpg"
            ],
            link: "https://github.com/Only-Eni/Datacamp-Associate-practical"
        },

        {
            category: "DATA ANALYTICS PROJECT",
            title: "DigitalVista",
            description:
                "A collaborative analytics project focused on transforming website traffic data into useful business insights and visualizations.",
            tags: ["Excel", "Data Cleaning", "Visualization", "Analytics"],
            images: [
                "assets/projects/digitavista/digiavista_main.png",
                "assets/projects/digitavista/digitavista2.png",
                "assets/projects/digitavista/digitavista3.png"
            ],
            link: null
        },

        {
            category: "HEALTHCARE RESEARCH",
            title: "Statistical Analysis for Health Research",
            description:
                "A statistical analysis project applying appropriate methods to health research data and interpreting analytical outputs.",
            tags: ["SPSS", "Statistics", "Health Research", "Data Analysis"],
            images: [
                "assets/projects/statistical-analysis/Stat1.png",
                "assets/projects/statistical-analysis/Stat2.png",
                "assets/projects/statistical-analysis/Stat3.png"
            ],
            link: "https://github.com/Only-Eni/Statistical-Analysis-for-Health-Research-Showcase"
        },

        {
            category: "SQL & POWER BI",
            title: "Creator Performance Analytics",
            description:
                "An analytics project examining YouTube creator performance using SQL for data preparation and analysis, followed by Power BI visualization.",
            tags: ["SQL", "Power BI", "Data Cleaning", "Analytics"],
            images: [
                "assets/projects/creator-performance/youtube_performance.png",
                "assets/projects/creator-performance/youtube_performance1.png",
                "assets/projects/creator-performance/youtube_performance2.png"
            ],
            link: null
        }
    ];


    /* =========================================================
       ELEMENTS
    ========================================================= */

    const showcaseImage = document.getElementById("showcaseImage");
    const projectCategory = document.getElementById("projectCategory");
    const projectTitle = document.getElementById("projectTitle");
    const projectDescription = document.getElementById("projectDescription");
    const projectTags = document.getElementById("projectTags");
    const showcaseLink = document.getElementById("showcaseLink");

    const previousProject =
        document.getElementById("previousProject");

    const nextProject =
        document.getElementById("nextProject");

    const currentProjectNumber =
        document.getElementById("currentProjectNumber");

    const totalProjects =
        document.getElementById("totalProjects");


    /* =========================================================
       STATE
    ========================================================= */

    let currentProject = 0;
    let currentImage = 0;
    let autoplayTimer = null;
    let transitionLock = false;


    /* =========================================================
       PROJECT COUNT
    ========================================================= */

    totalProjects.textContent =
        String(projects.length).padStart(2, "0");


    /* =========================================================
       IMAGE PRELOADING
    ========================================================= */

    function preloadImage(src) {
        const image = new Image();
        image.src = src;
        return image;
    }


    function preloadProjectImages(project) {
        project.images.forEach(src => {
            preloadImage(src);
        });
    }


    projects.forEach(project => {
        preloadProjectImages(project);
    });


    /* =========================================================
       UPDATE PROJECT INFORMATION
    ========================================================= */

    function updateProjectInformation() {

        const project = projects[currentProject];

        projectCategory.textContent =
            project.category;

        projectTitle.textContent =
            project.title;

        projectDescription.textContent =
            project.description;


        /* Tags */

        projectTags.innerHTML = "";

        project.tags.forEach(tag => {

            const tagElement =
                document.createElement("span");

            tagElement.className =
                "project-tag";

            tagElement.textContent =
                tag;

            projectTags.appendChild(tagElement);

        });


        /* Project link */

        if (project.link) {

            showcaseLink.href =
                project.link;

            showcaseLink.hidden =
                false;

        } else {

            showcaseLink.hidden =
                true;

            showcaseLink.removeAttribute("href");

        }


        /* Counter */

        currentProjectNumber.textContent =
            String(currentProject + 1).padStart(2, "0");

    }


    /* =========================================================
       SHOW IMAGE
    ========================================================= */

    function showImage(index, animate = true) {

        const project =
            projects[currentProject];

        const nextSrc =
            project.images[index];


        if (!nextSrc || !showcaseImage) {
            return;
        }


        if (!animate) {

            showcaseImage.src =
                nextSrc;

            showcaseImage.alt =
                `${project.title} project preview`;

            return;

        }


        if (transitionLock) {
            return;
        }

        transitionLock = true;


        /*
         * Fade and angle the current image away.
         */

        showcaseImage.style.transition =
            "opacity 0.35s ease, transform 0.45s ease";

        showcaseImage.style.opacity =
            "0";

        showcaseImage.style.transform =
            "perspective(1000px) rotateY(8deg) rotateZ(2deg) scale(0.96)";


        setTimeout(() => {

            showcaseImage.src =
                nextSrc;

            showcaseImage.alt =
                `${project.title} project preview`;

            showcaseImage.style.transform =
                "perspective(1000px) rotateY(-4deg) rotateZ(-1deg) scale(0.97)";


            requestAnimationFrame(() => {

                requestAnimationFrame(() => {

                    showcaseImage.style.opacity =
                        "1";

                    showcaseImage.style.transform =
                        "perspective(1000px) rotateY(0deg) rotateZ(0deg) scale(1)";

                });

            });


            setTimeout(() => {

                transitionLock = false;

            }, 450);

        }, 350);

    }


    /* =========================================================
       CHANGE IMAGE
    ========================================================= */

    function changeImage(direction) {

        const project =
            projects[currentProject];

        const imageCount =
            project.images.length;


        currentImage =
            (currentImage + direction + imageCount)
            % imageCount;


        preloadImage(
            project.images[currentImage]
        );


        showImage(currentImage);

    }


    /* =========================================================
       CHANGE PROJECT
    ========================================================= */

    function changeProject(direction) {

        if (transitionLock) {
            return;
        }


        currentProject =
            (currentProject + direction + projects.length)
            % projects.length;


        currentImage = 0;


        updateProjectInformation();


        const firstImage =
            projects[currentProject].images[0];


        preloadProjectImages(
            projects[currentProject]
        );


        showcaseImage.style.transition =
            "opacity 0.3s ease, transform 0.4s ease";

        showcaseImage.style.opacity =
            "0";

        showcaseImage.style.transform =
            "perspective(1000px) rotateY(8deg) rotateZ(2deg) scale(0.96)";


        transitionLock = true;


        setTimeout(() => {

            showcaseImage.src =
                firstImage;

            showcaseImage.alt =
                `${projects[currentProject].title} project preview`;

            showcaseImage.style.transform =
                "perspective(1000px) rotateY(-4deg) rotateZ(-1deg) scale(0.97)";


            requestAnimationFrame(() => {

                requestAnimationFrame(() => {

                    showcaseImage.style.opacity =
                        "1";

                    showcaseImage.style.transform =
                        "perspective(1000px) rotateY(0deg) rotateZ(0deg) scale(1)";

                });

            });


            setTimeout(() => {

                transitionLock = false;

            }, 450);

        }, 300);


        resetAutoplay();

    }


    /* =========================================================
       AUTOPLAY
    ========================================================= */

    function startAutoplay() {

        clearInterval(autoplayTimer);


        autoplayTimer = setInterval(() => {

            const project =
                projects[currentProject];


            /*
             * Move through the images of the
             * current project first.
             */

            if (currentImage < project.images.length - 1) {

                changeImage(1);

            } else {

                /*
                 * Once the final image is reached,
                 * move to the next project.
                 */

                changeProject(1);

            }

        }, 4500);

    }


    function resetAutoplay() {

        startAutoplay();

    }


    /* =========================================================
       BUTTON CONTROLS
    ========================================================= */

    nextProject.addEventListener("click", () => {

        changeProject(1);

    });


    previousProject.addEventListener("click", () => {

        changeProject(-1);

    });


    /* =========================================================
       KEYBOARD CONTROLS
    ========================================================= */

    document.addEventListener("keydown", event => {

        if (event.key === "ArrowRight") {

            changeProject(1);

        }

        if (event.key === "ArrowLeft") {

            changeProject(-1);

        }

    });


    /* =========================================================
       PAUSE WHILE HOVERING
    ========================================================= */

    const showcase =
        document.getElementById("projectShowcase");


    showcase.addEventListener("mouseenter", () => {

        clearInterval(autoplayTimer);

    });


    showcase.addEventListener("mouseleave", () => {

        startAutoplay();

    });


    /* =========================================================
       PAUSE WHEN TAB IS NOT VISIBLE
    ========================================================= */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (document.hidden) {

                clearInterval(autoplayTimer);

            } else {

                startAutoplay();

            }

        }
    );


    /* =========================================================
       FOOTER YEAR
    ========================================================= */

    const yearElement =
        document.getElementById("currentYear");


    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =========================================================
       INITIALISE
    ========================================================= */

    updateProjectInformation();


    /*
     * The first image is already present in the HTML,
     * so show it immediately instead of waiting
     * for JavaScript to swap it.
     */

    showcaseImage.style.opacity = "1";

    showcaseImage.style.transform =
        "perspective(1000px) rotateY(0deg) rotateZ(0deg) scale(1)";


    /*
     * Preload the first project's images.
     */

    preloadProjectImages(
        projects[0]
    );


    startAutoplay();

});
