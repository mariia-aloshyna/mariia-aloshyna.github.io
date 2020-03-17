const SLIDER_TIMER_INTERVAL = 10000;

var mainContent = document.getElementById("main");
var arrowLeft = document.querySelector(".slider__arrow--left");
var arrowRight = document.querySelector(".slider__arrow--right");
var dots = document.getElementsByClassName("slider__scroll__dot");
var arrivalsContent = document.querySelector(".arrivals__items");
var currentSlideIndex = 1;
var timerId = initSliderTimer();

var productObjects = initProductArray();
var arrivalObjects = [productObjects[2], productObjects[14], productObjects[10], productObjects[1]];

function showNextSlide() {
    showSlide(++currentSlideIndex);
}

function showSlide(slideIndex) {
    let slides = document.getElementsByClassName("slider__slide__image");

    if (slideIndex > slides.length) {
        currentSlideIndex = 1;
    }

    if (slideIndex < 1) {
        currentSlideIndex = slides.length;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

    slides[currentSlideIndex - 1].style.display = "block";
    dots[currentSlideIndex - 1].classList.add("active");
}

function initSliderTimer() {
    return setInterval(function () {
        showNextSlide();
    }, SLIDER_TIMER_INTERVAL);
}

function createProductElement(productItem) {
    let productElement = document.createElement("figure");
    let productImageWrapper = document.createElement("div");
    let productImage = document.createElement("img");
    let productViewBlock = document.createElement("div");
    let productViewText = document.createElement("h3");
    let productTitle = document.createElement("h4");
    let productID = document.createElement("span");
    let productPrice = document.createElement("p");

    productElement.classList.add("arrivals__item");

    productImageWrapper.classList.add("arrivals__item__image__wrapper");
    productImage.classList.add("arrivals__item__image");
    productViewBlock.classList.add("arrivals__item__view__item");
    productViewText.classList.add("arrivals__item__view__item__text");
    productTitle.classList.add("arrivals__item__title");
    productPrice.classList.add("arrivals__item__price");
    productID.classList.add("arrivals__item__id");

    productImage.setAttribute("alt", "Arrival's photo");
    productImage.setAttribute("src", productItem.image);

    productID.style.display = "none";

    productTitle.innerHTML = productItem.title;
    productViewText.innerHTML = "View item";
    productPrice.innerHTML = productItem.price;
    productID.innerHTML = productItem.id;

    productImageWrapper.appendChild(productImage);
    productImageWrapper.appendChild(productViewBlock);
    productImageWrapper.appendChild(productViewText);

    productElement.appendChild(productID);
    productElement.appendChild(productImageWrapper);
    productElement.appendChild(productTitle);
    productElement.appendChild(productPrice);

    return productElement;
}

function addMainContentDelegatedListener() {
    mainContent.onclick = function (event) {
        let target = event.target;
        while (target !== mainContent) {
            if (target === arrowLeft) {
                clearInterval(timerId);
                showPreviousSlide();
                timerId = initSliderTimer();
                return;
            }
            if (target === arrowRight) {
                clearInterval(timerId);
                showNextSlide();
                timerId = initSliderTimer();
                return;
            }
            for (let i = 0; i < dots.length; i++) {
                if (target === dots.item(i)) {
                    clearInterval(timerId);
                    showSlideByIndex(++i);
                    timerId = initSliderTimer();
                    return;
                }
            }
            for (let i = 0; i < arrivalsElements.length; i++) {
                if (target === arrivalsElements[i]) {
                    let productID = arrivalsElements[i].firstChild;
                    location.href = "item.html" + "?id=" + productID.innerHTML;
                    return;
                }
            }

            target = target.parentNode;
        }

        function showPreviousSlide() {
            showSlide(--currentSlideIndex);
        }

        function showSlideByIndex(index) {
            currentSlideIndex = index;
            showSlide(currentSlideIndex);
        }
    };
}

addObjectsToContainer(arrivalObjects, arrivalsContent);
var arrivalsElements = document.querySelectorAll(".arrivals__item");

addMainContentDelegatedListener();











