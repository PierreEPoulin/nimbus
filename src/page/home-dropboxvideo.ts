
/*
 * Page | Home | Dropbox Video 
 */

import { TableauItem, Tableau } from "../tableaux";
import gsap from 'gsap'; 
 

export class Home_DropboxVideo {

  constructor() {
  }
  
  init() {

    console.log("Home / DropboxVideo - page init."); 

    // Create class stack
    const tableaux = new Tableau();

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

        // Stop the video
        const video: HTMLVideoElement | null = document.querySelector(`.${makeItRainState.currentItem.className} video`);
        if (video) {
          video.pause();
          video.currentTime = 0; 
        }

        if(makeItRainState.currentItem.audioStart) {
          makeItRainState.currentItem.audioStart.stop();
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

        if(item.audioStart) {
          item.audioStart.seek(0);
          item.audioStart.play(); 
        }

        // Play the video
        const video: HTMLVideoElement | null = document.querySelector(`.${makeItRainState.currentItem.className} video`);
        if (video) {
          video.play();
        }

        const elements: NodeListOf<Element> = document.querySelectorAll(`.${item.className}`);
        console.log("Making elements visible", elements);
        gsap.to(elements, { display: 'block' });
        
      }
    });

  }

}
