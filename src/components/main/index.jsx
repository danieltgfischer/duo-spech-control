import { useCallback, useEffect, useState, useRef } from 'react';
import { lighten } from 'polished';
import { BsFillMicFill, BsFillMicMuteFill } from 'react-icons/bs';
import { AiOutlineClear } from 'react-icons/ai';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { messager } from 'utils';
import { useDispatch, useSelector } from 'react-redux';
import { updateLanguage, updateSelectedLanguage } from 'store/actions';
import { languages } from './languages';
import {
  Container,
  Button,
  ButtonOption,
  NextButton,
  Mic,
  Clear,
  CommandButton,
} from './styles';

function App() {
  const textRef = useRef(null);
  const [micPermission, setMicPermission] = useState('');
  const [isLinstening, setIsLinstening] = useState(true);
  const [buttons, setButtons] = useState([]);
  const [type, setType] = useState('text');
  const { lang1, lang2, selected_language } = useSelector(state => state);
  const dispatch = useDispatch();
  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    const textArea = textRef.current;
    if (textArea) {
      textArea.value = transcript;
    }
  }, [transcript]);

  useEffect(() => {
    navigator.permissions.query({ name: 'microphone' }).then(function (result) {
      setMicPermission(result.state);
      if (result.state === 'granted') {
        console.log('ok');
      } else if (result.state === 'denied') {
        console.log('not ok');
      }
      SpeechRecognition.startListening({
        continuous: true,
        language: selected_language.value,
      });
    });
  }, [selected_language.value]);

  useEffect(() => {
    const words = transcript.split(' ');
    if (words[0] === '') return;
    setButtons(words);
  }, [transcript]);

  const sendData = useCallback((typeArg, data = {}) => {
    messager({ type: typeArg, data });
  }, []);

  const sendDataToDuolinguo = useCallback(() => {
    if (type === 'button') {
      sendData(type, { buttons });
    } else {
      sendData(type, {
        text: textRef.current.value,
      });
    }
    messager({ type: 'next' });
    resetTranscript();
  }, [buttons, resetTranscript, sendData, type]);

  useEffect(() => {
    document.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        sendDataToDuolinguo();
        return;
      }
      messager({ type: 'number', data: { number: e.key } });
    });
  }, [resetTranscript, sendDataToDuolinguo]);

  const removeOption = useCallback(i => {
    setButtons(btns => {
      const filtered = btns.filter((_, index) => index !== i);
      return filtered;
    });
  }, []);

  const toogleMicrophone = useCallback(() => {
    setIsLinstening(!isLinstening);
    if (isLinstening) {
      SpeechRecognition.stopListening();
      return;
    }
    SpeechRecognition.startListening({
      continuous: true,
      language: selected_language.value,
    });
  }, [isLinstening, selected_language.value]);

  const toogleButton = useCallback(
    name => {
      setType(name);
      resetTranscript();
      setButtons([]);
    },
    [resetTranscript],
  );

  const selectLanguage = useCallback(
    (key, e) => {
      const { value: name } = e.target;
      const value = Object.keys(languages).find(l => languages[l] === name);
      const data = { name, value };
      dispatch(updateLanguage(key, data));
    },
    [dispatch],
  );

  const choiceLanguage = useCallback(
    lang => {
      dispatch(updateSelectedLanguage(lang));
    },
    [dispatch],
  );

  const clear = useCallback(() => {
    setButtons([]);
    resetTranscript();
  }, [resetTranscript]);

  const speak = useCallback(() => {
    setIsLinstening(false);
    SpeechRecognition.stopListening();
    sendData('speak');
  }, [sendData]);

  return (
    <Container>
      <span>mic: {micPermission}</span>
      <div className="lang-container">
        <span>Meu idioma:</span>
        <select
          onChange={e => selectLanguage('lang1', e)}
          defaultValue={lang1.name}
        >
          {Object.keys(languages).map(lang => (
            <option key={lang}>{lang}</option>
          ))}
        </select>
      </div>
      <div className="lang-container">
        <span>Estou aprendendo:</span>
        <select
          onChange={e => selectLanguage('lang2', e)}
          defaultValue={lang2.name}
        >
          {Object.keys(languages).map(lang => (
            <option key={lang}>{lang}</option>
          ))}
        </select>
      </div>
      <div className="choice-lang">
        <span>Eu estou falando em:</span>
        <div>
          <Button
            selected={selected_language.value === lang1.value}
            onClick={() => choiceLanguage(lang1)}
          >
            {lang1.name}
          </Button>
          <Button
            selected={selected_language.value === lang2.value}
            onClick={() => choiceLanguage(lang2)}
          >
            {lang2.name}
          </Button>
        </div>
      </div>
      <div className="control">
        <div className="types">
          <span>Selecionar o tipo de ação: </span>
          <div>
            <Button
              selected={type === 'text'}
              onClick={() => toogleButton('text')}
            >
              Texto
            </Button>
            <Button
              selected={type === 'button'}
              onClick={() => toogleButton('button')}
            >
              Botão
            </Button>
            <NextButton
              className="next"
              onClick={sendDataToDuolinguo}
              type="button"
            >
              Próximo
            </NextButton>
          </div>
        </div>
        <div className="cmds">
          <span>Selecionar o tipo de ação: </span>
          <div>
            <CommandButton onClick={() => sendData('listen')}>
              Escutar
            </CommandButton>
            <CommandButton onClick={() => sendData('listen_slow')}>
              Escutar devagar
            </CommandButton>
            <CommandButton onClick={speak}>Falar</CommandButton>
            <CommandButton onClick={() => sendData('speak')}>
              Verificar fala
            </CommandButton>
          </div>
        </div>
      </div>
      <div className="control-container">
        <div>
          <div className="select-container" />
          <Mic onClick={toogleMicrophone}>
            {isLinstening ? (
              <BsFillMicMuteFill
                color={lighten(0.2, '#2CBBFA')}
                fontSize={24}
              />
            ) : (
              <BsFillMicFill color="#2CBBFA" fontSize={24} />
            )}
          </Mic>
          {isLinstening && <div className="signal" />}
        </div>
        <Clear onClick={clear}>
          <AiOutlineClear fontSize={24} color="#9D9D9D" />
        </Clear>
      </div>
      {type === 'text' && <textarea ref={textRef} />}
      {type === 'button' && (
        <div className="btns">
          {(buttons || [])?.map((btn, i) => (
            <ButtonOption onClick={() => removeOption(i)} key={i}>
              {btn}
            </ButtonOption>
          ))}
        </div>
      )}
    </Container>
  );
}

export default App;
