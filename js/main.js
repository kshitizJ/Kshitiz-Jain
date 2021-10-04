
// navigation menu
function navigationMenu() {
    const hamburgerBtn = document.querySelector(".hamburger-btn"),
        navMenu = document.querySelector(".nav-menu"),
        closeNavMenu = document.querySelector(".close-nav-menu");

    hamburgerBtn.addEventListener("click", showNavMenu)
    closeNavMenu.addEventListener("click", hideNavMenu)

    function showNavMenu() {
        // console.log("hi");
        navMenu.classList.add("open")
        // console.log(window.scrollY);
    }

    function hideNavMenu() {
        navMenu.classList.remove("open")
        fadeOutEffect();
    }

    function fadeOutEffect() {
        document.querySelector(".fade-out-effect").classList.add("active")
        setTimeout(() => {
            document.querySelector(".fade-out-effect").classList.remove("active")
        }, 300)
    }

    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("link-item")) {

            // console.log("contains");
            // console.log(event.target.hash);
            // make sure event.target.hash has a value before overidding default behaviour

            if (event.target.hash !== "") {

                // prevent default anchor click behaviour
                event.preventDefault()

                const hash = event.target.hash

                // deactivate existing active 'section'
                // document.querySelector(".section.active").classList.add("hide")
                // document.querySelector(".section.active").classList.remove("active")

                // activate new 'section'
                document.querySelector(hash).classList.add("active")
                document.querySelector(hash).classList.remove("hide")

                // deactivate existing active navigation menu 'link-item'
                navMenu.querySelector(".active").classList.add("outer-shadow", "hover-in-shadow")
                navMenu.querySelector(".active").classList.remove("active", "inner-shadow")

                // if clicked 'link-item' is contained within the navigation menu
                if (navMenu.classList.contains("open")) {
                    // active new navigation menu 'link-item'
                    event.target.classList.add("active", "inner-shadow")
                    event.target.classList.remove("outer-shadow", "hover-in-shadow")

                    // hide navigation menu 
                    hideNavMenu()
                }
                else {
                    let navItems = navMenu.querySelectorAll(".link-item")
                    navItems.forEach((item) => {
                        if (hash === item.hash) {
                            // active new navigation menu 'link-item'
                            item.classList.add("active", "inner-shadow")
                            item.classList.remove("outer-shadow", "hover-in-shadow")
                        }
                    })
                    fadeOutEffect()
                }
                // add hash (#) to url
                // window.location.hash = hash

            }
        }
    })

}
navigationMenu()

// about section functionality
function aboutSwitch() {
    const aboutSection = document.querySelector(".about-section")
    tabsContainer = document.querySelector(".about-tabs")
    tabsContainer.addEventListener("click", (event) => {
        // if event.target contains 'tab-item' class and not contains 'active' class
        if (event.target.classList.contains("tab-item") && !event.target.classList.contains("active")) {
            const target = event.target.getAttribute("data-target")
            // deactivate existing active 'tab-item'
            tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active")
            event.target.classList.add("active", "outer-shadow")
            // deactivate existing active 'tab-content'
            aboutSection.querySelector(".tab-content.active").classList.remove("active")
            // activate new 'tab-content'
            aboutSection.querySelector(target).classList.add("active")
        }
    })
}

aboutSwitch()


// portfolio popup section

function bodyScrollingToggle() {
    document.body.classList.toggle("hidden-scrolling")
}

