window.onscroll = function () { scrollFunction() };

document.addEventListener('DOMContentLoaded', () => {
    setCopyright();
}, false);

function setCopyright() {
    document.getElementById("copyright").innerText = "© " + new Date().getFullYear() + " " + document.getElementById("copyright").innerText;
}