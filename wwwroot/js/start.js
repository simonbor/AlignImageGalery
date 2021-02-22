const delay = 30; // delay between reloads in sec
const imgGallery = new imageGallery();
let interval = setInterval(imgGallery.loadImages, 1000 * delay); // set circle gallery reload

// set next reload only after idle of delay time (bonus)
const gallery = document.querySelector("[data-target='gallery']");
gallery.addEventListener('mousemove', e => {
    clearInterval(interval);
    interval = setInterval(imgGallery.loadImages, 1000 * delay);
});

// create gallery and load images
imgGallery.initGallery();
imgGallery.loadImages();
