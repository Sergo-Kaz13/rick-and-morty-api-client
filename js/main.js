let activeUrl = "character";
let activePage = 1;
let numberOfPages = 0;

requestApi(`https://rickandmortyapi.com/api/${activeUrl}`);

function requestApi(categoryData) {
    fetch(categoryData).then((res) =>
        res.json().then((data) => showDataRequestApi(data))
    );
}

function showDataRequestApi(dataRequest) {
    const contentBlock = document.querySelector(".content_block");

    numberOfPages = dataRequest.info.pages;

    addPagination(dataRequest.info);

    contentBlock.innerHTML = "";

    if (activeUrl === "character") {
        dataRequest.results.forEach((item) => {
            const { id, name, image } = item;

            contentBlock.innerHTML += `
                <div class="character_item" id="${id}">
                    <img src="${image}" alt="${name}" />
                    <h2 class="character_name">${name}</h2>
                </div>
            `;
        });
    } else if (activeUrl === "location") {
        const locationList = document.createElement("ul");
        locationList.classList.add("location_list");

        dataRequest.results.forEach((item) => {
            const { id, name } = item;

            const location = document.createElement("li");
            location.textContent = name;
            location.id = id;
            locationList.append(location);
        });

        contentBlock.append(locationList);
    }
}

// todo __________________pagination____________________

const btnPrev = document.querySelector("#prev");
const btnNext = document.querySelector("#next");

btnPrev.addEventListener("click", (e) => defineTheActivePage(e));
btnNext.addEventListener("click", (e) => defineTheActivePage(e));

function defineTheActivePage(button) {
    button = button.target.textContent;

    if (button != "...") {
        if (button === "next" && activePage < numberOfPages) {
            activePage++;
        } else if (button === "prev" && activePage > 1) {
            activePage--;
        } else if (+button) {
            activePage = +button;
        }

        requestApi(
            `https://rickandmortyapi.com/api/${activeUrl}?page=${activePage}`
        );
    }
}

function returnsTheActivePage(numberPage) {
    numberPage = +numberPage.target.textContent;

    if (numberPage) {
        activePage = numberPage;
        requestApi(
            `https://rickandmortyapi.com/api/${activeUrl}?page=${activePage}`
        );
    }
}

function addPagination({ pages }) {
    const paginarionBlock = document.querySelector(".pagination_block");
    paginarionBlock.addEventListener("click", (e) => returnsTheActivePage(e));

    let paginationBlockContent = "";

    if (activePage > pages - 3) {
        paginationBlockContent += `
            <li>1</li>
            <li>...</li>
            `;
    }

    for (let i = 1; i <= pages; i++) {
        if (activePage <= pages - 4 && i === pages - 1) {
            paginationBlockContent += `<li class="dots">...</li>`;
        }

        if ((i <= 6 && activePage < 5) || i === pages) {
            if (activePage !== i) {
                paginationBlockContent += `<li>${i}</li>`;
            } else {
                paginationBlockContent += `<li class="active_number_page">${i}</li>`;
            }
        } else if (activePage === i && activePage < pages - 2) {
            paginationBlockContent += `
            <li>1</li>
            <li class="dots">...</li>
            <li>${activePage - 2}</li>
            <li>${activePage - 1}</li>
            <li class="active_number_page">${activePage}</li>
            <li>${activePage + 1}</li>
            <li>${activePage + 2}</li>
            `;
        } else if (activePage > pages - 3 && i > pages - 6) {
            if (i === activePage) {
                paginationBlockContent += `<li class="active_number_page">${i}</li>`;
            } else {
                paginationBlockContent += `<li>${i}</li>`;
            }
        }
    }

    paginarionBlock.innerHTML = paginationBlockContent;
}

// todo! ___________pagination the end_____________

// todo ____________ menu _________________

const headerMenu = document.querySelector(".header_menu");
headerMenu.addEventListener("click", (e) => changeActiveUrl(e));

function changeActiveUrl(url) {
    url = url.target.textContent.slice(0, -1);
    activeUrl = url;

    requestApi(`https://rickandmortyapi.com/api/${activeUrl}`);
}

// todo! ____________ menu the end _________________
