window.addEventListener("pageshow", () => {
  document.body.classList.remove("page-fade-out");
});

document.addEventListener("DOMContentLoaded", () => {
  const includes = document.querySelectorAll("[data-include]");

  includes.forEach(async (el) => {
    const file = el.getAttribute("data-include");
    const homeHref = el.getAttribute("data-home");
    const response = await fetch(file);
    const html = await response.text();
    el.innerHTML = html;

    if (homeHref) {
      const locationEl = el.querySelector("#header-location");
      if (locationEl) {
        locationEl.removeAttribute("data-i18n");
        locationEl.textContent = "";
        locationEl.classList.add("header-close");

        const closeLink = document.createElement("a");
        closeLink.href = homeHref;
        closeLink.textContent = "✕";
        closeLink.setAttribute("aria-label", "Back to homepage");
        closeLink.addEventListener("click", (e) => {
          e.preventDefault();
          document.body.classList.add("page-fade-out");
          setTimeout(() => { window.location.href = homeHref; }, 300);
        });

        locationEl.appendChild(closeLink);
      }
    }

    document.dispatchEvent(new Event("header:loaded"));
  });
});