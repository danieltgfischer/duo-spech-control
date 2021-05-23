function next() {
  const btn = document.querySelector('button[data-test="player-next"]');
  btn.click();
}

function updateTextArea(text) {
  const textArea = document.querySelector('textarea');
  textArea.value = text;
  const evt = document.createEvent('Events');
  evt.initEvent('change', true, true);
  textArea.dispatchEvent(evt);
}

if (!window.chrome.runtime.onMessage.hasListeners()) {
  window.chrome.runtime.onMessage.addListener(request => {
    if (request !== undefined) {
      if (request?.type !== undefined && request?.type === 'text') {
        const text = request?.data?.text;
        updateTextArea(text);
        return true;
      }
      if (request?.type !== undefined && request?.type === 'next') {
        next();
        return true;
      }
    }
  });
}
