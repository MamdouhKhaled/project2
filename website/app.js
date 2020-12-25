/* Global Variables */

// Parsonal AppKey openweathermap.com
const APPKEY = '8e4f8aff72844a89900adeedc13ef70c';
const BASEURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
// Inputs & Buttons
const Button = document.querySelector('#generate');
const zip = document.querySelector('#zip');
const feelings = document.querySelector('#feelings');
// UI Holder
const content = document.querySelector('#content');
const date = document.querySelector('#date');
const temp = document.querySelector('#temp');
/** helper Function */

const getDate = function () {
    let d = new Date();
    return `${d.getMonth()}-${d.getDate()}-${d.getFullYear()}`;
};
/* Main Function */

// get Weather data Form openweathermap.com web site
const getWeatherData = async function () {
    if (!zip.value)
        return false;
    let url = `${BASEURL}${zip.value}&appid=${APPKEY}`;
    let response = await fetch(url);
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('error', error);
    };
}
// Post Data to our API 
const postWeatherData = async function (url = '', data = {}) {
    let response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data),
    });
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('error', error);
    };
}
// Get All Data Form out API
const getLastWeatherData = async function (url = ''){
    let response = await fetch(url);
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('error', error);
    };
};
// Update UI in Front end
const updateDisplayUI = function () {
    feelings.value = '';
    getLastWeatherData('/all').then((result)=>{
        let data = result.pop();
        temp.innerHTML = data.temp;
        date.innerHTML = data.date;
        content.innerHTML = data.content;
    });
};
/* Event listener */

// Watch Generate Button if click
Button.addEventListener('click', (e) => {
    e.preventDefault();
    getWeatherData().then((data) => {
        if(!data)
            return false;
        postWeatherData('/add', {
            temp: data.main.temp,
            date: getDate(),
            content: feelings.value
        }).then(() => {
            updateDisplayUI('\all');
        });
    }).catch((error) => {
        console.log(error);
    })
})