function popupSection() {
    const filterContainer = document.querySelector(".portfolio-filter"),
        portfolioItemsContainer = document.querySelector(".portfolio-items"),
        portfolioItems = document.querySelectorAll(".portfolio-item"),
        popup = document.querySelector(".portfolio-popup"),
        prevBtn = popup.querySelector(".pp-prev"),
        nextBtn = popup.querySelector(".pp-next"),
        closeBtn = popup.querySelector(".pp-close"),
        projectDetailsContainer = popup.querySelector(".pp-details"),
        projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
    let itemIndex, slideIndex, screenshots;

    // filter portfolio items
    filterContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("filter-item") && !event.target.classList.contains("active")) {
            // deactivate existing active 'filter-item'
            filterContainer.querySelector(".active").classList.remove("outer-shadow", "active")
            // activate new filter
            event.target.classList.add("active", "outer-shadow")
            const target = event.target.getAttribute("data-target")
            // console.log(target);
            portfolioItems.forEach((item) => {
                // console.log(item.getAttribute("data-category"));
                if (target === item.getAttribute("data-category") || target === 'all') {
                    item.classList.remove("hide");
                    item.classList.add("show");
                }
                else {
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            })
        }
    })

    portfolioItemsContainer.addEventListener("click", (event) => {
        // console.log(event.target.closest(".portfolio-item-inner"));
        if (event.target.closest(".portfolio-item-inner")) {
            const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
            // get the porfolio item index
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem)
            screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots")
            // console.log(screenshots);
            // convert screenshots into array
            screenshots = screenshots.split(",")
            // console.log(screenshots);
            if (screenshots.length === 1) {
                prevBtn.style.display = "none"
                nextBtn.style.display = "none"
            }
            else {
                prevBtn.style.display = "block"
                nextBtn.style.display = "block"
            }
            slideIndex = 0;
            popToggle()
            popupSlideShow()
            popupDetails()
        }
    })

    closeBtn.addEventListener("click", () => {
        popToggle()
        if (projectDetailsContainer.classList.contains("active")) {
            popupDetailsToggle()
        }
    })

    function popToggle() {
        popup.classList.toggle("open")
        bodyScrollingToggle()
    }

    function popupSlideShow() {
        const imgSrc = screenshots[slideIndex]
        const popupImg = popup.querySelector(".pp-img")
        // activate loader until the popup is loaded
        popup.querySelector(".pp-loader").classList.add("active")
        popupImg.src = imgSrc
        popupImg.onload = () => {
            // deactivate loader after popup img is loaded
            popup.querySelector(".pp-loader").classList.remove("active")
        }
        popup.querySelector(".pp-counter").innerHTML = (slideIndex + 1) + " of " + screenshots.length;
    }

    // next slide
    nextBtn.addEventListener("click", () => {
        if (slideIndex === screenshots.length - 1) {
            slideIndex = 0;
        }
        else {
            slideIndex++
        }
        popupSlideShow()
    })
    prevBtn.addEventListener("click", () => {
        if (slideIndex === 0) {
            slideIndex = screenshots.length - 1;
        }
        else {
            slideIndex--
        }
        popupSlideShow()
    })

    function popupDetails() {
        // if details of the project doesnot exists
        if (!portfolioItems[itemIndex].querySelector(".portfolio-item-details")) {
            projectDetailsBtn.style.display = "none"
            return;
        }

        // get the project details
        projectDetailsBtn.style.display = "block"
        const details = portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML
        // set the project details
        popup.querySelector(".pp-project-details").innerHTML = details
        // get the project title
        const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML
        // set the project title
        popup.querySelector(".pp-title h2").innerHTML = title
        // get the project category
        const category = portfolioItems[itemIndex].getAttribute("data-category")
        // set the project category
        popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ")
    }

    projectDetailsBtn.addEventListener("click", () => {
        popupDetailsToggle()
    })

    function popupDetailsToggle() {
        if (projectDetailsContainer.classList.contains("active")) {
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus")
            projectDetailsBtn.querySelector("i").classList.add("fa-plus")
            projectDetailsContainer.classList.remove("active")
            projectDetailsContainer.style.maxHeight = 0 + "px"
            // console.log(true);
        } else {
            projectDetailsBtn.querySelector("i").classList.remove("fa-plus")
            projectDetailsBtn.querySelector("i").classList.add("fa-minus")
            projectDetailsContainer.classList.add("active")
            // console.log(false);
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px"
            popup.scrollTo(0, projectDetailsContainer.offsetTop)
        }
    }
}

popupSection()


// testimonial section
function testimonialSection() {
    const sliderContainer = document.querySelector(".testi-slider-container"),
        slides = sliderContainer.querySelectorAll(".testi-item"),
        slideWidth = sliderContainer.offsetWidth,
        prevBtn = document.querySelector('.testi-slider-nav .prev'),
        activeSlide = sliderContainer.querySelector(".testi-item.active"),
        nextBtn = document.querySelector('.testi-slider-nav .next');
    let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide);

    // set width of all slides
    slides.forEach((slide) => {
        slide.style.width = slideWidth + "px"
    })

    // set width of sliderContainer
    sliderContainer.style.width = slideWidth * slides.length + "px"

    nextBtn.addEventListener("click", () => {
        if (slideIndex === slides.length - 1) {
            slideIndex = 0
        }
        else {
            slideIndex++;
        }
        slider()
    })

    prevBtn.addEventListener("click", () => {
        if (slideIndex === 0) {
            slideIndex = slides.length - 1
        }
        else {
            slideIndex--;
        }
        slider()
    })

    function slider() {
        sliderContainer.querySelector(".testi-item.active").classList.remove("active")
        slides[slideIndex].classList.add("active")
        sliderContainer.style.marginLeft = -(slideWidth * slideIndex) + "px"
    }

    slider()
}
testimonialSection()

// // hide all sections except active
// function hideAllExceptActive() {
//     const sections = document.querySelectorAll(".section")
//     sections.forEach((section) => {
//         if (!section.classList.contains("active")) {
//             section.classList.add("hide")
//         }
//     })
// }
// hideAllExceptActive()

window.addEventListener("load", () => {
    document.querySelector(".preloader").classList.add("fade-out")
    setTimeout(() => {
        document.querySelector(".preloader").style.display = "none";
    }, 600)
})

