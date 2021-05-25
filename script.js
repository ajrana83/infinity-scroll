// Unspalsh API
const count = 10;
const apikey='tEpHjllguJczyU0yv6wCUrYWIsE8RXpKBH45Kuk8fms';
const apiURL = `https://api.unsplash.com/photos/random?client_id=${apikey}&count=${count}`;

// get photo's from unsplashed API
async function getPhotos(){
try {
    const response = await fetch(apiURL);
    const data = await response.json();
    console.log(data);
    
} catch (error) {
    console.log("Error")
}
}

getPhotos();