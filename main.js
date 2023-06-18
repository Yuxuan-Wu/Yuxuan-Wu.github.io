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

const graphAlgoViz = document.querySelector("#graphAlgoViz");
const graphAlgoVizCard = document.querySelector("#graph-algo-viz-card");
export const graphAlgoViz_tutorial_dialog_template = document.getElementById("graphAlgoViz-tutorial-template");
export const navBar = document.querySelector("#navbar");
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
graphAlgoVizCard.addEventListener("click", function () {
    mainExhibition.style.display = "none";

    navBar.style.display = "none";
    graphAlgoControlPanel.style.display = "block";
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