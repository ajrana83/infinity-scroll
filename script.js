
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let isInitialLoad = true;
let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unspalsh API
let initialCount = 5;
const apikey='tEpHjllguJczyU0yv6wCUrYWIsE8RXpKBH45Kuk8fms';
let apiURL = `https://api.unsplash.com/photos/random?client_id=${apikey}&count=${initialCount}`;

// change the images count id API
function updateAPIURLWithNewCount(picCount){
    apiURL = `https://api.unsplash.com/photos/random?client_id=${apikey}&count=${picCount}`;
}

// check if all images are loaded
function imageLoaded(){
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready=', ready);
    }
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes){
    for (const key in attributes) {
            element.setAttribute(key, attributes[key]);  
        }
    }

// Create elements for links and photos , Add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('totalImages', totalImages);
    // run funtion for each photo in the array
    photosArray.forEach((photo) => {
        // Creating an <a> element to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img> for a photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // put <img> inside <a> and then both inside <image-container> element
        // Event Listener , when image is finished loading
        img.addEventListener('load', imageLoaded());
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// get photo's from unsplashed API
async function getPhotos(){
try {
    const response = await fetch(apiURL);
    photosArray = await response.json();
    displayPhotos();
    if (isInitialLoad) {
        updateAPIURLWithNewCount(20);
        isInitialLoad = false;
    }
    
} catch (error) {
    // catch error here
    console.log("Error", error)
}
}

// check to see if scrolling near bottom page, load more photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
        console.log('load more', window.innerHeight, window.scrollY, document.body.offsetHeight, document.body.offsetHeight - 1000);
    }
});

// On Load
getPhotos();