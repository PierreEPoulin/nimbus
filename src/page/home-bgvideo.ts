
/*
 * Page | Home | BG Video 
 */

import { TableauItem, Tableau } from "../tableaux";
import gsap from 'gsap'; 
 

export class Home_BgVideo {

//  modelDropdown: WebflowDropdown; 

  constructor() {
  }
  
  init() {

    console.log("Home / BgVideo - page init."); 

    // Create class stack
    const tableaux = new Tableau('tableaux__wrapper');

    // Make It Rain functionality
    type MakeItRainState = {
      isActive: boolean;
      currentItem?: TableauItem;
    };

    const makeItRainState: MakeItRainState = {
      isActive: false,
    };

    document.querySelector('.bt__makeitrain')?.addEventListener('click', function() {
      if (makeItRainState.isActive && makeItRainState.currentItem) {
        console.log("Exiting makeItRain state");
        const elements: NodeListOf<Element> = document.querySelectorAll(`.${makeItRainState.currentItem.className}`);
        gsap.to(elements, { display: 'none' });

        if(makeItRainState.currentItem.howlStart) {
          makeItRainState.currentItem.howlStart.stop();
        }
        
        makeItRainState.isActive = false;

      } else {
        console.log("Entering makeItRain state");
        const item = tableaux.pop();
        if (!item) {
          console.log("No more classes to toggle.");
          return;
        }
       
        makeItRainState.isActive = true;
        makeItRainState.currentItem = item;

        if(item.howlStart) {
          item.howlStart.seek(0);
          item.howlStart.play(); 
        }

        const elements: NodeListOf<Element> = document.querySelectorAll(`.${item.className}`);
        console.log("Making elements visible", elements);
        gsap.to(elements, { display: 'block' });
        // Optionally play audio: new Audio(item.audioUrl).play();
      }
    });


  }

  
  



}
