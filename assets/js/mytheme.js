window.onscroll = function () { scrollFunction() };

document.addEventListener('DOMContentLoaded', () => {
    setCopyright();
    setHeaderSpace();
}, false);

function setCopyright() {
    document.getElementById("copyright").innerText = "© " + new Date().getFullYear() + " " + document.getElementById("copyright").innerText;
}

function scrollFunction() {
    if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
        document.getElementById("header-img").classList.add("header-logo-small");
        document.getElementById("header-img").classList.remove("header-logo-big");
    } else {
        document.getElementById("header-img").classList.add("header-logo-big");
        document.getElementById("header-img").classList.remove("header-logo-small");
    }
}
