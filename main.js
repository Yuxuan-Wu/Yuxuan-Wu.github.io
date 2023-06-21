/**
 * Local imports
 * =============
 */
import * as GraphAlgoViz from "./graphAlgoViz.js";

/**
 * Variable declaration and initialization
 * =======================================
 */
var currApp;

/**
 * HTML element
 * ============
 */

const aboutMeBtn = document.querySelector("#nav-about-btn");
const aboutMe = document.querySelector("#about-me");
const projectsBtn = document.querySelector("#nav-projects-btn");
const projects = document.querySelector("#exhibition-cards");
const extraInfoBtn = document.querySelector("#nav-extra-btn");
const extraInfo = document.querySelector("#extra-info");
const graphAlgoVizCard = document.querySelector("#graph-algo-viz-card");
export const graphAlgoViz_tutorial_dialog_template = document.getElementById("graphAlgoViz-tutorial-template");
export const navBar = document.querySelector("#mainNavbar");
export const mainExhibition = document.querySelector("main");
export const graphAlgoControlPanel = document.querySelector("#graph-algo-control-panel");
export const startIcon = document.querySelector("#start-icon");
export const destinationIcon = document.querySelector("#destination-icon");

/**
 * Canvas settings
 * =============
 */
const canvas = document.querySelector("#canvas");
export const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - navBar.offsetHeight;

/**
 * Bind event listeners
 * ====================
 */

/* set all displayer class to display none, and then set aboutMe to display block */
aboutMeBtn.addEventListener("click", function () {
    let displayers = document.getElementsByClassName('displayer');

    for (let i = 0; i < displayers.length; i++) {
        displayers[i].style.display = 'none';
    }

    aboutMe.style.display = 'block';
});

projectsBtn.addEventListener("click", function () {
    let displayers = document.getElementsByClassName('displayer');

    for (let i = 0; i < displayers.length; i++) {
        displayers[i].style.display = 'none';
    }

    projects.style.display = 'flex';
});

extraInfoBtn.addEventListener("click", function () {
    let displayers = document.getElementsByClassName('displayer');

    for (let i = 0; i < displayers.length; i++) {
        displayers[i].style.display = 'none';
    }

    extraInfo.style.display = 'block';
});

graphAlgoVizCard.addEventListener("click", function () {
    mainExhibition.style.display = "none";

    navBar.style.display = "none";
    graphAlgoControlPanel.style.display = "flex";
    startIcon.style.display = "initial";
    destinationIcon.style.display = "initial";
    GraphAlgoViz.createGrid();
    GraphAlgoViz.initializeGridBoard();
    GraphAlgoViz.populateGrid();

    //tutorial for the graph algo viz app
    if (!localStorage.getItem("tutorialViewed")) {
        let dialog_content = graphAlgoViz_tutorial_dialog_template.content.cloneNode(true);
        let dialog_body = dialog_content.querySelector("#graph-algo-viz-tutorial");
        document.body.appendChild(dialog_content);
        dialog_body.showModal();

        let tutorialConfirmation = document.querySelector("#graph-algo-viz-tutorial-confirmation");
        tutorialConfirmation.addEventListener("click", function () {
            localStorage.setItem("tutorialViewed", true);
        });
    }
});