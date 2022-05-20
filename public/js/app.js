// refresh matches page at every 5 seconds to show updated matches
// window.onload = function () {
//     if (window.location.href.indexOf('/matches') > -1) {
//         setTimeout(function () {
//             location.reload(true);
//         }, 5000);
//     }
// }
const updateBtn = document.getElementById('update');
const popUp = document.querySelector('.popup');

const form = document.querySelector('.formDetail');
const formHome = document.querySelector('.formHome')


if (window.location.href.indexOf('/match/') > -1) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        popUp.classList.add('show');
        setTimeout(() => form.submit(), 2000);
    });
}

if (window.location.href.indexOf('/home') > -1) {
    formHome.addEventListener('submit', (e) => {
        e.preventDefault();
        popUp.classList.add('show');
        setTimeout(() => formHome.submit(), 1000);
    });
}



const matches = document.querySelectorAll('.match')

for (let i = 0; i < matches.length; i++) {
    var img = matches[i].getElementsByTagName('img')[0];
    var img2 = matches[i].getElementsByTagName('img')[1];

    var clubName = matches[i].getElementsByClassName('club')[0]
    var clubName2 = matches[i].getElementsByClassName('club')[1]

    const name = clubName.innerHTML
    const teamName = name.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim()
    const teamNameDash = teamName.split(" ").join("-")
    img.src = `https://uefaclubs.com/images/${teamNameDash}.png`

    const name2 = clubName2.innerHTML
    const teamName2 = name2.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim()
    const teamNameDash2 = teamName2.split(" ").join("-")
    img2.src = `https://uefaclubs.com/images/${teamNameDash2}.png`

}