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