document.addEventListener("DOMContentLoaded", function () {
    let currentPage = window.location.pathname.split("/").pop().replace(".html", "");
    let navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach(function (link) {
        let linkHref = link.getAttribute("href").replace(".html", "");
        link.classList.remove("red", "green", "blue");
        if (linkHref === currentPage) {
            if (currentPage === "index") {
                link.classList.add("red");
            } else if (currentPage === "tutorial") {
                link.classList.add("green");
            } else if (currentPage === "implementacion") {
                link.classList.add("blue");
            }
        }
    });
});


