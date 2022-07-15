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

function onSubmit(token) {
    document.getElementById("form").submit();
}

let form = document.getElementById("form");
if (form) {
    form.onsubmit = function (event) {
        event.preventDefault(); // Don't let the browser submit the form.
        var payload = {};

        // Build JSON key-value pairs using the form fields.
        form.querySelectorAll("input, textarea").forEach(field => {
            payload[field.name] = field.value;
        });

        console.log(payload)

        if (payload["g-recaptcha-response"].length == 0) {
            recaptchaMessage.style.display = "block";
        } else {
            // Post the payload to the contact endpoint.
            fetch("/api/PostStimme", {
                method: 'post',
                body: JSON.stringify(payload)
            }).then(resp => {
                if (!resp.ok) {
                    console.error(resp);
                    return;
                }
                // Display success message.
                recaptchaMessage.style.display = "none";
                successMessage.style.display = "block";
                form.style.display = "none";
            });
        }
    }
}