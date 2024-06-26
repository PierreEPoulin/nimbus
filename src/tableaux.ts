export type TableauItem = {
    className: string;
    audioStartUrl: string | undefined;
    audioStart: Howl | undefined;
};


const TABLEAU_CLASS: string = 'tableaux__wrapper';

export class Tableau {
    items: TableauItem[] = [];

    constructor() {
        this.buildStack();
    }

    private shuffleArray(array: TableauItem[]): TableauItem[] {
        for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    private buildStack(): void {

        console.log("Building MIR stack");

        const parentClass = TABLEAU_CLASS;

        const parentElement: HTMLElement | null = document.querySelector(`.${parentClass}`);
        if (!parentElement) {
        console.error('Parent element not found');
        return;
        }

        const children: HTMLCollection = parentElement.children;
        let items: TableauItem[] = [];
        const MAX_ITEMS: number = 100;

        Array.from(children).slice(0, MAX_ITEMS).forEach((child: Element) => {
            const className: string = child.classList[0] || "";
            let audioUrl: string | undefined = undefined; // Default to undefined
            let howl: Howl | undefined = undefined;

            // Constrain items by count, if desired for testing
            if(items.length >= MAX_ITEMS) return;

            const mirBreakpoint = child.getAttribute('mir-breakpoint');
            const isDesktopOrTablet = window.innerWidth >= 992; // Example breakpoint for desktop/tablet
            const isMobile = window.innerWidth < 992; // Example breakpoint for mobile
          
            if ((mirBreakpoint === 'desktop' && !isDesktopOrTablet) || 
                (mirBreakpoint === 'mobile' && !isMobile)) {
                    console.log("skipped", child, className); 
              return; // Skip adding this item
            }

            // Constrain items by type, if desired for testing
//            if(!className.startsWith('in')) return; 
            // if (child.hasAttribute('mir-breakpoint')) {

            // }



            // Check for the custom attribute 'mir-audio-start'
            if (child.hasAttribute('mir-audio-start')) {
                audioUrl = child.getAttribute('mir-audio-start') || undefined;

                // If an audio is specified, preload it
                if(audioUrl) { 
                    howl = new Howl({
                        src: [audioUrl],
                        autoplay: false,
                        preload: true,
                        loop: true, 
                        rate: 5,
                        onload: function () {
                            (howl as Howl).rate(1);
                        },
                        onloaderror: function (error) {
                            console.error("Error loading audio start:", audioUrl, error);
                        }
                    });
                }
            }
        
            items.push({ className, audioStartUrl: audioUrl, audioStart: howl });
        });
                
        // Array.from(children).slice(0, maxItems).forEach((child: Element) => {
        //     // Example: Extract className and construct an audioUrl. Modify as needed.
        //     const className: string = child.classList[0] || "";
        //     const audioUrl: string = `path/to/audio/${className}.mp3`;
        //     items.push({ className, audioUrl });
        // });

        this.items = this.shuffleArray(items);

        console.log(this.items);
    }

    pop(): TableauItem | undefined {

        // Rebuild stack if empty
        if (this.items.length == 0)
            this.buildStack();

        return this.items.pop();
    }
}