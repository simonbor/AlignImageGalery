
const initGallery = function() {
    // carousel and the buttons to add events to
    const carousel = document.querySelector("[data-target='carousel']");
    const card = carousel.querySelector("[data-target='card']");
    const leftButton = document.querySelector("[data-action='slideLeft']");
    const rightButton = document.querySelector("[data-action='slideRight']");

    // get the carousel width and the margin placed on a given card in the carousel
    const carouselWidth = carousel.offsetWidth;
    const cardStyle = card.currentStyle || window.getComputedStyle(card)
    const cardMarginRight = Number(cardStyle.marginRight.match(/\d+/g)[0]);

    // Count the number of total cards
    const cardCount = carousel.querySelectorAll("[data-target='card']").length;

    // Define an offset property and maxX property so the carousel knows when to stop
    let offset = 0;
    const maxX = -((cardCount / 3) * carouselWidth +
        (cardMarginRight * (cardCount / 3)) -
        carouselWidth - cardMarginRight) + Number(cardStyle.width.match(/\d+/g)[0]);

    // arrow buttons events
    leftButton.addEventListener("click", function () {
        if (offset < 0) {
            offset += Number(cardStyle.width.match(/\d+/g)[0]) + cardMarginRight;
            carousel.style.transform = `translateX(${offset}px)`;
        }
    })
    rightButton.addEventListener("click", function () {
        if (offset > maxX) {
            offset -= Number(cardStyle.width.match(/\d+/g)[0]) + cardMarginRight;
            carousel.style.transform = `translateX(${offset}px)`;
        }
    })
}

let setNum = 0;
const dataUrl = "/images/GetRandomFive"
const getNextFive = async function () {
    const response = await fetch(dataUrl + `?set=${++setNum}`);
    return await response.json();
}

const initThumbnails = async () => {
    const set = await getNextFive();

    const carousel = document.querySelector("[data-target='carousel']");
    const cards = carousel.querySelectorAll("[data-target='card']");
    const portratImage = document.querySelector("[data-target='img']");
    const authorStrip = document.querySelector("[data-target='author']");

    for (let i = 0; i < cards.length; i++) {
        const src = set[i].download_Url;
        const author = set[i].author;

        var img = document.createElement("img");
        img.src = src;
        img.width = 200;
        img.height = 200;

        img.addEventListener("click", function () {
            portratImage.src = src;
            authorStrip.innerHTML = author;
        });

        cards[i].innerHTML = '';
        cards[i].appendChild(img);

        i === 2 && img.click();
    }
};

const gallery = document.querySelector("[data-target='gallery']");
let interval;
const delay = 30;

gallery.addEventListener('mousemove', e => {
    clearInterval(interval);
    interval = setInterval(initThumbnails, 1000 * delay);
});

initGallery();
initThumbnails();
interval = setInterval(initThumbnails, 1000 * delay);

