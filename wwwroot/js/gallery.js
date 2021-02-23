
// inspired by https://medium.com/@magyarn/simple-carousel-with-vanilla-js-3dd10a143ff2
const imageGallery = function () {
    const carousel = document.querySelector("[data-target='carousel']");
    const dataUrl = "/images/GetRandomFive";
    let setNum = 0;

    const getNextFive = async function () {
        setNum = setNum > 19 ? 0 : setNum;
        const response = await fetch(dataUrl + `?set=${++setNum}`);
        return await response.json();
    }

    const initGallery = function() {
        // carousel and the buttons to add events to
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

    // get next set and populate galery
    const loadImages = async function() {
        const cards = carousel.querySelectorAll("[data-target='card']");
        const portratImage = document.querySelector("[data-target='img']");
        const authorStrip = document.querySelector("[data-target='author']");
        const set = await getNextFive();

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

            // load third image by default
            i === 2 && img.click();
        }
    }

    return {
        initGallery: initGallery,
        loadImages: loadImages
    }
}
