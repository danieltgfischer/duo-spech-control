function next() {
  const btn = document.querySelector('button[data-test="player-next"]');
  btn.click();
}

function listen(i = 0) {
  const buttons = document.querySelectorAll(
    'button[data-test="speaker-button"]',
  );
  buttons[i].click();
}

function speak() {
  document.querySelector('button[data-test="challenge-speak-button"]').click();
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
      if (request?.type !== undefined && request?.type === 'listen') {
        listen();
        return true;
      }
      if (request?.type !== undefined && request?.type === 'listen_slow') {
        listen(1);
        return true;
      }
      if (request?.type !== undefined && request?.type === 'speak') {
        speak();
        return true;
      }
    }
  });
}
