/* =========================================================
   PORTFOLIO DATA
========================================================= */

const projects = [
    {
        id: "decodelabs",
        category: "DATA ANALYTICS INTERNSHIP",
        title: "DecodeLabs Data Analytics Internship",
        description:
            "Practical analytics work covering data preparation, SQL analysis and visualization across multiple internship tasks.",
        tags: ["SQL", "Excel", "Power BI", "Data Analysis"],
        link: null,
        images: [
            "assets/projects/decodelabs/DecodeLabs_main.png",
            "assets/projects/decodelabs/decodelabs.png",
            "assets/projects/decodelabs/decodelabs2.png",
            "assets/projects/decodelabs/decodelabs3.png"
        ]
    },

    {
        id: "datacamp",
        category: "DATA ANALYTICS",
        title: "DataCamp Associate Practical",
        description:
            "Practical data analysis work completed through the DataCamp Associate track, with a focus on analytical problem-solving and SQL.",
        tags: ["SQL", "Data Analysis"],
        link: "https://github.com/Only-Eni/Datacamp-Associate-practical",
        images: [
            "assets/projects/datacamp/DA%20Associate%20-%20Twitter.png",
            "assets/projects/datacamp/DA%20Associate%20-%20badge.png",
            "assets/projects/datacamp/image-1779691356360.jpg"
        ]
    },

    {
        id: "digitavista",
        category: "DATA VISUALIZATION",
        title: "DigitalVista",
        description:
            "Data visualization work focused on transforming analysis into clear dashboards and actionable insights.",
        tags: ["Data Visualization", "Dashboard", "Analytics"],
        link: null,
        images: [
            "assets/projects/digitavista/digiavista_main.png",
            "assets/projects/digitavista/digitavista2.png",
            "assets/projects/digitavista/digitavista3.png"
        ]
    },

    {
        id: "statistical-analysis",
        category: "HEALTH RESEARCH",
        title: "Statistical Analysis for Health Research",
        description:
            "A statistical analysis workflow developed for health research, with emphasis on appropriate test selection, analysis and interpretation.",
        tags: ["SPSS", "Statistics", "Research Analysis"],
        link: "https://github.com/Only-Eni/Statistical-Analysis-for-Health-Research-Showcase",
        images: [
            "assets/projects/statistical-analysis/Stat1.png",
            "assets/projects/statistical-analysis/Stat2.png",
            "assets/projects/statistical-analysis/Stat3.png"
        ]
    },

    {
        id: "creator-performance",
        category: "ONGOING PROJECT",
        title: "Creator Performance Analytics",
        description:
            "An ongoing analytics project exploring creator performance through data preparation, SQL analysis and dashboard development.",
        tags: ["SQL", "Power BI", "Analytics"],
        link: null,
        images: [
            "assets/projects/creator-performance/youtube_performance.png",
            "assets/projects/creator-performance/youtube_performance1.png",
            "assets/projects/creator-performance/youtube_performance2.png"
        ]
    }
];


/* =========================================================
   STATE
========================================================= */

let currentProjectIndex = 0;
let currentImageIndex = 0;

let autoplayTimer = null;
let isTransitioning = false;

const AUTOPLAY_DELAY = 4500;
const TRANSITION_TIME = 550;


/* =========================================================
   DOM ELEMENTS
========================================================= */

const projectCategory = document.getElementById("projectCategory");
const projectTitle = document.getElementById("projectTitle");
const projectDescription = document.getElementById("projectDescription");
const projectTags = document.getElementById("projectTags");
const showcaseLink = document.getElementById("showcaseLink");

const currentProjectNumber = document.getElementById("currentProjectNumber");
const totalProjects = document.getElementById("totalProjects");

const previousProjectButton = document.getElementById("previousProject");
const nextProjectButton = document.getElementById("nextProject");

const slides = Array.from(
    document.querySelectorAll(".showcase-slide")
);

const mobileMenuButton = document.querySelector(".mobile-menu-toggle");
const nav = document.querySelector(".site-nav");


/* =========================================================
   IMAGE PRELOADING
========================================================= */

const imageCache = new Map();

function preloadImage(src) {
    if (!src) return Promise.resolve();

    if (imageCache.has(src)) {
        return imageCache.get(src);
    }

    const promise = new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => resolve(img);
        img.onerror = reject;

        img.src = src;
    });

    imageCache.set(src, promise);

    return promise;
}


/* =========================================================
   IMAGE LOOKUP
========================================================= */

function getProjectSlides(projectId) {
    return slides.filter(
        slide => slide.dataset.project === projectId
    );
}


