/*
 * Index  
 * Main entry point
 * 
 */

import { Home_BgVideo } from "./page/home-bgvideo";
import { Home_ExternalVideo } from "./page/home-externalvideo";
import { RouteDispatcher } from "./routeDispatcher";

// Global vars
const SITE_NAME = 'Nimbus';
const VERSION = 'v0.1.4';

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
        '/': () => { // Vimeo 

            (new Home_ExternalVideo()).init();

        }, 
        '/home-1': () => { // Background Videos

            (new Home_BgVideo()).init();

        },
        '/home-2': () => { // Dropbox

            (new Home_ExternalVideo()).init();

        } 
    };
    routeDispatcher.dispatchRoute(); 
}

document.addEventListener("DOMContentLoaded", init)