const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");
const cards = Array.from(document.querySelectorAll(".tramite-card"));
const resultCount = document.getElementById("resultCount");
const noResults = document.getElementById("noResults");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

function filterTramites() {
  const query = searchInput.value.trim().toLocaleLowerCase("es");
  let visible = 0;

  cards.forEach((card) => {
    const content = (card.innerText + " " + (card.dataset.search || "")).toLocaleLowerCase("es");
    const matches = content.includes(query);
    card.hidden = !matches;
    if (matches) visible++;
  });

  resultCount.textContent = query
    ? `Se encontraron ${visible} ${visible === 1 ? "trámite" : "trámites"} para “${searchInput.value.trim()}”.`
    : `Se muestran ${visible} trámites.`;
  noResults.hidden = visible !== 0;
}

searchInput.addEventListener("input", filterTramites);
clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  filterTramites();
  searchInput.focus();
});

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});
