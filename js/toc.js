document.addEventListener("DOMContentLoaded", function () {
    const tocList = document.getElementById("toc-list");
    const mainSections = document.querySelectorAll('main section');
    mainSections.forEach((section) => {
        const sectionTitle = section.querySelector('h2');
        const sectionId = section.getAttribute('id');

        if (sectionTitle && sectionId) {
            const tocItem = document.createElement('li');
            const tocLink = document.createElement('a');

            tocLink.textContent = sectionTitle.textContent;
            tocLink.setAttribute('href', `#${sectionId}`);

            tocItem.appendChild(tocLink);
            tocList.appendChild(tocItem);
        }
    });
});
