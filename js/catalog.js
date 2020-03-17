var filterPanel = document.getElementById("filter");
var filterValuesDesktop = document.querySelectorAll(".filter__button__dropdown");
var filterValuesTablet = document.querySelectorAll(".category__item");
var filterContainerTablet = document.getElementById("category--tablet");
var catalogTopLineBlock = document.getElementById("catalog__items__wrapper--top");
var catalogBottomLineBlock = document.getElementById("catalog__items__wrapper--bottom");
var glassIcon = document.querySelector(".tablet__glass");
var selectedFilterValues = {};
var objectFieldMap = {
    "Fashion": "fashion",
    "Product type": "productType",
    "Color": "color",
    "Brand": "brand",
    "Size": "size",
    "Price rang": "price"
};

function createProductElement(productObject) {
    let productElement = document.createElement("figure");
    let productImageWrapper = document.createElement("div");
    let productImage = document.createElement("img");
    let productViewBlock = document.createElement("div");
    let productViewText = document.createElement("h3");
    let productTitle = document.createElement("h4");
    let productId = document.createElement("span");
    let productPrice = initProductPriceElement(productObject.additionalInfo, productObject.price);

    productElement.classList.add("catalog__item");
    if (productObject.additionalClasses.length !== 0) {
        productElement.classList.add(productObject.additionalClasses);
    }

    productImageWrapper.classList.add("catalog__item__image__wrapper");
    productImage.classList.add("catalog__item__image");
    productViewBlock.classList.add("catalog__item__view__item");
    productViewText.classList.add("catalog__item__view__item__text");
    productTitle.classList.add("catalog__item__title");
    productPrice.classList.add("catalog__item__price");
    productId.classList.add("catalog__item__id");

    productImage.setAttribute("alt", "Image of catalog item");
    productImage.setAttribute("src", productObject.image);

    productId.style.display = "none";

    productTitle.innerHTML = productObject.title;
    productViewText.innerHTML = "View item";
    productId.innerHTML = productObject.id;

    productImageWrapper.appendChild(productImage);
    productImageWrapper.appendChild(productViewBlock);
    productImageWrapper.appendChild(productViewText);

    productElement.appendChild(productId);
    productElement.appendChild(productImageWrapper);
    productElement.appendChild(productTitle);
    productElement.appendChild(productPrice);

    return productElement;

    function initProductPriceElement(additionalInfo, itemPrice) {
        let percentRegexp = "-\\d+%";
        let productPriceElement = document.createElement("p");
        let currentPriceElement = initCurrentPriceElement();

        productPriceElement.appendChild(currentPriceElement);

        if (!additionalInfo.match(percentRegexp)) {
            let additionalInfoElement = initAdditionalInfoElement();

            productPriceElement.appendChild(additionalInfoElement);
            return productPriceElement;
        }

        let percents = parseInt(additionalInfo.replace("-", "").replace("%", ""));
        let oldPriceElement = initOldPriceElement();
        let percentsElement = initPercentsElement();

        productPriceElement.insertBefore(percentsElement, currentPriceElement);
        productPriceElement.insertBefore(oldPriceElement, percentsElement);
        return productPriceElement;

        function initCurrentPriceElement() {
            let currentPriceElement = document.createElement("span");
            currentPriceElement.classList.add("catalog__item__price");
            currentPriceElement.innerHTML = itemPrice;
            return currentPriceElement;
        }

        function initAdditionalInfoElement() {
            let additionalInfoElement = document.createElement("span");
            additionalInfoElement.classList.add("catalog__additive__info__text");
            additionalInfoElement.classList.add("text__color--gray");
            additionalInfoElement.innerHTML = additionalInfo;
            return additionalInfoElement;
        }

        function initOldPriceElement() {
            let oldPriceElement = document.createElement("span");
            let currentPrice = parseInt(itemPrice.replace("£", ""));
            oldPriceElement.classList.add("catalog__item__price", "text__color--gray");
            oldPriceElement.innerHTML = "£" + (currentPrice * 100 / (100 - percents)).toFixed(2);
            return oldPriceElement;
        }

        function initPercentsElement() {
            let percentsElement = document.createElement("span");
            percentsElement.classList.add("catalog__additive__info__text", "text__color--gray");
            percentsElement.innerHTML = "-" + percents.toString() + "%";
            return percentsElement;
        }
    }
}

