export function messager(data, callback) {
  window.chrome?.tabs?.query({ url: "https://www.duolingo.com/*" }
    , tabs => {
      const tabId = tabs[0].id;
      window.chrome.tabs.sendMessage(tabId, data, callback);
    });
}
