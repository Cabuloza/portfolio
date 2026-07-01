# Portfolio Website Guide

This README explains how to edit, add, and manage your portfolio website.

## Folder Structure

Your project should look like this:

```text
portfolio/
├── index.html
├── css/
│   └── style.css
├── images/
│   └── project-covers/
├── videos/
│   └── project-covers/
└── pages/
    ├── camp.html
    ├── raceops.html
    └── future-project.html
```

## Main Files

### `index.html`

This is the homepage.

It contains:

```text
header
about / teams / links
project cards
```

Use this file when you want to change text, links, or project cards.

### `css/style.css`

This controls how everything looks:

```text
colors
spacing
grid layout
font sizes
hover effects
responsive mobile layout
```

Use this file when you want to change the design.

---

# How to Add a New Project Card

In `index.html`, find the project section:

```html
<section class="projects">
```

Inside one of the project columns, add a new card:

```html
<a href="pages/raceops.html" class="project-card">
  <div class="project-media placeholder">
    <span>COMING SOON</span>
  </div>

  <div class="project-text">
    <h2>RaceOps</h2>
    <p>Motorsport Platform</p>
  </div>
</a>
```

Change these parts:

```html
href="pages/raceops.html"
```

This is the page the card opens.

```html
<h2>RaceOps</h2>
```

This is the project title.

```html
<p>Motorsport Platform</p>
```

This is the small category text under the title.

---

# How to Add a Real Cover Image

Put your image here:

```text
images/project-covers/raceops-cover.jpg
```

Then replace this:

```html
<div class="project-media placeholder">
  <span>COMING SOON</span>
</div>
```

with this:

```html
<div class="project-media">
  <img src="images/project-covers/raceops-cover.jpg" alt="RaceOps project cover">
</div>
```

Good image formats:

```text
.jpg
.png
.webp
```

Recommended size:

```text
at least 1200px wide
```

---

# How to Add a Video Preview

Put your video here:

```text
videos/project-covers/raceops-preview.mp4
```

Then use this inside the card:

```html
<div class="project-media">
  <video autoplay muted loop playsinline>
    <source src="videos/project-covers/raceops-preview.mp4" type="video/mp4">
  </video>
</div>
```

Important video rules:

```text
autoplay = starts automatically
muted = required for autoplay to work
loop = repeats forever
playsinline = works nicely on phones
```

Best video length:

```text
5 to 8 seconds
```

Recommended video format:

```text
.mp4
```

Keep the file small if possible:

```text
under 10 MB is ideal
```

---

# How to Show Video Only on Hover

Use this structure:

```html
<a href="pages/raceops.html" class="project-card hover-video-card">

  <div class="project-media">
    <img class="cover-image" src="images/project-covers/raceops-cover.jpg" alt="RaceOps cover">

    <video class="hover-video" muted loop playsinline>
      <source src="videos/project-covers/raceops-preview.mp4" type="video/mp4">
    </video>
  </div>

  <div class="project-text">
    <h2>RaceOps</h2>
    <p>Motorsport Platform</p>
  </div>

</a>
```

Add this CSS to `css/style.css`:

```css
.hover-video-card .project-media {
  position: relative;
}

.hover-video-card .cover-image,
.hover-video-card .hover-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.hover-video-card .hover-video {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.hover-video-card:hover .hover-video {
  opacity: 1;
}

.hover-video-card:hover .cover-image {
  opacity: 0;
}
```

Then add this JavaScript before the closing `</body>` tag in `index.html`:

```html
<script>
  const hoverCards = document.querySelectorAll(".hover-video-card");

  hoverCards.forEach(card => {
    const video = card.querySelector("video");

    card.addEventListener("mouseenter", () => {
      video.play();
    });

    card.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
    });
  });
</script>
```

This makes the video play only when someone hovers over the project.

---

# How to Change a Placeholder

A placeholder card looks like this:

```html
<div class="project-media placeholder">
  <span>COMING SOON</span>
</div>
```

