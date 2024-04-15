"use strict";
(() => {
  // src/index.ts
  var savedData = null;
  setInterval(() => {
    const script = document.querySelector("script");
    const scriptUrl = script?.getAttribute("src");
    fetch(scriptUrl).then((response) => response.text()).then((newData) => {
      const prevData = savedData;
      savedData = newData;
      if (prevData === newData) {
        console.log("Script not changed!");
        return;
      }
      if (prevData != null)
        window.location.reload();
    }).catch((error) => console.error("Error:", error));
  }, 1e3);
})();
//# sourceMappingURL=script.js.map
