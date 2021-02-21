﻿
const dataUrl = "/images/GetRandomFive"
const getNextFive = async function() {
    const response = await fetch(dataUrl);
    let data = await response.json();

    return data;
}

const initGallery = function() {
    // Select the carousel you'll need to manipulate and the buttons you'll add events to
    const carousel = document.querySelector("[data-target='carousel']");
    const card = carousel.querySelector("[data-target='card']");
    const leftButton = document.querySelector("[data-action='slideLeft']");
    const rightButton = document.querySelector("[data-action='slideRight']");

    // Prepare to limit the direction in which the carousel can slide, 
    // and to control how much the carousel advances by each time.
    // In order to slide the carousel so that only three cards are perfectly visible each time,
    // you need to know the carousel width, and the margin placed on a given card in the carousel
    const carouselWidth = carousel.offsetWidth;
    const cardStyle = card.currentStyle || window.getComputedStyle(card)
    const cardMarginRight = Number(cardStyle.marginRight.match(/\d+/g)[0]);

    // Count the number of total cards you have
    const cardCount = carousel.querySelectorAll("[data-target='card']").length;

    // Define an offset property to dynamically update by clicking the button controls
    // as well as a maxX property so the carousel knows when to stop at the upper limit
    let offset = 0;
    const maxX = -((cardCount / 3) * carouselWidth +
        (cardMarginRight * (cardCount / 3)) -
        carouselWidth - cardMarginRight) + Number(cardStyle.width.match(/\d+/g)[0]);

    // Add the click events
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

initGallery();

const initThumbnails = async () => {
    const set = await getNextFive();

    const carousel = document.querySelector("[data-target='carousel']");
    const cards = carousel.querySelectorAll("[data-target='card']");
    const portratImage = document.querySelector("[data-target='img']");

    for (let i = 0; i < cards.length; i++) {
        var img = document.createElement("img");
        const src = set[i].download_Url;
        img.src = src;
        img.width = 200;
        img.height = 200;

        img.addEventListener("click", function () {
            portratImage.src = src;
        });

        var li = cards[i];
        li.appendChild(img);
    }
};
initThumbnails();

