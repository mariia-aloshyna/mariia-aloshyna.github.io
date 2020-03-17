var shoppingBag = document.getElementById("shopping__bag__wrapper");
var totalCost = document.getElementById("shopping__state__total__price");
var bagEmptyMessageText = document.getElementById("empty__message__wrapper");
var productObjects = getProductsFromStorage();
initProductContainer(productObjects, shoppingBag);
initTotalCostElement();
var productItems = document.querySelectorAll(".shopping__item__image__wrapper");
var buyButton = document.getElementById("shopping__btn");
var removeItemButtons = document.querySelectorAll(".shopping__item__btn");
var clearBagButton = document.getElementById("shopping__state__empty");

function getProductsFromStorage() {
    let products = [];
    displayMessageIfBagIsEmpty();
    for (let i = 0; i < storage.length; i++) {
        let product = JSON.parse(storage.key(i));
        products.push(product);
    }
    return products;
}

function displayMessageIfBagIsEmpty() {
    let shoppingInfo = document.getElementById("shopping__state");
    if (!storage.length) {
        bagEmptyMessageText.style.display = "flex";
        shoppingInfo.style.display = "none";
    } else {
        bagEmptyMessageText.style.display = "none";
        shoppingInfo.style.display = "flex";
    }
}

function createProductElement(productItem) {
    let productElement = document.createElement("div");
    let productId = document.createElement("span");
    let productImageWrapper = document.createElement("div");
    let productImage = document.createElement("img");
    let productViewBlock = document.createElement("div");
    let productViewText = document.createElement("h3");
    let productInfoBlock = document.createElement("div");
    let productTitle = document.createElement("h6");
    let productPrice = document.createElement("h5");
    let productFiltersBlock = document.createElement("div");
    let productColor = document.createElement("p");
    let productSize = document.createElement("p");
    let productQuantity = document.createElement("p");
    let productButton = document.createElement("button");

    productElement.classList.add("shopping__bag__item");
    productId.classList.add("shopping__item__id");
    productImageWrapper.classList.add("shopping__item__image__wrapper");
    productImage.classList.add("shopping__bag__image");
    productViewBlock.classList.add("shopping__item__view__item");
    productViewText.classList.add("shopping__item__view__item__text");
    productInfoBlock.classList.add("shopping__bag__info");
    productTitle.classList.add("shopping__item__title");
    productPrice.classList.add("shopping__item__price");
    productFiltersBlock.classList.add("shopping__item__filters");
    productColor.classList.add("shopping__item__color");
    productSize.classList.add("shopping__item__size");
    productQuantity.classList.add("shopping__item__quantity");
    productButton.classList.add("shopping__item__btn");

    productImage.setAttribute("alt", "Photo of item");
    productImage.setAttribute("src", productItem.image);

    productId.style.display = "none";

    productTitle.innerHTML = productItem.title;
    productPrice.innerHTML = productItem.price;
    productColor.innerHTML = "Color: " + productItem.color;
    productSize.innerHTML = "Size: " + productItem.size;
    productQuantity.innerHTML = "Quantity: " + getCountOfProduct(JSON.stringify(productItem));
    productButton.innerHTML = "Remove item";
    productViewText.innerHTML = "View more";
    productId.innerHTML = productItem.id;

    productImageWrapper.appendChild(productImage);
    productImageWrapper.appendChild(productViewBlock);
    productImageWrapper.appendChild(productViewText);

    productFiltersBlock.appendChild(productColor);
    productFiltersBlock.appendChild(productSize);
    productFiltersBlock.appendChild(productQuantity);

    productInfoBlock.appendChild(productTitle);
    productInfoBlock.appendChild(productPrice);
    productInfoBlock.appendChild(productFiltersBlock);
    productInfoBlock.appendChild(productButton);

    productElement.appendChild(productId);
    productElement.appendChild(productImageWrapper);
    productElement.appendChild(productInfoBlock);

    return productElement;
}

function initProductContainer(productObjects, shoppingBag) {

    for (let i = 0; i < productObjects.length; i++) {
        let productElement = createProductElement(productObjects[i]);
        shoppingBag.appendChild(productElement);
    }

    return shoppingBag;
}

function initTotalCostElement() {
    let price = getTotalCostOfProductsFromBag();
    totalCost.innerHTML = "£" + price;
}

function addRemoveItemButtonsListeners() {
    for (let i = 0; i < removeItemButtons.length; i++) {
        removeItemButtons[i].onclick = function (event) {
            let target = event.target;
            let productContainer = target.parentNode.parentNode;
            let productId = target.parentNode.parentNode.childNodes[0].innerHTML;
            let productInfoColor = target.previousSibling.childNodes[0].innerHTML;
            let productInfoSize = target.previousSibling.childNodes[1].innerHTML;
            let productInfoQuantity = target.previousSibling.childNodes[2];

            let productColor = productInfoColor.slice(productInfoColor.indexOf(" ") + 1);
            let productSize = productInfoSize.slice(productInfoSize.indexOf(" ") + 1);

            let targetObject = _.filter(productObjects, function (productObject) {
                return productObject.id == productId && productObject.size == productSize &&
                    productObject.color == productColor;
            });
            let quantityInStorage = storage.getItem(JSON.stringify(targetObject[0]));

            if (checkIfProductIsInStore()) {
                storage.setItem(JSON.stringify(targetObject[0]), --quantityInStorage);
                productInfoQuantity.innerHTML = "Quantity: " + getCountOfProduct(JSON.stringify(targetObject[0]));
            } else {
                storage.removeItem(JSON.stringify(targetObject[0]));
                productContainer.parentNode.removeChild(productContainer);
            }
            if (!getProductsFromStorage()) {
                displayMessageIfBagIsEmpty();
            }

            initTotalCostElement();
            reInitBagElement();

            function checkIfProductIsInStore() {
                return parseInt(quantityInStorage) > 1;
            }
        };
    }
}

function addClearButtonListener() {
    clearBagButton.onclick = function () {
        storage.clear();
        shoppingBag.innerHTML = "";
        reInitBagElement();
        displayMessageIfBagIsEmpty();
    };
}

function addProductItemsListeners() {
    for (let i = 0; i < productItems.length; i++) {
        productItems[i].onclick = function () {
            let productId = productItems[i].parentNode.firstElementChild;
            location.href = "item.html" + "?id=" + productId.innerHTML;
        };
    }
}

function addBuyButtonListener() {
    buyButton.onclick = function () {
        storage.clear();
        shoppingBag.innerHTML = "";
        bagEmptyMessageText.firstElementChild.innerHTML = "Thank you for your purchase!";
        reInitBagElement();
        displayMessageIfBagIsEmpty();
    };
}

addProductItemsListeners();
addRemoveItemButtonsListeners();
addClearButtonListener();
addBuyButtonListener();



