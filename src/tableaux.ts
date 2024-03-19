export type TableauItem = {
    className: string;
    audioStartUrl: string | undefined;
    howlStart: Howl | undefined;
};

export class Tableau {
    items: TableauItem[] = [];

    constructor(parentClass: string) {
        this.buildStack(parentClass);
    }

    private shuffleArray(array: TableauItem[]): TableauItem[] {
        for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    private buildStack(parentClass: string): void {
        console.log("Building MIR stack");

        const parentElement: HTMLElement | null = document.querySelector(`.${parentClass}`);
        if (!parentElement) {
        console.error('Parent element not found');
        return;
        }

        const children: HTMLCollection = parentElement.children;
        let items: TableauItem[] = [];
        const maxItems: number = 100;

        Array.from(children).slice(0, maxItems).forEach((child: Element) => {
            const className: string = child.classList[0] || "";
            let audioUrl: string | undefined = undefined; // Default to undefined
            let howl: Howl | undefined = undefined;

            // Check for the custom attribute 'mir-audio-start'
            if (child.hasAttribute('mir-audio-start')) {
                audioUrl = child.getAttribute('mir-audio-start') || undefined;

                if(audioUrl) { 
                    howl = new Howl({
                        src: [audioUrl],
                        autoplay: false,
                        preload: true,
                        rate: 5,
                        onload: function () {
                            console.log("Make it rain sound preloaded successfully!");
                            (howl as Howl).rate(1);
                        },
                        onloaderror: function (error) {
                            console.error("Error loading make it rain sound:", error);
                        }
                    });
                }
            }
        
            items.push({ className, audioStartUrl: audioUrl, howlStart: howl });
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
        return this.items.pop();
    }
}