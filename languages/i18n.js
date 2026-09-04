const LANGS = ["en", "de", "fr", "sr"];
const LABELS = { en: "EN", de: "DE", fr: "FR", sr: "SR" };

function getCurrentLang() {
  return localStorage.getItem("lang") || "en";
}

async function applyLanguage(lang) {
  const res = await fetch(`languages/${lang}.json`);
  const dict = await res.json();

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const value = key.split(".").reduce((o, k) => o?.[k], dict);
    if (value) el.textContent = value;
  });

  document.querySelectorAll("[data-i18n-html]").forEach(el => {
    const key = el.getAttribute("data-i18n-html");
    const value = key.split(".").reduce((o, k) => o?.[k], dict);
    if (value) el.innerHTML = value;
  });

  localStorage.setItem("lang", lang);
  renderLanguageSwitcher(lang);
}

function renderLanguageSwitcher(current) {
  const nav = document.getElementById("header-languages");
  if (!nav) return;
  nav.innerHTML = "";
  LANGS.filter(l => l !== current).forEach(l => {
    const a = document.createElement("a");
    a.textContent = LABELS[l];
    a.addEventListener("click", () => applyLanguage(l));
    nav.appendChild(a);
  });
}

document.addEventListener("header:loaded", () => {
  applyLanguage(getCurrentLang());
});