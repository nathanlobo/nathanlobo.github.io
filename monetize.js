(function() {
    const currentScript = document.currentScript;
    const container = document.createElement('div');
    container.style.textAlign = 'center';
    container.style.fontFamily = 'inherit'; 

    const textDiv = document.createElement('div');
    textDiv.style.lineHeight = '1.6';
    textDiv.innerHTML = `
      <span style="color: var(--warning, #ff0000); font-size: 20px">Content Ends here...</span>
      <br><span><b style="font-size: 20px;">--- Ad Testing Below ---</b></span>
      <br><span style="font-size: 24px">Report immediately if Ads inappropriate</span>
    `;
    container.appendChild(textDiv);
    const adContainer = document.createElement('div');
    adContainer.id = "container-b9b71149a511b8febbf0696b49936da6";
    container.appendChild(adContainer);
    document.body.appendChild(container);

    const adScript = document.createElement('script');
    adScript.async = true;
    adScript.dataset.cfasync = "false";
    adScript.src = "//jubileebread.com/b9b71149a511b8febbf0696b49936da6/invoke.js";
    container.appendChild(adScript);
})();