You can change the text:

```html
<span>IN DEVELOPMENT</span>
```

Other good placeholder labels:

```text
COMING SOON
IN DEVELOPMENT
CASE STUDY SOON
PRIVATE PROJECT
CURRENTLY BUILDING
```

---

# How to Change Project Card Height

In `css/style.css`, find:

```css
.project-media {
  min-height: 360px;
}
```

You can make a specific card taller by adding a class:

```html
<div class="project-media placeholder tall">
```

Then in CSS:

```css
.project-media.tall {
  min-height: 430px;
}
```

For a bigger card:

```html
<div class="project-media placeholder large">
```

CSS:

```css
.project-media.large {
  min-height: 520px;
}
```

This is how the homepage gets the staggered portfolio look.

---

# How to Add a New Project Page

Inside the `pages/` folder, create a new file:

```text
pages/raceops.html
```

Basic project page template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RaceOps</title>
  <link rel="stylesheet" href="../css/style.css">
</head>

<body>
  <div class="site">

    <header class="header">
      <a href="../index.html" class="header-name">Ana Milosevic</a>
      <p class="header-role">Student Software Engineer</p>
      <p class="header-location">Graz, Austria</p>
    </header>

    <main class="project-page">
      <a href="../index.html">← Back</a>

      <h1>RaceOps</h1>
      <p>Motorsport dashboard platform for race strategy, telemetry, and live timing.</p>
    </main>

  </div>
</body>
</html>
```

Because this file is inside the `pages/` folder, links to CSS need `../`:

```html
<link rel="stylesheet" href="../css/style.css">
```

The back link also needs `../`:

```html
<a href="../index.html">← Back</a>
```

---

# How to Change the About Text

In `index.html`, find:

```html
<div class="about">
```

Then edit the paragraph under `ABOUT`.

Example:

```html
<p>
  I am a software engineering student interested in building useful tools,
  clean interfaces, and systems that make everyday workflows easier.
</p>
```

---

# How to Change Teams or Links

Find this section:

```html
<div class="side-list teams">
```

To add a team:

```html
<a href="#">New Team<sup>6</sup></a>
```

Find this section:

```html
<div class="side-list links">
```

To add a link:

```html
<a href="https://github.com/yourusername">GitHub <sup>↗</sup></a>
```

For external links, use:

```html
<a href="https://github.com/yourusername" target="_blank">GitHub <sup>↗</sup></a>
```

---

# How to Make the Header Sticky

In `css/style.css`, add this to `.header`:

```css
.header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: #111111;
}
```

This keeps your name, role, and location visible while scrolling.

---

# How to Add More Than 9 Projects

You can add as many cards as you want.

The layout has 3 columns:

```html
<div class="project-column">
```

Try to distribute cards evenly:

```text
Column 1: project 1, project 4, project 7
Column 2: project 2, project 5, project 8
Column 3: project 3, project 6, project 9
```

This keeps the page balanced.

---

# Common Problems

## Image does not show

Check:

```text
Is the file name correct?
Is the folder correct?
Did you use images/project-covers/name.jpg?
Is the extension .jpg, .png, or .webp correct?
```

Example:

```html
<img src="images/project-covers/raceops-cover.jpg">
```

This must match the real file name exactly.

## Video does not autopla# Portfolio Website Guide

This README explains how to edit, add, and manage your portfolio website.

## Folder Structure

Your project should look like this:

```text
portfolio/
├── index.html
├── css/
│   └── style.css
├── images/
│   └── project-covers/
├── videos/
│   └── project-covers/
└── pages/
    ├── camp.html
    ├── raceops.html
    └── future-project.html
