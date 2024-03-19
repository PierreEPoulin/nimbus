(() => {
  // src/tableaux.ts
  var Tableau = class {
    constructor(parentClass) {
      this.items = [];
      this.buildStack(parentClass);
    }
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    buildStack(parentClass) {
      console.log("Building MIR stack");
      const parentElement = document.querySelector(`.${parentClass}`);
      if (!parentElement) {
        console.error("Parent element not found");
        return;
      }
      const children = parentElement.children;
      let items = [];
      const maxItems = 100;
      Array.from(children).slice(0, maxItems).forEach((child) => {
        const className = child.classList[0] || "";
        let audioUrl = void 0;
        let howl = void 0;
        if (child.hasAttribute("mir-audio-start")) {
          audioUrl = child.getAttribute("mir-audio-start") || void 0;
          if (audioUrl) {
            howl = new Howl({
              src: [audioUrl],
              autoplay: false,
              preload: true,
              rate: 5,
              onload: function() {
                console.log("Make it rain sound preloaded successfully!");
                howl.rate(1);
              },
              onloaderror: function(error) {
                console.error("Error loading make it rain sound:", error);
              }
            });
          }
        }
        items.push({ className, audioStartUrl: audioUrl, howlStart: howl });
      });
      this.items = this.shuffleArray(items);
      console.log(this.items);
    }
    pop() {
      return this.items.pop();
    }
  };
})();
//# sourceMappingURL=tableaux.js.map
