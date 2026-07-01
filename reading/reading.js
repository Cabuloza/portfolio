// 40 "random" books (mix of well-known + design/tech + classics)
// cover: placeholder images (swap with your own cover URLs later)
// link: where the cover should go (Amazon/Goodreads/your notes page/etc.)
const books = [
  { title: "10x Is Easier Than 2x", cover: "https://picsum.photos/seed/10x/600/900", link: "#" },
  { title: "A Pattern Language", cover: "https://picsum.photos/seed/pattern/600/900", link: "#" },
  { title: "Atomic Habits", cover: "https://picsum.photos/seed/atomic/600/900", link: "#" },
  { title: "Babel", cover: "https://picsum.photos/seed/babel/600/900", link: "#" },
  { title: "The Complete Investor", cover: "https://picsum.photos/seed/munger/600/900", link: "#" },
  { title: "Creative Selection", cover: "https://picsum.photos/seed/selection/600/900", link: "#" },
  { title: "The Design of Everyday Things", cover: "https://picsum.photos/seed/doet/600/900", link: "#" },
  { title: "Don't Make Me Think", cover: "https://picsum.photos/seed/dmmt/600/900", link: "#" },
  { title: "Thinking, Fast and Slow", cover: "https://picsum.photos/seed/tfs/600/900", link: "#" },
  { title: "Sapiens: A Brief History of Humankind", cover: "https://picsum.photos/seed/sapiens/600/900", link: "#" },

  { title: "The Almanack of Naval Ravikant", cover: "https://picsum.photos/seed/naval/600/900", link: "#" },
  { title: "The Psychology of Money", cover: "https://picsum.photos/seed/money/600/900", link: "#" },
  { title: "Poor Charlie's Almanack", cover: "https://picsum.photos/seed/poorcharlie/600/900", link: "#" },
  { title: "The Art of Doing Science and Engineering", cover: "https://picsum.photos/seed/hamming/600/900", link: "#" },
  { title: "Six Easy Pieces", cover: "https://picsum.photos/seed/feynman/600/900", link: "#" },
  { title: "Surely You're Joking, Mr. Feynman!", cover: "https://picsum.photos/seed/joking/600/900", link: "#" },
  { title: "Godel, Escher, Bach", cover: "https://picsum.photos/seed/geb/600/900", link: "#" },
  { title: "The City & The City", cover: "https://picsum.photos/seed/citycity/600/900", link: "#" },
  { title: "The Timeless Way of Building", cover: "https://picsum.photos/seed/timeless/600/900", link: "#" },
  { title: "Notes on the Synthesis of Form", cover: "https://picsum.photos/seed/synthesis/600/900", link: "#" },

  { title: "Understanding Comics: The Invisible Art", cover: "https://picsum.photos/seed/comics/600/900", link: "#" },
  { title: "The Burning God", cover: "https://picsum.photos/seed/burning/600/900", link: "#" },
  { title: "The Dragon Republic", cover: "https://picsum.photos/seed/dragon/600/900", link: "#" },
  { title: "The Poppy War", cover: "https://picsum.photos/seed/poppy/600/900", link: "#" },
  { title: "Make Something Wonderful", cover: "https://picsum.photos/seed/make/600/900", link: "#" },
  { title: "The Myth of Sisyphus", cover: "https://picsum.photos/seed/sisyphus/600/900", link: "#" },
  { title: "Meditations", cover: "https://picsum.photos/seed/meditations/600/900", link: "#" },
  { title: "Man's Search for Meaning", cover: "https://picsum.photos/seed/meaning/600/900", link: "#" },
  { title: "The War of Art", cover: "https://picsum.photos/seed/warofart/600/900", link: "#" },
  { title: "Deep Work", cover: "https://picsum.photos/seed/deepwork/600/900", link: "#" },

  { title: "The Lean Startup", cover: "https://picsum.photos/seed/lean/600/900", link: "#" },
  { title: "Hooked: How to Build Habit-Forming Products", cover: "https://picsum.photos/seed/hooked/600/900", link: "#" },
  { title: "How to Take Smart Notes", cover: "https://picsum.photos/seed/notes/600/900", link: "#" },
  { title: "The Checklist Manifesto", cover: "https://picsum.photos/seed/checklist/600/900", link: "#" },
  { title: "The Black Swan", cover: "https://picsum.photos/seed/blackswan/600/900", link: "#" },
  { title: "Antifragile", cover: "https://picsum.photos/seed/antifragile/600/900", link: "#" },
  { title: "The Innovator's Dilemma", cover: "https://picsum.photos/seed/innovator/600/900", link: "#" },
  { title: "The Hard Thing About Hard Things", cover: "https://picsum.photos/seed/hardthing/600/900", link: "#" },
  { title: "On Writing Well", cover: "https://picsum.photos/seed/writingwell/600/900", link: "#" },
  { title: "Work: A History of How We Spend Our Time", cover: "https://picsum.photos/seed/work/600/900", link: "#" },
];