```

## Main Files

### `index.html`

This is the homepage.

It contains:

```text
header
about / teams / links
project cards
```

Use this file when you want to change text, links, or project cards.

### `css/style.css`

This controls how everything looks:

```text
colors
spacing
grid layout
font sizes
hover effects
responsive mobile layout
```

Use this file when you want to change the design.

---

# How to Add a New Project Card

In `index.html`, find the project section:

```html
<section class="projects">
```

Inside one of the project columns, add a new card:

```html
<a href="pages/raceops.html" class="project-card">
  <div class="project-media placeholder">
    <span>COMING SOON</span>
  </div>

  <div class="project-text">
    <h2>RaceOps</h2>
    <p>Motorsport Platform</p>
  </div>
</a>
```

Change these parts:

```html
href="pages/raceops.html"
```

This is the page the card opens.

```html
<h2>RaceOps</h2>
```

This is the project title.

```html
<p>Motorsport Platform</p>
```

This is the small category text under the title.

---

# How to Add a Real Cover Image

Put your image here:

```text
images/project-covers/raceops-cover.jpg
```

Then replace this:

```html
<div class="project-media placeholder">
  <span>COMING SOON</span>
</div>
```

with this:

```html
<div class="project-media">
  <img src="images/project-covers/raceops-cover.jpg" alt="RaceOps project cover">
</div>
```

Good image formats:

```text
.jpg
.png
.webp
```

Recommended size:

```text
at least 1200px wide
```

---

# How to Add a Video Preview

Put your video here:

```text
videos/project-covers/raceops-preview.mp4
```

Then use this inside the card:

```html
<div class="project-media">
  <video autoplay muted loop playsinline>
    <source src="videos/project-covers/raceops-preview.mp4" type="video/mp4">
  </video>
</div>
```

Important video rules:

```text
autoplay = starts automatically
muted = required for autoplay to work
loop = repeats forever
playsinline = works nicely on phones
```

Best video length:

```text
5 to 8 seconds
```

Recommended video format:

```text
.mp4
```

Keep the file small if possible:

```text
under 10 MB is ideal
```

---

# How to Show Video Only on Hover

Use this structure:

```html
<a href="pages/raceops.html" class="project-card hover-video-card">

  <div class="project-media">
    <img class="cover-image" src="images/project-covers/raceops-cover.jpg" alt="RaceOps cover">

    <video class="hover-video" muted loop playsinline>
      <source src="videos/project-covers/raceops-preview.mp4" type="video/mp4">
    </video>
  </div>

  <div class="project-text">
    <h2>RaceOps</h2>
    <p>Motorsport Platform</p>
  </div>

</a>
```

Add this CSS to `css/style.css`:

```css
.hover-video-card .project-media {
  position: relative;
}

.hover-video-card .cover-image,
.hover-video-card .hover-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.hover-video-card .hover-video {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.hover-video-card:hover .hover-video {
  opacity: 1;
}

.hover-video-card:hover .cover-image {
  opacity: 0;
}
```

Then add this JavaScript before the closing `</body>` tag in `index.html`:

```html
<script>
  const hoverCards = document.querySelectorAll(".hover-video-card");

  hoverCards.forEach(card => {
    const video = card.querySelector("video");

    card.addEventListener("mouseenter", () => {
      video.play();
    });

    card.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
    });
  });
</script>
```

This makes the video play only when someone hovers over the project.

---

# How to Change a Placeholder

A placeholder card looks like this:

```html
<div class="project-media placeholder">
  <span>COMING SOON</span>
</div>
```

You can change the text:

```html
<span>IN DEVELOPMENT</span>
```

Other good placeholder labels:

```text
COMING SOON
IN DEVELOPMENT
CASE STUDY SOON
PRIVATE PROJECT
CURRENTLY BUILDING
```

---

# How to Change Project Card Height

In `css/style.css`, find:

```css
.project-media {
  min-height: 360px;
}
```

You can make a specific card taller by adding a class:

```html
<div class="project-media placeholder tall">
```

Then in CSS:

```css
.project-media.tall {
  min-height: 430px;
}
```

For a bigger card:

```html
<div class="project-media placeholder large">
```

CSS:

```css
.project-media.large {
  min-height: 520px;
}
```

This is how the homepage gets the staggered portfolio look.

---

# How to Add a New Project Page

Inside the `pages/` folder, create a new file:

```text
pages/raceops.html
```

Basic project page template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RaceOps</title>
  <link rel="stylesheet" href="../css/style.css">
</head>

<body>
  <div class="site">

    <header class="header">
      <a href="../index.html" class="header-name">Ana Milosevic</a>
      <p class="header-role">Student Software Engineer</p>
      <p class="header-location">Graz, Austria</p>
    </header>

    <main class="project-page">
      <a href="../index.html">← Back</a>

      <h1>RaceOps</h1>
      <p>Motorsport dashboard platform for race strategy, telemetry, and live timing.</p>
    </main>

  </div>
</body>
</html>
```