/* =========================================================
   PROJECT INFORMATION
========================================================= */

function renderProjectInformation() {
    const project = projects[currentProjectIndex];

    if (!project) return;

    projectCategory.textContent = project.category;
    projectTitle.textContent = project.title;
    projectDescription.textContent = project.description;

    projectTags.innerHTML = "";

    project.tags.forEach(tag => {
        const tagElement = document.createElement("span");

        tagElement.className = "project-tag";
        tagElement.textContent = tag;

        projectTags.appendChild(tagElement);
    });

    currentProjectNumber.textContent =
        String(currentProjectIndex + 1).padStart(2, "0");

    totalProjects.textContent =
        String(projects.length).padStart(2, "0");


    /* -------------------------
       Project link
    ------------------------- */

    if (project.link) {
        showcaseLink.href = project.link;
        showcaseLink.target = "_blank";
        showcaseLink.rel = "noopener noreferrer";
        showcaseLink.hidden = false;
    } else {
        showcaseLink.hidden = true;
    }
}


/* =========================================================
   PRELOAD NEXT IMAGE
========================================================= */

function preloadNextImages() {
    const project = projects[currentProjectIndex];

    if (!project) return;

    /* Next image in current project */
    const nextImageIndex =
        (currentImageIndex + 1) % project.images.length;

    preloadImage(project.images[nextImageIndex])
        .catch(() => {});


    /* First image of next project */
    const nextProjectIndex =
        (currentProjectIndex + 1) % projects.length;

    const nextProject = projects[nextProjectIndex];

    if (nextProject && nextProject.images.length) {
        preloadImage(nextProject.images[0])
            .catch(() => {});
    }
}


/* =========================================================
   SHOW IMAGE
========================================================= */

async function showImage(
    projectIndex,
    imageIndex,
    direction = "next"
) {
    const project = projects[projectIndex];

    if (!project) return;

    const projectSlides = getProjectSlides(project.id);

    if (!projectSlides.length) return;

    const targetIndex =
        Math.max(
            0,
            Math.min(imageIndex, project.images.length - 1)
        );

    const targetSlide = projectSlides[targetIndex];

    if (!targetSlide) return;

    const targetSrc = project.images[targetIndex];

    /*
       Make sure the image is available before
       beginning the visible transition.
    */

    try {
        await preloadImage(targetSrc);
    } catch (error) {
        console.warn(
            "Could not preload image:",
            targetSrc
        );
    }


    /* -------------------------
       Find current active slide
    ------------------------- */

    const activeSlide = document.querySelector(
        ".showcase-slide.active"
    );


    /* -------------------------
       Prevent duplicate transition
    ------------------------- */

    if (activeSlide === targetSlide) {
        return;
    }

    isTransitioning = true;


    /* -------------------------
       Prepare target
    ------------------------- */

    slides.forEach(slide => {
        slide.classList.remove(
            "active",
            "previous"
        );
    });

    targetSlide.classList.add("previous");

    /*
       Force the browser to register
       the starting state before activating.
    */

    void targetSlide.offsetWidth;


    /* -------------------------
       Activate target
    ------------------------- */

    requestAnimationFrame(() => {
        targetSlide.classList.remove("previous");
        targetSlide.classList.add("active");
    });


    /* -------------------------
       Update state
    ------------------------- */

    currentProjectIndex = projectIndex;
    currentImageIndex = targetIndex;

    renderProjectInformation();

    preloadNextImages();


    /* -------------------------
       Finish transition
    ------------------------- */

    setTimeout(() => {
        slides.forEach(slide => {
            if (slide !== targetSlide) {
                slide.classList.remove(
                    "active",
                    "previous"
                );
            }
        });

        isTransitioning = false;
    }, TRANSITION_TIME);
}


/* =========================================================
   INITIALISE SHOWCASE
========================================================= */

async function initialiseShowcase() {
    if (!projects.length) return;

    renderProjectInformation();

    /*
       Hide every slide initially.
    */

    slides.forEach(slide => {
        slide.classList.remove(
            "active",
            "previous"
        );
    });


    const firstProject = projects[0];
    const firstImage = firstProject.images[0];

    const firstSlide = getProjectSlides(
        firstProject.id
    )[0];


    if (!firstSlide) return;


    /*
       Load the first image BEFORE showing it.
       This prevents the initial blank state.
    */

    try {
        await preloadImage(firstImage);
    } catch (error) {
        console.warn(
            "Could not load first showcase image:",
            firstImage
        );
    }


    firstSlide.classList.add("active");

    currentProjectIndex = 0;
    currentImageIndex = 0;

    renderProjectInformation();

    preloadNextImages();

    startAutoplay();
}