function hideElements(elements) {
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    }
}

function showElements(productItems, filteredProducts) {
    for (let i = 0; i < productItems.length; i++) {
        const productIdElement = productItems[i].firstChild;
        for (let j = 0; j < filteredProducts.length; j++) {
            if (filteredProducts[j].id.toString() === productIdElement.innerHTML) {
                let itemClassList = productItems[i].classList;
                if (!itemClassList.contains("tablet__view") && !itemClassList.contains("mobile__view")) {
                    productItems[i].style.display = "block";
                }
            }
        }
    }
}

function filterProductElements(productObjects, selectedFilterValues) {
    return _.filter(productObjects, function (productObject) {
        for (let selectedFilterValue in selectedFilterValues) {
            let objectField = transformToObjectField(selectedFilterValue);
            if (typeof productObject[objectField] !== "object") {
                if (objectField === "price") {
                    return isPriceInRange(productObject, selectedFilterValues[selectedFilterValue]);
                } else if (productObject[objectField] !== selectedFilterValues[selectedFilterValue]) {
                    return false;
                }
            } else {
                if (productObject[objectField].indexOf(selectedFilterValues[selectedFilterValue]) === -1) {
                    return false;
                }
            }
        }
        return true;
    });

    function isPriceInRange(productObject, range) {
        let productPrice = parseFloat(productObject.price.replace("£", ""));
        while (range.indexOf("£") !== -1) {
            range = range.replace("£", "");
        }

        if (range.indexOf("-") !== -1) {
            let boundsArray = range.split("-");
            return productPrice >= parseFloat(boundsArray[0]) && productPrice <= parseFloat(boundsArray[1])
        } else {
            if (range.indexOf("To") !== -1) {
                return productPrice <= parseFloat(range.replace("To ", ""));
            }
            if (range.indexOf("From") !== -1) {
                return productPrice >= parseFloat(range.replace("From ", ""));
            }
        }
    }

    function transformToObjectField(selectedFilterValue) {
        return objectFieldMap[selectedFilterValue];
    }
}

function initFilterValuesListeners(values) {
    for (let i = 0; i < values.length; i++) {
        values[i] = onClickFilterFunction(values[i]);
    }
}

function initProductItemsListeners() {
    for (let i = 0; i < productItems.length; i++) {
        productItems[i].onclick = function () {
            let productIdElement = this.firstChild;
            location.href = "item.html" + "?id=" + productIdElement.innerHTML;
        };
    }
}

filterPanel.onclick = function () {
    if (filterContainerTablet.classList.contains("tablet__hidden")) {
        filterContainerTablet.classList.replace("tablet__hidden", "tablet__view");
    } else {
        filterContainerTablet.classList.replace("tablet__view", "tablet__hidden");
    }
};

function addGlassIconListener() {
    glassIcon.onclick = function () {
        let search__input = glassIcon.previousElementSibling;
        if (!search__input.style.display || search__input.style.display === "none") {
            search__input.style.display = "block";
        } else {
            search__input.style.display = "none";
        }
    };
}

var onClickFilterFunction = function (item) {
    item.onclick = function (event) {
        let target = event.target;
        let selectedFilterValue = target.innerText;
        let products = document.querySelectorAll(".catalog__item");

        let selectedFilterValueElement = target.parentElement.parentElement.children[0].children[1];
        let filterTitle = target.parentElement.parentElement.children[0].children[0].innerText;

        if (selectedFilterValue === "Not selected") {
            delete selectedFilterValues[filterTitle];
            selectedFilterValueElement.innerText = "";
        } else {
            selectedFilterValueElement.innerText = selectedFilterValue;
            selectedFilterValues[filterTitle] = selectedFilterValue;
        }

        let filteredProducts = filterProductElements(productObjects, selectedFilterValues);
        hideElements(products);
        showElements(products, filteredProducts);
    }
};

addGlassIconListener();

var productObjects = initProductArray();
var topProducts = productObjects.slice(0, 4);
var bottomProducts = productObjects.slice(4, 14);
addObjectsToContainer(topProducts, catalogTopLineBlock);
addObjectsToContainer(bottomProducts, catalogBottomLineBlock);
initFilterValuesListeners(filterValuesTablet);
initFilterValuesListeners(filterValuesDesktop);

var productItems = document.querySelectorAll(".catalog__item");
initProductItemsListeners();


