if (!window.chrome.runtime.onMessage.hasListeners()) {
  window.chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
      if (request !== undefined) {
        if (request?.type !== undefined && request?.type === 'test') {
          console.log('testeee');
          return true;
        }
      }
    },
  );
}
