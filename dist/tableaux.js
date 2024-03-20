(() => {
  // src/tableaux.ts
  var TABLEAU_CLASS = "tableaux__wrapper";
  var Tableau = class {
    constructor() {
      this.items = [];
      this.buildStack();
    }
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    buildStack() {
      console.log("Building MIR stack");
      const parentClass = TABLEAU_CLASS;
      const parentElement = document.querySelector(`.${parentClass}`);
      if (!parentElement) {
        console.error("Parent element not found");
        return;
      }
      const children = parentElement.children;
      let items = [];
      const MAX_ITEMS = 100;
      Array.from(children).slice(0, MAX_ITEMS).forEach((child) => {
        const className = child.classList[0] || "";
        let audioUrl = void 0;
        let howl = void 0;
        if (items.length >= MAX_ITEMS)
          return;
        const mirBreakpoint = child.getAttribute("mir-breakpoint");
        const isDesktopOrTablet = window.innerWidth >= 992;
        const isMobile = window.innerWidth < 992;
        if (mirBreakpoint === "desktop" && !isDesktopOrTablet || mirBreakpoint === "mobile" && !isMobile) {
          console.log("skipped", child, className);
          return;
        }
        if (child.hasAttribute("mir-audio-start")) {
          audioUrl = child.getAttribute("mir-audio-start") || void 0;
          if (audioUrl) {
            howl = new Howl({
              src: [audioUrl],
              autoplay: false,
              preload: true,
              rate: 5,
              onload: function() {
                howl.rate(1);
              },
              onloaderror: function(error) {
                console.error("Error loading audio start:", audioUrl, error);
              }
            });
          }
        }
        items.push({ className, audioStartUrl: audioUrl, audioStart: howl });
      });
      this.items = this.shuffleArray(items);
      console.log(this.items);
    }
    pop() {
      if (this.items.length == 0)
        this.buildStack();
      return this.items.pop();
    }
  };
})();
//# sourceMappingURL=tableaux.js.map