Because this file is inside the `pages/` folder, links to CSS need `../`:

```html
<link rel="stylesheet" href="../css/style.css">
```

The back link also needs `../`:

```html
<a href="../index.html">← Back</a>
```

---

# How to Change the About Text

In `index.html`, find:

```html
<div class="about">
```

Then edit the paragraph under `ABOUT`.

Example:

```html
<p>
  I am a software engineering student interested in building useful tools,
  clean interfaces, and systems that make everyday workflows easier.
</p>
```

---

# How to Change Teams or Links

Find this section:

```html
<div class="side-list teams">
```

To add a team:

```html
<a href="#">New Team<sup>6</sup></a>
```

Find this section:

```html
<div class="side-list links">
```

To add a link:

```html
<a href="https://github.com/yourusername">GitHub <sup>↗</sup></a>
```

For external links, use:

```html
<a href="https://github.com/yourusername" target="_blank">GitHub <sup>↗</sup></a>
```

---

# How to Make the Header Sticky

In `css/style.css`, add this to `.header`:

```css
.header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: #111111;
}
```

This keeps your name, role, and location visible while scrolling.

---

# How to Add More Than 9 Projects

You can add as many cards as you want.

The layout has 3 columns:

```html
<div class="project-column">
```

Try to distribute cards evenly:

```text
Column 1: project 1, project 4, project 7
Column 2: project 2, project 5, project 8
Column 3: project 3, project 6, project 9
```

This keeps the page balanced.

---

# Common Problems

## Image does not show

Check:

```text
Is the file name correct?
Is the folder correct?
Did you use images/project-covers/name.jpg?
Is the extension .jpg, .png, or .webp correct?
```

Example:

```html
<img src="images/project-covers/raceops-cover.jpg">
```

This must match the real file name exactly.

## Video does not autoplay

Check:

```text
Is muted included?
Is playsinline included?
Is the file .mp4?
Is the file path correct?
```

Correct:

```html
<video autoplay muted loop playsinline>
```

## CSS does not update

Try:

```text
Refresh the browser
Hard refresh with Ctrl + Shift + R
Check that the CSS path is correct
```

On the homepage:

```html
<link rel="stylesheet" href="css/style.css">
```

On project pages inside `pages/`:

```html
<link rel="stylesheet" href="../css/style.css">
```

---

# Design Notes

Keep the website minimal.

Recommended structure:

```text
Header
About / Teams / Links
Projects
No footer
```

A footer is optional, but not necessary for this style.

The goal is:

```text
clean
dark
simple
project-focused
easy to update
```y

Check:

```text
Is muted included?
Is playsinline included?
Is the file .mp4?
Is the file path correct?
```

Correct:

```html
<video autoplay muted loop playsinline>
```

## CSS does not update

Try:

```text
Refresh the browser
Hard refresh with Ctrl + Shift + R
Check that the CSS path is correct
```

On the homepage:

```html
<link rel="stylesheet" href="css/style.css">
```

On project pages inside `pages/`:

```html
<link rel="stylesheet" href="../css/style.css">
```

---

# Design Notes

Keep the website minimal.

Recommended structure:

```text
Header
About / Teams / Links
Projects
No footer
```

A footer is optional, but not necessary for this style.

The goal is:

```text
clean
dark
simple
project-focused
easy to update
```