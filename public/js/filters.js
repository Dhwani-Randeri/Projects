const scrollContainer = document.querySelector(".filters-scroll");
const leftBtn = document.querySelector(".left-btn");
const rightBtn = document.querySelector(".right-btn");

rightBtn.addEventListener("click", () => {
    scrollContainer.scrollBy({ left: 300, behavior: "smooth" });
});

leftBtn.addEventListener("click", () => {
    scrollContainer.scrollBy({ left: -300, behavior: "smooth" });
});