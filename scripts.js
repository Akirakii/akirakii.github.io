function controlVideo(vidFunc, div) {
    console.log(div);
    console.log(div.getElementsByTagName("iframe")[0]);
    var iframe = div.getElementsByTagName("iframe")[0].contentWindow;
    iframe.postMessage(
        '{"event":"command","func":"' + vidFunc + '","args":""}',
        "*"
    );
}

document.addEventListener("DOMContentLoaded", () => {
    const videoContainers = document.querySelectorAll(".video-container");

    videoContainers.forEach((vc) => {
        vc.addEventListener("mouseenter", () => {
            // vc.querySelector(".vid").play();
            controlVideo('playVideo', vc);
            controlVideo('startVideo', vc);
        });

        vc.addEventListener("mouseleave", () => {
            // vc.querySelector(".vid").pause();
            controlVideo('pauseVideo', vc);
        });
    });
});
const sections = document.querySelectorAll("section");
const navA = document.querySelectorAll("nav a");
const imgs = document.querySelectorAll("img");

function updateActiveSection() {
    let maxVisibleArea = 0;
    let activeSection = null;

    sections.forEach((section) => {
        const visibleArea = getVisibleArea(section);

        if (visibleArea > maxVisibleArea) {
            maxVisibleArea = visibleArea;
            activeSection = section.getAttribute("id");
        }
    });

    navA.forEach((a) => {
        a.classList.remove("active");
        if (a.classList.contains(activeSection)) {
            a.classList.add("active");
        }
    });

    imgs.forEach((a) => {
        a.classList.remove("active");
        if (a.classList.contains(activeSection)) {
            a.classList.add("active");
        }
    });
}

function getVisibleArea(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;
    const windowWidth =
        window.innerWidth || document.documentElement.clientWidth;
    const visibleHeight =
        Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    const visibleWidth =
        Math.min(rect.right, windowWidth) - Math.max(rect.left, 0);
    return visibleHeight * visibleWidth;
}

window.addEventListener("scroll", updateActiveSection);
window.addEventListener("resize", updateActiveSection);