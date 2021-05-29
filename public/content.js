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

function updateText(text) {
  const textArea = document.querySelector('textarea');
  const input = document.querySelector('input');
  if (textArea) {
    textArea.value = text;
    const evt = document.createEvent('Events');
    evt.initEvent('change', true, true);
    textArea.dispatchEvent(evt);
  }
  if (input) {
    input.value = text;
    const evt = document.createEvent('Events');
    evt.initEvent('change', true, true);
    input.dispatchEvent(evt);
  }
}

function clickButtons(btns) {
  let buttons = document.querySelectorAll('*[data-test="challenge-tap-token"]');
  if (buttons.length === 0) {
    buttons = document.querySelectorAll('*[data-test="challenge-judge-text"]');
  }
  if (buttons) {
    btns.forEach(b => {
      buttons.forEach(e => {
        if (e.innerHTML.toLowerCase() === b.toLowerCase()) {
          e.click();
        }
      });
    });
  }
}

function clickButtonsByNumber(number) {
  const btn = $(`span:contains(${number})`);
  btn.click();
}

if (!window.chrome.runtime.onMessage.hasListeners()) {
  window.chrome.runtime.onMessage.addListener(request => {
    if (request !== undefined) {
      if (request?.type !== undefined && request?.type === 'text') {
        const text = request?.data?.text;
        updateText(text);
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
      if (request?.type !== undefined && request?.type === 'button') {
        const btns = request?.data?.buttons;
        clickButtons(btns);
        return true;
      }
      if (request?.type !== undefined && request?.type === 'number') {
        const number = request?.data?.number;
        clickButtonsByNumber(number);
        return true;
      }
    }
  });
}