/* =========================================================
   NEXT PROJECT
========================================================= */

async function nextProject() {
    if (isTransitioning) return;

    stopAutoplay();

    const nextProjectIndex =
        (currentProjectIndex + 1) % projects.length;

    currentImageIndex = 0;

    await showImage(
        nextProjectIndex,
        0,
        "next"
    );

    startAutoplay();
}


/* =========================================================
   PREVIOUS PROJECT
========================================================= */

async function previousProject() {
    if (isTransitioning) return;

    stopAutoplay();

    const previousProjectIndex =
        (
            currentProjectIndex -
            1 +
            projects.length
        ) % projects.length;

    currentImageIndex = 0;

    await showImage(
        previousProjectIndex,
        0,
        "previous"
    );

    startAutoplay();
}


/* =========================================================
   NEXT IMAGE
========================================================= */

async function nextImage() {
    if (isTransitioning) return;

    const project = projects[currentProjectIndex];

    if (!project) return;

    /*
       If there are more images in this project,
       move to the next image.
    */

    if (
        currentImageIndex <
        project.images.length - 1
    ) {
        await showImage(
            currentProjectIndex,
            currentImageIndex + 1,
            "next"
        );

        return;
    }


    /*
       Last image reached.
       Move to the first image of the next project.
    */

    const nextProjectIndex =
        (currentProjectIndex + 1) % projects.length;

    await showImage(
        nextProjectIndex,
        0,
        "next"
    );
}


/* =========================================================
   PREVIOUS IMAGE
========================================================= */

async function previousImage() {
    if (isTransitioning) return;

    const project = projects[currentProjectIndex];

    if (!project) return;


    /*
       If there is an earlier image,
       move backwards through the project.
    */

    if (currentImageIndex > 0) {
        await showImage(
            currentProjectIndex,
            currentImageIndex - 1,
            "previous"
        );

        return;
    }


    /*
       If we're on the first image,
       move to the final image of the previous project.
    */

    const previousProjectIndex =
        (
            currentProjectIndex -
            1 +
            projects.length
        ) % projects.length;

    const previousProject =
        projects[previousProjectIndex];

    await showImage(
        previousProjectIndex,
        previousProject.images.length - 1,
        "previous"
    );
}


/* =========================================================
   AUTOPLAY
========================================================= */

function startAutoplay() {
    stopAutoplay();

    autoplayTimer = setInterval(() => {
        nextImage();
    }, AUTOPLAY_DELAY);
}


function stopAutoplay() {
    if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
    }
}


/* =========================================================
   PAUSE ON HOVER
========================================================= */

const showcaseVisual =
    document.querySelector(".showcase-visual");

if (showcaseVisual) {
    showcaseVisual.addEventListener(
        "mouseenter",
        stopAutoplay
    );

    showcaseVisual.addEventListener(
        "mouseleave",
        startAutoplay
    );

    showcaseVisual.addEventListener(
        "focusin",
        stopAutoplay
    );

    showcaseVisual.addEventListener(
        "focusout",
        startAutoplay
    );
}


/* =========================================================
   PROJECT CONTROLS
========================================================= */

if (nextProjectButton) {
    nextProjectButton.addEventListener(
        "click",
        nextProject
    );
}

if (previousProjectButton) {
    previousProjectButton.addEventListener(
        "click",
        previousProject
    );
}


/* =========================================================
   KEYBOARD CONTROLS
========================================================= */


/* =========================================================
   KEYBOARD CONTROLS
========================================================= */

document.addEventListener("keydown", event => {

    /*
       Don't hijack keyboard controls while typing.
    */

    const activeElement =
        document.activeElement;

    if (
        activeElement &&
        (
            activeElement.tagName === "INPUT" ||
            activeElement.tagName === "TEXTAREA" ||
            activeElement.isContentEditable
        )
    ) {
        return;
    }


    if (event.key === "ArrowRight") {
        nextProject();
    }

    if (event.key === "ArrowLeft") {
        previousProject();
    }
});


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

if (mobileMenuButton && nav) {
    mobileMenuButton.addEventListener(
        "click",
        () => {
            nav.classList.toggle("open");
            mobileMenuButton.classList.toggle("open");
        }
    );


    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener(
            "click",
            () => {
                nav.classList.remove("open");
                mobileMenuButton.classList.remove("open");
            }
        );
    });
}


/* =========================================================
   PAUSE WHEN TAB IS NOT VISIBLE
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {
        if (document.hidden) {
            stopAutoplay();
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
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initialiseShowcase
);
