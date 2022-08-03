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
let successMessage = document.getElementById("success-message");
let retryMessage = document.getElementById("retry-message");
let errorMessage = document.getElementById("error-message");

if (form) {
    form.onsubmit = (event) => {
        console.log(event)

        form.getElementsByTagName("button")[0].disabled = true;

        event.preventDefault(); // Don't let the browser submit the form.
        var payload = {};

        // Build JSON key-value pairs using the form fields.
        form.querySelectorAll("#vote").forEach(field => {
            payload["vote"] = field.value;
        });

        form.querySelectorAll("#email").forEach(field => {
            payload["id"] = field.value;
        });

        form.querySelectorAll("select").forEach(field => {
            let value = field.value.split(";")
            payload["category"] = value[0];
            payload["option"] = value[1];
        });

        grecaptcha.ready(() => {
            grecaptcha.execute('6Le_K_MgAAAAAALWoPR1Me3R3mQAYfNib8LpWIVp', { action: 'submit' }).then((token) => {
                payload['g-recaptcha-response'] = token;
                fetch("https://web-mitbestimmen.azurewebsites.net/api/PostVote", {
                    method: 'post',
                    body: JSON.stringify(payload)
                }).then(resp => {
                    console.log(resp)
                    if (!resp.ok) {
                        console.error(resp);
                        if (resp.status == 400) {
                            retryMessage.style.display = "block";
                            form.style.display = "none";
                        } else {
                            errorMessage.style.display = "block";
                            form.style.display = "none";
                        }
                        return;
                    }
                    // Display success message.
                    successMessage.style.display = "block";
                    form.style.display = "none";
                });
            });
        });
    }
}