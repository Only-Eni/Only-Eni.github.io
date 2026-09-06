// Smooth reveal animation

const sections = document.querySelectorAll(
    ".section, .contact-section"
);

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    },
    {
        threshold: 0.1
    }
);


// Initial animation state

sections.forEach((section) => {

    section.style.opacity = "0";

    section.style.transform = "translateY(30px)";

    section.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";

    observer.observe(section);

});


// Dynamic footer year

const footer = document.querySelector("footer p");

if (footer) {

    const year = new Date().getFullYear();

    footer.innerHTML =
        `© ${year} Oluwapelumi Atanda. Built with curiosity and data.`;

}
