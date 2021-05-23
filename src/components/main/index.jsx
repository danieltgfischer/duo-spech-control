/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useRef, useState } from 'react';
import { lighten } from 'polished';
import { BsFillMicFill, BsFillMicMuteFill } from 'react-icons/bs';
import { AiOutlineClear } from 'react-icons/ai';

import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { messager } from 'utils';
import { Container, Button, ButtonOption } from './styles';

function App() {
  const [micPermission, setMicPermission] = useState('');
  const [isLinstening, setIsLinstening] = useState(false);
  const [buttons, setButtons] = useState([]);
  const [type, setType] = useState('text');
  const tabIdRef = useRef(null);
  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    navigator.permissions.query({ name: 'microphone' }).then(function (result) {
      setMicPermission(result.state);
      if (result.state === 'granted') {
        console.log('ok');
      } else if (result.state === 'denied') {
        console.log('not ok');
      }
    });
  }, []);

  useEffect(() => {
    window.chrome?.tabs?.query({ url: 'https://www.duolingo.com/*' }, tabs => {
      tabIdRef.current = tabs[0].id;
    });
  }, []);

  useEffect(() => {
    const lastWord = transcript.split(' ');
    if (lastWord[0] === '') return;
    setButtons(lastWord);
  }, [transcript]);

  function start() {
    setIsLinstening(!isLinstening);
    if (isLinstening) {
      SpeechRecognition.stopListening();
      if (type === 'button') sendData(type, { buttons });
      else sendData(type, { text: transcript });
      return;
    }
    SpeechRecognition.startListening({ continuous: true });
  }

  const sendData = useCallback((typeArg, data) => {
    messager({ type: typeArg, data });
  }, []);

  const removeOption = useCallback(i => {
    setButtons(btns => {
      const filtered = btns.filter((_, index) => index !== i);
      return filtered;
    });
  }, []);

  const toogleButton = useCallback(
    name => {
      setType(name);
      resetTranscript();
      setButtons([]);
    },
    [resetTranscript],
  );
  const next = useCallback(() => {
    messager({ type: 'next' });
  }, []);

  const clear = useCallback(() => {
    if (type === 'button') setButtons([]);
    resetTranscript();
  }, [resetTranscript, type]);

  return (
    <Container>
      <span>mic: {micPermission}</span>
      <div className="control-container">
        <div>
          <button className="mic" type="button" onClick={start}>
            {isLinstening ? (
              <BsFillMicMuteFill
                color={lighten(0.2, '#2CBBFA')}
                fontSize={24}
              />
            ) : (
              <BsFillMicFill color="#2CBBFA" fontSize={24} />
            )}
          </button>
          {isLinstening && <div className="signal" />}
        </div>
        <button className="clear" type="button" onClick={clear}>
          <AiOutlineClear fontSize={24} color="#9D9D9D" />
        </button>
      </div>
      {type === 'text' && <p>{transcript}</p>}
      {type === 'button' && (
        <div className="btns">
          {buttons.map((b, i) => (
            <ButtonOption onClick={() => removeOption(i)} key={i}>
              {b}
            </ButtonOption>
          ))}
        </div>
      )}
      <div className="control">
        <Button selected={type === 'text'} onClick={() => toogleButton('text')}>
          Texto
        </Button>
        <Button
          selected={type === 'button'}
          onClick={() => toogleButton('button')}
        >
          Botão
        </Button>
        <button className="next" onClick={next} type="button">
          Próximo
        </button>
      </div>
    </Container>
  );
}

export default App;