const listEl = document.getElementById("bookList");
const gridEl = document.getElementById("coversGrid");

function render() {
  // Left list
  books.forEach((b, i) => {
    const li = document.createElement("li");
    li.className = "book-item";
    li.dataset.index = i;

    li.innerHTML = `
      <span class="book-title-wrap">
        <span class="book-title">${b.title}</span>
      </span>
      <span class="book-view">[VIEW]</span>
    `;
    listEl.appendChild(li);
  });

  // Right grid
  books.forEach((b, i) => {
    const a = document.createElement("a");
    a.className = "cover";
    a.dataset.index = i;
    a.href = b.link;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.innerHTML = `<img src="${b.cover}" alt="${b.title} cover" loading="lazy">`;
    gridEl.appendChild(a);
  });

  setActive(0);

  // Hover syncing: list -> cover
  listEl.addEventListener("mouseover", (e) => {
    const item = e.target.closest(".book-item");
    if (!item) return;
    setActive(Number(item.dataset.index));
  });

  // Hover syncing: cover -> list
  gridEl.addEventListener("mouseover", (e) => {
    const cover = e.target.closest(".cover");
    if (!cover) return;
    setActive(Number(cover.dataset.index));
  });

  // Apply scroll-left if title overflows when active
  // (runs once after render, and again on resize)
  window.addEventListener("resize", () => {
    const active = document.querySelector(".book-item.active");
    if (active) computeShift(active);
  });
}

function setActive(index) {
  document.querySelectorAll(".book-item").forEach(el => {
    el.classList.remove("active");
    el.style.setProperty("--shift", "0px");
  });
  document.querySelectorAll(".cover").forEach(el => el.classList.remove("active"));

  const activeList = document.querySelector(`.book-item[data-index="${index}"]`);
  const activeCover = document.querySelector(`.cover[data-index="${index}"]`);
  if (activeList) {
    activeList.classList.add("active");
    computeShift(activeList);
  }
  if (activeCover) activeCover.classList.add("active");
}

// If the title is wider than the available area, shift left just enough
function computeShift(itemEl) {
  const wrap = itemEl.querySelector(".book-title-wrap");
  const title = itemEl.querySelector(".book-title");
  if (!wrap || !title) return;

  const overflow = title.scrollWidth - wrap.clientWidth;
  if (overflow > 4) {
    // negative value shifts left; add a little padding so it doesn't hit the edge
    itemEl.style.setProperty("--shift", `${-(overflow + 8)}px`);
  } else {
    itemEl.style.setProperty("--shift", "0px");
  }
}

render();

const bookItems = document.querySelectorAll(".book-item");
const covers = document.querySelectorAll(".cover");
const leftPanel = document.querySelector(".reading-left");

function activateBook(index) {
  bookItems.forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });

  covers.forEach((cover, i) => {
    cover.classList.toggle("active", i === index);
  });

  const activeItem = bookItems[index];

  if (activeItem && leftPanel) {
    const panelHeight = leftPanel.clientHeight;
    const itemTop = activeItem.offsetTop;
    const itemHeight = activeItem.offsetHeight;

    leftPanel.scrollTo({
      top: itemTop - panelHeight / 2 + itemHeight / 2,
      behavior: "smooth"
    });
  }
}

covers.forEach((cover, index) => {
  cover.addEventListener("mouseenter", () => {
    activateBook(index);
  });
});

bookItems.forEach((item, index) => {
  item.addEventListener("mouseenter", () => {
    activateBook(index);
  });
});