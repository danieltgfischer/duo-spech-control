import { useEffect, useRef } from 'react';
import { messager } from 'utils';

function App() {
  const tabIdRef = useRef(null)
  useEffect(() => {
    window.chrome?.tabs?.query(
      { url: "https://www.duolingo.com/*" },
      (tabs) => {
        tabIdRef.current = tabs[0].id;
        
      }
    );
  }, [])

  function send() {
    messager({
     
      type: 'test',
    });
  }
  return (
    <div>
      hellowwwww
      <button onClick={send}>me clicaaaa</button>
    </div>
  );
}

export default App;
