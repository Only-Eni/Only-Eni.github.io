/* =========================================================
PORTFOLIO SHOWCASE DATA
========================================================= */

const showcaseProjects = [

```
{
    type: "profile",

    number: "01",

    category: "INTRODUCTION",

    label: "DATA ANALYST • PHYSIOTHERAPY STUDENT",

    title: "Oluwapelumi Atanda",

    description:
        "Exploring the intersection of data, research, visualization and healthcare.",

    link: null
},

{
    type: "project",

    number: "02",

    category: "SQL ANALYSIS",

    label: "SQL • DATA ANALYSIS",

    title: "DataCamp Associate Practical",

    description:
        "Grocery store sales analysis using SQL to examine sales performance, product activity and customer purchasing patterns.",

    link:
        "project.html?id=datacamp"
},

{
    type: "project",

    number: "03",

    category: "DATA EXPLORATION",

    label: "SQL • EDA",

    title: "SQL Data Analysis",

    description:
        "SQL-based exploratory analysis focused on examining dataset structure, uncovering useful metrics and identifying patterns for deeper investigation.",

    link:
        "project.html?id=sql-data-analysis"
},

{
    type: "project",

    number: "04",

    category: "VISUALIZATION",

    label: "DATA VISUALIZATION • ANALYTICS",

    title: "Data Visualization Project",

    description:
        "Transforming analytical results into clear visual narratives designed to make patterns, comparisons and insights easier to understand.",

    link:
        "project.html?id=data-visualization"
},

{
    type: "project",

    number: "05",

    category: "CURRENTLY BUILDING",

    label: "SQL • POWER BI • EXCEL",

    title: "Creator Performance Analytics",

    description:
        "An end-to-end analytics project exploring creator performance, audience reach, content categories and geographic trends.",

    link:
        "project.html?id=creator-performance"
}
```

];

/* =========================================================
SMOOTH REVEAL ANIMATION
========================================================= */

const sections = document.querySelectorAll(
".section, .project-showcase-section"
);

const observer = new IntersectionObserver(
(entries) => {

```
    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";

            entry.target.style.transform =
                "translateY(0)";

        }

    });

},
{
    threshold: 0.1
}
```

);

/* Initial animation state */

sections.forEach((section) => {

```
section.style.opacity = "0";

section.style.transform =
    "translateY(30px)";

section.style.transition =
    "opacity 0.7s ease, transform 0.7s ease";

observer.observe(section);
```

});

/* =========================================================
PROJECT SHOWCASE
========================================================= */

const showcase =
document.querySelector(".project-showcase");

const slides =
document.querySelectorAll(".showcase-slide");

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

let currentIndex = 0;

let showcaseTimer = null;

const transitionDuration = 6000;

/* =========================================================
UPDATE SHOWCASE CONTENT
========================================================= */

function updateShowcaseContent(index) {

```
const project =
    showcaseProjects[index];

if (!project) {
    return;
}


/* Number */

currentNumber.textContent =
    project.number;


/* Category */

category.textContent =
    project.category;


/* Label */

label.textContent =
    project.label;


/* Title */

title.textContent =
    project.title;


/* Description */

description.textContent =
    project.description;


/* Project link */

if (
    project.type === "project" &&
    project.link
) {

    projectLink.href =
        project.link;

    projectLink.style.display =
        "inline-flex";

    projectLink.textContent =
        "Explore Project ↗";

} else {

    projectLink.style.display =
        "none";

    projectLink.removeAttribute(
        "href"
    );

}
```

}

/* =========================================================
CHANGE SLIDE
========================================================= */

function showSlide(index) {

```
if (!slides.length) {
    return;
}


/* Loop backwards */

if (index < 0) {

    index =
        slides.length - 1;

}


/* Loop forwards */

if (index >= slides.length) {

    index = 0;

}


/* Remove active state */

slides.forEach((slide) => {

    slide.classList.remove("active");

});


/* Activate selected slide */

slides[index].classList.add("active");


currentIndex =
    index;


updateShowcaseContent(
    currentIndex
);


restartProgress();
```

}

/* =========================================================
NEXT / PREVIOUS
========================================================= */

function nextSlide() {

```
showSlide(
    currentIndex + 1
);
```

}

function previousSlide() {

```
showSlide(
    currentIndex - 1
);
```

}

/* =========================================================
AUTOMATIC PLAY
========================================================= */

function startShowcase() {

```
stopShowcase();


showcaseTimer =
    setInterval(
        nextSlide,
        transitionDuration
    );


if (showcase) {

    showcase.classList.add(
        "is-playing"
    );

}
```

}

function stopShowcase() {

```
if (showcaseTimer) {

    clearInterval(
        showcaseTimer
    );

    showcaseTimer = null;

}


if (showcase) {

    showcase.classList.remove(
        "is-playing"
    );

}
```

}

/* =========================================================
PROGRESS BAR
========================================================= */

function restartProgress() {

```
if (!showcase) {
    return;
}


showcase.classList.remove(
    "is-playing"
);


/*
   Force browser reflow so the
   progress animation restarts.
*/

void showcase.offsetWidth;


showcase.classList.add(
    "is-playing"
);
```

}

/* =========================================================
BUTTON EVENTS
========================================================= */

if (nextButton) {

```
nextButton.addEventListener(
    "click",
    () => {

        nextSlide();

        startShowcase();

    }
);
```

}

if (previousButton) {

```
previousButton.addEventListener(
    "click",
    () => {

        previousSlide();

        startShowcase();

    }
);
```

}

/* =========================================================
PAUSE ON HOVER
========================================================= */

if (showcase) {

```
showcase.addEventListener(
    "mouseenter",
    stopShowcase
);


showcase.addEventListener(
    "mouseleave",
    startShowcase
);
```

}

/* =========================================================
KEYBOARD NAVIGATION
========================================================= */

document.addEventListener(
"keydown",
(event) => {

```
    if (
        event.key === "ArrowRight"
    ) {

        nextSlide();

        startShowcase();

    }


    if (
        event.key === "ArrowLeft"
    ) {

        previousSlide();

        startShowcase();

    }

}
```

);

/* =========================================================
TOUCH / SWIPE SUPPORT
========================================================= */

let touchStartX = 0;

let touchEndX = 0;

if (showcase) {

```
showcase.addEventListener(
    "touchstart",
    (event) => {

        touchStartX =
            event.changedTouches[0].screenX;

    },
    {
        passive: true
    }
);


showcase.addEventListener(
    "touchend",
    (event) => {

        touchEndX =
            event.changedTouches[0].screenX;


        const distance =
            touchEndX - touchStartX;


        if (Math.abs(distance) < 50) {
            return;
        }


        if (distance < 0) {

            nextSlide();

        } else {

            previousSlide();

        }


        startShowcase();

    },
    {
        passive: true
    }
);
```

}

/* =========================================================
INITIALISE SHOWCASE
========================================================= */

if (
slides.length &&
showcaseProjects.length
) {

```
totalNumber.textContent =
    String(
        showcaseProjects.length
    ).padStart(2, "0");


updateShowcaseContent(
    currentIndex
);


startShowcase();
```

}

/* =========================================================
DYNAMIC FOOTER YEAR
========================================================= */

const footer =
document.querySelector("footer p");

if (footer) {

```
const year =
    new Date().getFullYear();

footer.innerHTML =
    `© ${year} Oluwapelumi Atanda. Built with curiosity and data.`;
```

}

```
