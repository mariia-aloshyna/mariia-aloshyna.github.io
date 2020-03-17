var storage = localStorage;

var burgerMenuButton = document.querySelector(".mobile-menu");
var mobileMenuElement = document.getElementById("menu__mobile");
var bagTotalPriceElement = document.getElementById("shopping-bag__total-price");
var bagTotalCount = document.getElementById("shopping-bag__total-count");

function reInitBagElement() {
    if (storage.length !== null) {
        updateBagElementValues();
    } else {
        bagTotalPriceElement.innerHTML = "";
        bagTotalCount.innerHTML = "(0)";
    }
}

function updateBagElementValues() {
    let price = getTotalCostOfProductsFromBag();
    let count = getCountOfProductsFromBag();

    bagTotalPriceElement.innerHTML = "£" + price;
    bagTotalCount.innerHTML = "(" + count + ")";

    function getCountOfProductsFromBag() {
        let count = 0;
        for (let i = 0; i < storage.length; i++) {
            let key = storage.key(i);
            count += getCountOfProduct(key);
        }
        return count;
    }
}

function getTotalCostOfProductsFromBag() {
    let price = 0;
    for (let i = 0; i < storage.length; i++) {
        let key = storage.key(i);
        let value = storage.getItem(key);
        let product = JSON.parse(key);
        price += parseFloat(product.price.slice(1)) * parseInt(value);
    }
    return price;
}

function getCountOfProduct(product) {
    return parseInt(storage.getItem(product));
}


function addObjectsToContainer(productObjects, container) {
    for (let i = 0; i < productObjects.length; i++) {
        let productElement = createProductElement(productObjects[i]);
        container.appendChild(productElement);
    }
    return container;
}

function Product(id, title, price, color, size, fashion, productType, brand, image, additionalInfo, additionalClasses) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.color = color;
    this.size = size;
    this.fashion = fashion;
    this.productType = productType;
    this.brand = brand;
    this.image = image;
    this.additionalInfo = additionalInfo;
    this.additionalClasses = additionalClasses;
}

function addMenuButtonListener() {
    burgerMenuButton.onclick = function () {
        mobileMenuElement.style.display = (mobileMenuElement.style.display === 'block') ? 'none' : 'block';
    };
}

function initProductArray() {
    let products = [];
    let id = 0;

    products.push(new Product(++id,
        "Only skinny jeans",
        "£65.00",
        ["Black", "Gold"],
        ["UK 20", "UK 20L"],
        "New Look",
        "Jersey Tops",
        "New Balance",
        "./img/catalog/1.jpg",
        "",
        ""));

    products.push(new Product(++id,
        "Neck Knitted Jumper",
        "£76.25",
        ["Green", "Black", "Gold"],
        ["UK 18"],
        "Nail the 90s",
        "Coats & Jackets",
        "Chi Chi London",
        "./img/catalog/2.jpg",
        "",
        ""));

    products.push(new Product(++id,
        "Turtle Neck Jumper in Rib",
        "£130.25",
        ["Green"],
        ["UK 18", "UK 22S"],
        "Classical style",
        "Coats & Jackets",
        "Antipodium",
        "./img/catalog/3.jpg",
        "New",
        "mobile__hidden"));

    products.push(new Product(++id,
        "With Patchwork Crochet",
        "£80.60",
        ["Red", "Blue", "Gold"],
        ["UK 18", "UK 22S", "UK 20S"],
        "Casual style",
        "Dresses",
        "River Island",
        "./img/catalog/4.jpg",
        "",
        "tablet__hidden"));

    products.push(new Product(++id,
        "Turtle Neck Jumper in Rib",
        "£130.25",
        ["Green"],
        ["UK 18", "UK 22S"],
        "Classical style",
        "Coats & Jackets",
        "Antipodium",
        "./img/catalog/3.jpg",
        "New",
        "mobile__view"));

    products.push(new Product(++id,
        "With Patchwork Crochet",
        "£80.60",
        ["Red", "Blue", "Gold"],
        ["UK 18", "UK 22S", "UK 20S"],
        "Casual style",
        "Dresses",
        "River Island",
        "./img/catalog/4.jpg",
        "",
        "tablet__view"));

    products.push(new Product(++id,
        "Levi’s Jeans for women",
        "",
        ["Blue"],
        ["UK 18L"],
        "Sport",
        "Jeans",
        "Adidas",
        "./img/catalog/5.jpg",
        "More colours",
        ""));

    products.push(new Product(++id,
        "Boyfriend T-Shirt with Bohemian Print",
        "£90.00",
        ["Black", "Green"],
        ["UK 20"],
        "New Look",
        "Jersey Tops",
        "Antipodium",
        "./img/catalog/6.jpg",
        "-25%",
        ""));

    products.push(new Product(++id,
        "Colour Block",
        "£550.50",
        ["Black"],
        ["UK 20L", "UK 22S"],
        "Casual style",
        "Coats & Jackets",
        "Chi Chi London",
        "./img/catalog/7.jpg",
        "",
        ""));

    products.push(new Product(++id,
        "Monki Festval Knitted",
        "£24.75",
        ["Blue"],
        ["UK 18", "UK 22S", "UK 20L"],
        "Vintage",
        "Coats & Jackets",
        "River Island",
        "./img/catalog/8.jpg",
        "",
        ""));

    products.push(new Product(++id,
        "Oversized Cardigan",
        "£90.00",
        ["Gold", "Blue"],
        ["UK 18"],
        "New Look",
        "Dresses",
        "New Balance",
        "./img/catalog/9.jpg",
        "",
        ""));

    products.push(new Product(++id,
        "Paul & Joe Sister Jumper with Neon Trims",
        "£19.75",
        ["Blue"],
        ["UK 18L"],
        "New Look",
        "Jersey Tops",
        "Antipodium",
        "./img/catalog/10.jpg",
        "New",
        ""));

    products.push(new Product(++id,
        "Only Busted Knee Jean",
        "£140.50",
        ["Black"],
        ["UK 22S"],
        "Sport",
        "Coats & Jackets",
        "Adidas",
        "./img/catalog/11.jpg",
        "",
        ""));

    products.push(new Product(++id,
        "Boyfriend T-Shirt with Bohemian Print",
        "£85.75",
        ["Black"],
        ["UK 2"],
        "Nail the 90s",
        "Dresses",
        "Chi Chi London",
        "./img/catalog/12.jpg",
        "",
        ""));

    products.push(new Product(++id,
        "Boyfriend T-Shirt with Bohemian Print",
        "£34.25",
        ["Black"],
        ["UK 22L"],
        "Sport",
        "Coats & Jackets",
        "New Balance",
        "./img/catalog/13.jpg",
        "",
        ""));

    return products;
}

reInitBagElement();
addMenuButtonListener();



