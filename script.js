<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta name="description" content="Oluwapelumi Atanda — Data Analyst and Physiotherapy student focused on data analytics, business intelligence, statistics and healthcare analytics.">
    <meta name="author" content="Oluwapelumi Atanda">

    <title>Oluwapelumi Atanda | Data Analyst</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="style.css">
    <script src="script.js" defer></script>
</head>

<body>

<header class="site-header">
    <nav class="navbar" aria-label="Primary navigation">
        <a href="#top" class="logo" aria-label="Oluwapelumi Atanda home">OA.</a>

        <div class="nav-links">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
        </div>

        <a
            href="https://github.com/Only-Eni"
            class="github-nav"
            target="_blank"
            rel="noopener noreferrer"
        >
            GitHub ↗
        </a>

        <button
            type="button"
            class="menu-toggle"
            id="menuToggle"
            aria-label="Open navigation menu"
            aria-expanded="false"
            aria-controls="mobileMenu"
        >
            <span></span>
            <span></span>
            <span></span>
        </button>
    </nav>

    <div class="mobile-menu" id="mobileMenu">
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a href="#contact">Contact</a>
    </div>
</header>

<main id="top">

    <!-- HERO -->
    <section class="hero-section">
        <div class="hero-content">
            <p class="eyebrow">DATA ANALYST • HEALTHCARE ANALYTICS ENTHUSIAST</p>

            <h1>
                Turning data into
                <span>meaningful decisions.</span>
            </h1>

            <p class="hero-description">
                I'm Oluwapelumi Atanda, a Data Analyst and Physiotherapy student interested in using data to uncover patterns, communicate insights and support better decisions across business, research and healthcare.
            </p>

            <div class="hero-actions">
                <a href="#projects" class="button button-primary">Explore My Work ↓</a>
                <a href="https://github.com/Only-Eni" class="button button-secondary" target="_blank" rel="noopener noreferrer">View GitHub ↗</a>
            </div>

            <div class="hero-meta">
                <div class="hero-meta-item">
                    <strong>SQL</strong>
                    <span>Core Analytics</span>
                </div>

                <div class="hero-meta-item">
                    <strong>BI</strong>
                    <span>Power BI</span>
                </div>

                <div class="hero-meta-item">
                    <strong>Research</strong>
                    <span>Statistics</span>
                </div>
            </div>
        </div>
    </section>


    <!-- ABOUT -->
    <section id="about" class="section">
        <div class="section-heading">
            <div>
                <p class="eyebrow">01 / ABOUT ME</p>
                <h2>Data analysis with a <span>healthcare perspective.</span></h2>
            </div>
        </div>

        <div class="about-grid">
            <div class="about-image-wrapper">
                <img
                    src="assets/oluwapelumi-atanda.jpg"
                    alt="Oluwapelumi Atanda"
                    class="about-image"
                    width="800"
                    height="1000"
                >
            </div>

            <div class="about-content">
                <p>
                    I am a Data Analyst with a growing interest in Business Intelligence, healthcare analytics and evidence-based decision-making.
                </p>

                <p>
                    My Physiotherapy background gives me an additional perspective on working with health and research data, particularly where analytical thinking needs to connect with real-world outcomes.
                </p>

                <p>
                    I work with SQL, Power BI, Microsoft Excel, SPSS and statistical methods to clean, explore, analyze and communicate data in a way that is useful to decision-makers.
                </p>

                <div class="focus-list">
                    <p class="eyebrow">CURRENT FOCUS</p>

                    <div class="focus-item">
                        <span>01</span>
                        <strong>Data Analytics</strong>
                    </div>

                    <div class="focus-item">
                        <span>02</span>
                        <strong>Business Intelligence</strong>
                    </div>

                    <div class="focus-item">
                        <span>03</span>
                        <strong>Healthcare Analytics</strong>
                    </div>
                </div>
            </div>
        </div>
    </section>


    <!-- PROJECTS -->
    <section id="projects" class="projects-section">
        <div class="section-heading showcase-heading">
            <div>
                <p class="eyebrow">02 / SELECTED WORK</p>

                <h2>
                    Projects that show
                    <span>how I work with data.</span>
                </h2>
            </div>

            <p class="showcase-intro">
                A visual walkthrough of selected analytics, visualization and research projects.
            </p>
        </div>

        <div class="project-showcase" id="projectShowcase">

            <div class="showcase-visual">
                <div class="showcase-image-container">
                    <img
                        id="showcaseImage"
                        class="showcase-image"
                        src="assets/projects/decodelabs/DecodeLabs_main.png"
                        alt="DecodeLabs Data Analytics Internship project"
                        width="1200"
                        height="800"
                        loading="eager"
                        decoding="async"
                        fetchpriority="high"
                    >

                    <div class="showcase-image-overlay" aria-hidden="true"></div>
                </div>

                <div class="showcase-controls" aria-label="Project navigation">
                    <button
                        type="button"
                        class="showcase-arrow"
                        id="previousProject"
                        aria-label="Previous project"
                    >←</button>

                    <div class="showcase-counter" aria-live="polite">
                        <span id="currentProjectNumber">01</span>
                        <span class="counter-divider">/</span>
                        <span id="totalProjects">05</span>
                    </div>

                    <button
                        type="button"
                        class="showcase-arrow"
                        id="nextProject"
                        aria-label="Next project"
                    >→</button>
                </div>
            </div>


            <div class="project-info">
                <p class="project-category" id="projectCategory">DATA ANALYTICS INTERNSHIP</p>

                <h3 class="project-title" id="projectTitle">
                    DecodeLabs Data Analytics Internship
                </h3>

                <p class="project-description" id="projectDescription">
                    Practical analytics work covering data preparation, SQL analysis and visualization across multiple internship tasks.
                </p>

                <div class="project-tags" id="projectTags">
                    <span class="project-tag">SQL</span>
                    <span class="project-tag">Excel</span>
                    <span class="project-tag">Power BI</span>
                    <span class="project-tag">Data Analysis</span>
                </div>

                <a
                    href="#"
                    class="showcase-link"
                    id="showcaseLink"
                    target="_blank"
                    rel="noopener noreferrer"
                    hidden
                >
                    View Project <span aria-hidden="true">↗</span>
                </a>
            </div>

        </div>
    </section>


    <!-- SKILLS -->
    <section id="skills" class="section">
        <div class="section-heading">
            <div>
                <p class="eyebrow">03 / SKILLS</p>
                <h2>Tools for turning <span>data into insight.</span></h2>
            </div>

            <p class="section-intro">
                My current analytics toolkit spans data querying, business intelligence, spreadsheet analysis, visualization and statistical research.
            </p>
        </div>

        <div class="skills-grid">
            <article class="skill">
                <span>01</span>
                <h3>SQL & Data Analysis</h3>
                <p>Querying, cleaning, aggregation, exploratory analysis and structured data investigation.</p>
            </article>

            <article class="skill">
                <span>02</span>
                <h3>Power BI & Visualization</h3>
                <p>Dashboard design, KPI reporting and visual communication of analytical findings.</p>
            </article>

            <article class="skill">
                <span>03</span>
                <h3>Excel & Power Query</h3>
                <p>Data preparation, validation, transformation and spreadsheet-based analysis.</p>
            </article>

            <article class="skill">
                <span>04</span>
                <h3>SPSS & Statistics</h3>
                <p>Statistical testing, interpretation and research-oriented analytical workflows.</p>
            </article>

            <article class="skill">
                <span>05</span>
                <h3>Exploratory Data Analysis</h3>
                <p>Profiling data, identifying patterns, checking quality and turning observations into useful questions.</p>
            </article>
        </div>
    </section>


    <!-- CONTACT -->
    <section id="contact" class="contact-section">
        <p class="eyebrow">04 / CONTACT</p>

        <h2>Let's turn data into <span>something useful.</span></h2>

        <p>
            I am open to junior Data Analyst opportunities, analytics projects, research collaborations and opportunities where data can support better decisions.
        </p>

        <div class="contact-links">
            <a href="mailto:olamideeniitan254@gmail.com" class="contact-link">Email</a>

            <a
                href="https://www.linkedin.com/in/oluwapelumi-atanda-438a9730b"
                class="contact-link"
                target="_blank"
                rel="noopener noreferrer"
            >LinkedIn</a>

            <a
                href="https://x.com/TheDataPT"
                class="contact-link"
                target="_blank"
                rel="noopener noreferrer"
            >X</a>

            <a
                href="https://github.com/Only-Eni"
                class="contact-link"
                target="_blank"
                rel="noopener noreferrer"
            >GitHub</a>
        </div>
    </section>

</main>


<footer>
    <p>© <span id="currentYear">2026</span> Oluwapelumi Atanda. Built with curiosity and data.</p>

    <a
        href="https://github.com/Only-Eni"
        target="_blank"
        rel="noopener noreferrer"
    >GitHub ↗</a>
</footer>

</body>
</html>
