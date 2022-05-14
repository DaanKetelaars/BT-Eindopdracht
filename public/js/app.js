// refresh matches page at every 5 seconds to show updated matches
window.onload = function () {
    if (window.location.href.indexOf('/matches') > -1) {
        setTimeout(function () {
            location.reload(true);
        }, 5000);
    }
}

var href = window.location.href.split('/')
href[href.length - 1];

// // on submit of update show alert for user to be certain to update match
if (window.location.href == 'http://localhost:8081/match/') {
    const form = document.querySelector(".formDetail");
    form.addEventListener('submit', function () {
        if (confirm('Weet je zeker dat je de match wil updaten?')) {} else {}
    })
}