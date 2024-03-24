
/*
 * Page | Home | External Video 
 */

import { TableauItem, Tableau } from "../tableaux";
import gsap from 'gsap'; 
 

export class Home_ExternalVideo {

  constructor() {
  }

  // Get the video element
  // within a tableaux item 
  getVideoElement(tableauItemElement: HTMLElement): HTMLVideoElement | null {

    let video: HTMLVideoElement | null = null;

    // Get default video, if exists
    if(!video)
      video = tableauItemElement.querySelector("video");

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

    // Install the click handler for the MIR buttons
    // there can be multiple 
    document.querySelectorAll('[mir-action="toggle"]').forEach(element => {
      element.addEventListener('click', () => {
        if (makeItRainState.isActive && makeItRainState.currentItem) {

          console.log("Exiting makeItRain state");
          
          // Deactivate MIR state 
          makeItRainState.isActive = false;

          // // TEST: skip interactives
          // if(makeItRainState.currentItem.className.startsWith("in")) {
          //   console.log("Interactive - skipping");
          //   return;          
          // }
          
          // Hide the tableaux item 
          const elements: NodeListOf<Element> = document.querySelectorAll(`.${makeItRainState.currentItem.className}`);
          gsap.to(elements, { display: 'none' });

          // Stop any playing video
          if (makeItRainState.video) {
            makeItRainState.video.pause();
            makeItRainState.video.currentTime = 0;
            // Reset position after a 5000ms delay
            // Done to ensure lighting interaction finishes, 
            // but video is reset on second play. 
            // setTimeout(() => {
            //   if (makeItRainState.video) {
            //     makeItRainState.video.currentTime = 0;
            //   }
            // }, 5000);
          }

          // Stop any playing audio
          if(makeItRainState.currentItem.audioStart) {
            makeItRainState.currentItem.audioStart.stop();
          }

          // If there is an item trigger, click it
          document.querySelectorAll('a[mir-item-trigger="toggle"]').forEach(triggerBtn => {
            (triggerBtn as HTMLLinkElement).click();
          });

        } else {

          console.log("Entering makeItRain state"); 

          // Get the next tableaux item
          const item = tableaux.pop();
          if (!item) {
            console.log("No more classes to toggle.");
            return;
          }

          // Get item element
          const tableauItemElement: HTMLElement | null = document.querySelector(`.${item.className}`);
          if(!tableauItemElement) return; 
          
          // Save MIR state
          makeItRainState.isActive = true;
          makeItRainState.currentItem = item;

          // // TEST: skip interactives
          // if(makeItRainState.currentItem.className.startsWith("in")) {
          //   console.log("Interactive - skipping");
          //   return;          
          // }

          // Play audio, if exists
          if(item.audioStart) {
            console.log("playing audio")
//            item.audioStart.seek(0);
            item.audioStart.play(); 
          }

          // Play video, if exists
          const video: HTMLVideoElement | null = this.getVideoElement( 
            tableauItemElement 
            );
          if (video) {
            // https://developer.chrome.com/blog/play-request-was-interrupted
            console.log("playing video");
            video.currentTime = 0; // reset in case this is a second viewing 
            video.play();

            // Save as currently playing video so it can be stopped
            makeItRainState.video = video;
          }

          // Make the tableaux item visible 
          const elements: NodeListOf<Element> = document.querySelectorAll(`.${item.className}`);
          console.log("Making elements visible", elements);
          gsap.to(elements, { display: 'block' });

          // If there is an item trigger, click it
          document.querySelectorAll('a[mir-item-trigger="toggle"]').forEach(triggerBtn => {
            (triggerBtn as HTMLLinkElement).click();
          });
          
        }
      });
    });

  }

}
