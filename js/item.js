var sizeButtons = document.getElementsByClassName("item__info__size__value");
var colorButtons = document.getElementsByClassName("item__info__color__value");
var addToBagButton = document.getElementById("item__btn");
var URI = decodeURIComponent(window.location.search);

function getProductByIdFromURI(URI, productObjects) {
    let objectId = URI.slice(URI.indexOf("=") + 1);
    return _.find(productObjects, ["id", parseInt(objectId)]);
}

function initProductItem(receivedObject) {
    let itemTitle = document.querySelector(".item__info__headline");
    let itemPrice = document.querySelectorAll(".item__info__price");
    let itemFilterSizeBlock = document.querySelector(".item__info__size");
    let itemFilterColorBlock = document.querySelector(".item__info__color");
    let productSizes = receivedObject.size;
    let productColors = receivedObject.color;

    itemTitle.innerHTML = receivedObject.title;
    for (let i = 0; i < itemPrice.length; i++) {
        itemPrice[i].innerHTML = receivedObject.price;
    }

    productSizes.forEach(function (item) {
        createSizeElement(itemFilterSizeBlock, item);
    });

    productColors.forEach(function (item) {
        createColorElement(itemFilterColorBlock, item);
    });

    function createSizeElement(parent, sizeValue) {
        let sizeElement = document.createElement("div");
        sizeElement.classList.add("item__info__size__value", "size__block");
        sizeElement.innerText = sizeValue;
        parent.appendChild(sizeElement);
    }

    function createColorElement(parent, colorValue) {
        let colorElement = document.createElement("div");
        colorElement.classList.add("item__info__color__value", "color__block");
        colorElement.innerText = colorValue;
        parent.appendChild(colorElement);
    }
}


function setBorderHighlightEventsOnButtons(buttons) {
    for (let i = 0; i < buttons.length; i++) {
        buttons.item(i).onclick = function (event) {
            let target = event.target;
            let classRemoved = removeClassIfExists(target, "checked__item");
            if (!classRemoved) {
                highlightButtonBorder(buttons, target);
            }
            return target;
        }
    }

    function highlightButtonBorder(buttons, target) {
        removeClassIfExistsFromArray(buttons, "checked__item");
        target.classList.add("checked__item");
    }
}

function replacePhotos() {
    let thumbnailPhotos = document.getElementsByClassName("item__picture--thumb");
    let mainPhoto = document.getElementById("item__photos--full").childNodes;
    for (let i = 0; i < thumbnailPhotos.length; i++) {
        thumbnailPhotos.item(i).onclick = function (event) {
            removeClassIfExistsFromArray(thumbnailPhotos, "active__picture");
            let target = event.target;
            mainPhoto[1].src = target.src;
            target.classList.add("active__picture");
        }
    }
}

function removeClassIfExists(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className);
        return true;
    }
    return false;
}

function removeClassIfExistsFromArray(arrayElements, className) {
    for (let i = 0; i < arrayElements.length; i++) {
        removeClassIfExists(arrayElements.item(i), className);
    }
}

function showCannotFindItemMessage() {
    let container = document.querySelector(".item__wrapper");
    container.innerHTML = "";
    container.appendChild(createMessage());

    function createMessage() {
        let messageBlock = document.createElement("div");
        messageBlock.className = "no__item__message";
        messageBlock.innerText = "Ooops... Couldn't find the item";
        return messageBlock;
    }
}


var productObjects = initProductArray();
var query = URI.substring(1);
var receivedObject = getProductByIdFromURI(query, productObjects);

if (receivedObject) {
    initProductItem(receivedObject);
    setBorderHighlightEventsOnButtons(sizeButtons);
    setBorderHighlightEventsOnButtons(colorButtons);
    replacePhotos();
} else {
    showCannotFindItemMessage();
}

function copy(object) {
    let copy = {};
    for (let property in object) {
        copy[property] = object[property];
    }
    return copy;
}

addToBagButton.onclick = function () {
    let selectedFilters = document.querySelectorAll(".checked__item");
    let errorMessage = document.querySelector(".item__info__error");

    if (selectedFilters.length <= 1) {
        errorMessage.style.display = "block";
        return;
    }
    errorMessage.style.display = "none";
    let selectedSize = selectedFilters[0].innerHTML;
    let selectedColor = selectedFilters[1].innerHTML;
    let currentObject = copy(receivedObject);
    // let currentObject = Object.assign({}, receivedObject);
    currentObject.size = selectedSize;
    currentObject.color = selectedColor;
    let product = JSON.stringify(currentObject);
    store(product);
    updateBagElementValues();

    function store(product) {
        let value = storage.getItem(product);
        if (value == null) {
            storage.setItem(product, "1");
        } else {
            let newCount = parseInt(value) + 1;
            storage.setItem(product, newCount.toString());
        }
    }
};