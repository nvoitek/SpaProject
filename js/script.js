let icons = document.querySelectorAll(".social-link");

for (let icon of icons) {
    icon.addEventListener('mouseover', e => {
        let i = icon.querySelector(".social-icon");
        i.classList.add("fa-inverse");
    });

    icon.addEventListener('mouseleave', e => {
        let i = icon.querySelector(".social-icon");
        i.classList.remove("fa-inverse");
    });
}

let form = document.querySelector("#appointment-form");

let errorMsg = document.querySelector("#appointment-failed");
let notes = document.querySelector("#notes");

let fname = document.querySelector("#name");
let email = document.querySelector("#email");
let tel = document.querySelector("#tel");
let selService = document.querySelector("#sel-service");
let date = document.querySelector("#date");
let time = document.querySelector("#time");

let inputs = [fname, email, tel, selService, date, time];

for (let input of inputs) {
    input.addEventListener('input', e => {
        if (e.target.value == '') {
            input.classList.add("invalid");
        }
        else {
            input.classList.remove("invalid");
        }
    });
}

form.addEventListener('submit', e => {

    const validate = () => {
        let valid = true;

        for (let input of inputs) {
            if (input.value == '') {
                input.classList.add("invalid");
                valid = false;
            }
        }

        if (!valid)
            errorMsg.classList.add("visible");

        return valid;
    };

    let payload = {
        name: fname.value, 
        email: email.value,
        service: selService.value,
        phone: tel.value,
        date: date.value,
        time: time.value,
        message: notes.value
    };

    const submit = () => {
        fetch('https://akademia108.pl/api/ajax/post-appointment.php', {
            method: 'POST', // or 'PUT'
            headers: {
            'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then(response => response.json())
        .then(data => {
            if (data.errors) {
                throw Error(data.messages[0]);
            }
            return data;
        })
        .then((data) => {
            console.log(data);
            let okMsg = document.createElement('p');
            okMsg.innerText = `Dziękujemy ${fname.value}`;
            form.appendChild(okMsg);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    };

    if (!validate()) {
        e.preventDefault();
    }
    else {
        submit();
        e.preventDefault();
    }
});