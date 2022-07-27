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
    form.onsubmit = (event) => {
        console.log(event)
        event.preventDefault(); // Don't let the browser submit the form.
        var payload = {};

        // Build JSON key-value pairs using the form fields.
        form.querySelectorAll("input, select").forEach(field => {
            payload[field.name] = field.value;
        });

        console.log(payload)

        grecaptcha.ready(() => {
            grecaptcha.execute('6Le_K_MgAAAAAALWoPR1Me3R3mQAYfNib8LpWIVp', { action: 'submit' }).then((token) => {
                payload['g-recaptcha-response'] = token;
                console.log("recaptcha successful", token);
                fetch("https://web-mitbestimmen.azurewebsites.net/api/PostVote", {
                    method: 'post',
                    body: JSON.stringify(payload)
                }).then(resp => {
                    console.log(resp)
                    if (!resp.ok) {
                        console.error(resp);
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