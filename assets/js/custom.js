document.addEventListener('DOMContentLoaded', () => {
    setMinHeight();
}, false);

function setMinHeight() {
    let content = document.getElementById("content")
    if (content) {
        let footer = document.getElementsByTagName("footer")[0]
        let header = document.getElementsByClassName("page-header")[0]
        content.style.minHeight = window.innerHeight - footer.clientHeight - header.clientHeight + "px"
    }
}
