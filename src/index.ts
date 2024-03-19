/*
 * Index  
 * Main entry point
 * 
 */

import { Home1Page } from "./page/home-bgvideo";
import { RouteDispatcher } from "./routeDispatcher";

// Global vars
const SITE_NAME = 'Nimbus';
const VERSION = 'v0.1.0';

// Global object
window[SITE_NAME] = window[SITE_NAME] || {}; 
var Site = window[SITE_NAME];

// Extend the Window interface to include fsAttributes
declare global {
    interface Window {
      fsAttributes: [string, (filterInstances: any[]) => void][];

      modelsDataSourceElems: NodeListOf<HTMLElement>;
      modelsSelectElem: HTMLElement | null;
      modelsNavElem: HTMLElement | null;
    }
}



const init = () => {
    
    console.log(`${SITE_NAME} package init ${VERSION}`);

    var routeDispatcher = new RouteDispatcher();
    routeDispatcher.routes = {
        '/home-1': () => {

            (new Home1Page()).init();

        }
    };
    routeDispatcher.dispatchRoute(); 
}

document.addEventListener("DOMContentLoaded", init)