/* =========================================================
   CINEMATIC PROJECT SHOWCASE
========================================================= */

const showcaseProjects = [
    {
        number: "01",
        category: "INTRODUCTION",
        label: "DATA ANALYST • PHYSIOTHERAPY STUDENT",
        title: "Oluwapelumi Atanda",
        description:
            "Exploring the intersection of data, research, visualization and healthcare."
    },

    {
        number: "02",
        category: "SQL ANALYSIS",
        label: "SQL • DATA ANALYSIS",
        title: "DataCamp Associate Practical",
        description:
            "Grocery store sales analysis using SQL to examine sales performance, product activity and customer purchasing patterns.",
        link: "project.html?id=datacamp"
    },

    {
        number: "03",
        category: "DATA EXPLORATION",
        label: "SQL • EDA",
        title: "SQL Data Analysis",
        description:
            "SQL-based exploratory analysis focused on examining dataset structure, uncovering useful metrics and identifying patterns for deeper investigation.",
        link: "project.html?id=sql-data-analysis"
    },

    {
        number: "04",
        category: "VISUALIZATION",
        label: "DATA VISUALIZATION • ANALYTICS",
        title: "Data Visualization Project",
        description:
            "Transforming analytical results into clear visual narratives designed to make patterns, comparisons and insights easier to understand.",
        link: "project.html?id=data-visualization"
    },

    {
        number: "05",
        category: "CURRENTLY BUILDING",
        label: "SQL • POWER BI • EXCEL",
        title: "Creator Performance Analytics",
        description:
            "An end-to-end analytics project exploring creator performance, audience reach, content categories and geographic trends.",
        link: "project.html?id=creator-performance"
    }
];


/* =========================================================
   SHOWCASE ELEMENTS
========================================================= */

const showcase = document.querySelector(".project-showcase");

const slides = document.querySelectorAll(".showcase-slide");

const previousButton =
    document.querySelector(".showcase-prev");

const nextButton =
    document.querySelector(".showcase-next");

const currentNumber =
    document.querySelector(".progress-current");

const totalNumber =
    document.querySelector(".progress-total");

const category =
    document.querySelector(".showcase-category");

const label =
    document.querySelector(".showcase-label");

const title =
    document.querySelector(".showcase-title");

const description =
    document.querySelector(".showcase-description");

const projectLink =
    document.querySelector(".showcase-project-link");


/* =========================================================
   SHOWCASE STATE
========================================================= */

let currentIndex = 0;

let showcaseTimer = null;

const transitionTime = 6000;


/* =========================================================
   UPDATE PROJECT INFORMATION
========================================================= */

function updateProjectInformation(index) {

    const project = showcaseProjects[index];

    if (!project) {
        return;
    }

    if (currentNumber) {
        currentNumber.textContent = project.number;
    }

    if (category) {
        category.textContent = project.category;
    }

    if (label) {
        label.textContent = project.label;
    }

    if (title) {
        title.textContent = project.title;
    }

    if (description) {
        description.textContent = project.description;
    }


    if (project.link && projectLink) {

        projectLink.href = project.link;

        projectLink.style.display = "inline-flex";

    } else if (projectLink) {

        projectLink.removeAttribute("href");

        projectLink.style.display = "none";
    }
}


/* =========================================================
   SHOW SLIDE
========================================================= */

function showSlide(index) {

    if (!slides.length) {
        return;
    }


    if (index >= slides.length) {
        index = 0;
    }


    if (index < 0) {
        index = slides.length - 1;
    }


    slides.forEach((slide) => {
        slide.classList.remove("active");
    });


    slides[index].classList.add("active");


    currentIndex = index;


    updateProjectInformation(currentIndex);
}


/* =========================================================
   NEXT / PREVIOUS
========================================================= */

function nextSlide() {
    showSlide(currentIndex + 1);
}


function previousSlide() {
    showSlide(currentIndex - 1);
}


/* =========================================================
   AUTOPLAY
========================================================= */

function startShowcase() {

    stopShowcase();


    showcaseTimer = setInterval(() => {

        nextSlide();

    }, transitionTime);
}


function stopShowcase() {

    if (showcaseTimer !== null) {

        clearInterval(showcaseTimer);

        showcaseTimer = null;
    }
}


/* =========================================================
   BUTTON CONTROLS
========================================================= */

if (nextButton) {

    nextButton.addEventListener("click", () => {

        nextSlide();

        startShowcase();
    });
}


if (previousButton) {

    previousButton.addEventListener("click", () => {

        previousSlide();

        startShowcase();
    });
}


/* =========================================================
   PAUSE WHILE HOVERING
========================================================= */

if (showcase) {

    showcase.addEventListener("mouseenter", () => {

        stopShowcase();
    });


    showcase.addEventListener("mouseleave", () => {

        startShowcase();
    });
}


/* =========================================================
   INITIALISE SHOWCASE
========================================================= */

if (slides.length > 0) {

    if (totalNumber) {

        totalNumber.textContent =
            String(slides.length).padStart(2, "0");
    }


    showSlide(0);

    startShowcase();
}


/* =========================================================
   DYNAMIC FOOTER YEAR
========================================================= */

const footer = document.querySelector("footer p");

if (footer) {

    const year = new Date().getFullYear();

    footer.innerHTML =
        `© ${year} Oluwapelumi Atanda. Built with curiosity and data.`;
}
