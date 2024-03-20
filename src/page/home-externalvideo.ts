
/*
 * Page | Home | External Video 
 */

import { TableauItem, Tableau } from "../tableaux";
import gsap from 'gsap'; 
 

export class Home_ExternalVideo {

  constructor() {
  }
  
  getVideoElement(tableauItemElement: HTMLElement): HTMLVideoElement | null {

    let video: HTMLVideoElement | null = null;

    // Desktop breakpoint, if exists
    // mir-breakpoint=desktop

    // Mobile breakpoint, if exists
    // mir-breakpoint=mobile

    // Get default video, if exists
    if(!video)
      tableauItemElement.querySelector("video");

    // Video may still be null here
    // e.g. an Interactive tableaux item 

    return video;
  }

  init() {

    console.log("Home / ExternalVideo - page init."); 

    // Create class stack
    const tableaux = new Tableau();

    // Make It Rain functionality
    type MakeItRainState = {
      isActive: boolean;
      currentItem?: TableauItem;
      video?: HTMLVideoElement;
    };

    const makeItRainState: MakeItRainState = {
      isActive: false,
    };

    document.querySelector('.bt__makeitrain')?.addEventListener('click', () => {
      if (makeItRainState.isActive && makeItRainState.currentItem) {

        console.log("Exiting makeItRain state");
        
        const elements: NodeListOf<Element> = document.querySelectorAll(`.${makeItRainState.currentItem.className}`);
        gsap.to(elements, { display: 'none' });

        // Stop the video
        // const video: HTMLVideoElement | null = document.querySelector(`.${makeItRainState.currentItem.className} video`);
        // if (video) {
        //   video.pause();
        //   video.currentTime = 0; 
        // }

        // const video: HTMLVideoElement | null = this.getVideoElement(
        //   document.querySelector(`.${makeItRainState.currentItem.className}`));
        if (makeItRainState.video) {
          makeItRainState.video.pause();
          makeItRainState.video.currentTime = 0; 
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
//        const video: HTMLVideoElement | null = document.querySelector(`.${makeItRainState.currentItem.className} video`);
        const tableauItemElement: HTMLElement | null = document.querySelector(`.${makeItRainState.currentItem.className}`);
        if(!tableauItemElement) return; 
        const video: HTMLVideoElement | null = this.getVideoElement( 
          tableauItemElement 
          );
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
