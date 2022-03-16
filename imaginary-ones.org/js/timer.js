function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function getRdm(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

/*

    configure here

*/
let maxNumber = 8888;

const startCounter = getRdm(5000, 6000);
const endCounter = getRdm(maxNumber - 200, maxNumber);

let mintNumber = getCookie('mintNumber');
if (mintNumber) mintNumber = parseInt(mintNumber);
else {
    setCookie('mintNumber', startCounter, 365);
    mintNumber = parseInt(getCookie('mintNumber'));
}
document.getElementById('mint-count').innerHTML = `Limited sale :&nbsp; <span id="mint-value">${mintNumber}</span>&nbsp;/ ${maxNumber}`

const add = () => {
    let count = parseInt(document.getElementById('mint-value').innerText);
    if (count < endCounter) setCount(count + 1);
}

function setCount(count) {
    document.getElementById('mint-count').innerHTML = `Limited sale :&nbsp; <span id="mint-value">${count}</span>&nbsp;/ ${maxNumber}`
    setCookie('mintNumber', count, 365);
    // document.getElementById('mint-count').innerHTML = `<span>${count}</span> / ${maxNumber}<br />` // lol
}

function DoCount() {
    const randomTime = getRdm(150, 500);
    setTimeout(async () => {
        const random = Math.random();
        let rn = 0;
        if (random > 0.5) {
            if (random <= 0.7) {
                //2-4
                rn = getRdm(2, 4)
            } else if (random <= 0.9) {
                //4-6
                rn = getRdm(4, 6)
            } else {
                //6-11
                rn = getRdm(6, 11)
            }
        }
        for (let i = 0; i < rn; i++) {
            add();
            await sleep(getRdm(110, 300))
        }
        DoCount();
    }, randomTime)
}
DoCount()