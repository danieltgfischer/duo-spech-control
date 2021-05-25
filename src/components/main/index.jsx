import { useCallback, useEffect, useRef, useState } from 'react';
import { lighten } from 'polished';
import { BsFillMicFill, BsFillMicMuteFill } from 'react-icons/bs';
import { AiOutlineClear } from 'react-icons/ai';
import { IoMdCheckboxOutline } from 'react-icons/io';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { messager } from 'utils';
import { useDispatch, useSelector } from 'react-redux';
import { updateSpeechControl } from 'store/actions';
import {
  Container,
  Button,
  ButtonOption,
  NextButton,
  Mic,
  Clear,
  PassButton,
} from './styles';

function App() {
  const [micPermission, setMicPermission] = useState('');
  const [clicked, setClicked] = useState('');
  const [isLinstening, setIsLinstening] = useState(true);
  const [buttons, setButtons] = useState([]);
  const [type, setType] = useState('text');
  const { commands_labels, speech_command } = useSelector(state => state);
  const dispatch = useDispatch();
  const commands = [
    {
      command: commands_labels.mic_off,
      callback: ({ resetTranscript }) => {
        toogleMicrophone();
        resetTranscript();
        setClicked(() => {
          setTimeout(() => setClicked(''), 1200);
          return commands_labels.mic_off;
        });
      },
    },
    {
      command: commands_labels.button,
      callback: ({ resetTranscript }) => {
        toogleButton('button');
        resetTranscript();
      },
    },
    {
      command: commands_labels.text,
      callback: ({ resetTranscript }) => {
        toogleButton('text');
        resetTranscript();
      },
    },
    {
      command: commands_labels.next,
      callback: () => {
        next();
        resetTranscript();
      },
    },
    {
      command: commands_labels.verify,
      callback: ({ resetTranscript }) => {
        next();
        resetTranscript();
      },
    },
    {
      command: commands_labels.send,
      callback: ({ resetTranscript }) => {
        sendDataToDuolinguo();
        resetTranscript();
      },
    },
    {
      command: commands_labels.clear,
      callback: ({ resetTranscript }) => resetTranscript(),
    },
    {
      command: commands_labels.speech_control,
      callback: ({ resetTranscript }) => {
        dispatch(updateSpeechControl(false));
        resetTranscript();
      },
    },
    {
      command: commands_labels.listen,
      callback: ({ resetTranscript }) => {
        sendData('listen');
        resetTranscript();
      },
    },
    {
      command: commands_labels.listen_slow,
      callback: ({ resetTranscript }) => {
        sendData('listen_slow');
        resetTranscript();
      },
    },
    {
      command: commands_labels.speak,
      callback: ({ resetTranscript }) => {
        sendData('speak');
        resetTranscript();
      },
    },
    {
      command: commands_labels.cant_speak,
      callback: ({ resetTranscript }) => {
        sendData('cant_speak');
        resetTranscript();
      },
    },
    {
      command: commands_labels.cant_listen,
      callback: ({ resetTranscript }) => {
        sendData('cant_listen');
        resetTranscript();
      },
    },
  ];
  const connfig = speech_command ? { commands } : {};
  const { transcript, resetTranscript } = useSpeechRecognition(connfig);

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
    SpeechRecognition.startListening({ continuous: true });
  }, []);

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
      if (speech_command) {
        buttons.forEach((btn, index, object) => {
          if (btn === commands_labels.send) {
            object.splice(index, 1);
          }
        });
      }
      sendData(type, { buttons });
    } else {
      let text = transcript;
      if (speech_command) {
        text = (transcript || '').replace(commands_labels.send, ' ');
      }
      sendData(type, {
        text,
      });
    }
  }, [
    buttons,
    commands_labels.send,
    sendData,
    transcript,
    type,
    speech_command,
  ]);

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
    SpeechRecognition.startListening({ continuous: true });
  }, [isLinstening]);

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
    resetTranscript();
  }, [resetTranscript]);

  const clear = useCallback(() => {
    setButtons([]);
    resetTranscript();
  }, [resetTranscript]);

  const toggleCheckbox = useCallback(() => {
    dispatch(updateSpeechControl(!speech_command));
  }, [dispatch, speech_command]);

  return (
    <Container>
      <span>mic: {micPermission}</span>
      <div className="control-container">
        <div>
          <Mic
            onClick={toogleMicrophone}
            clicked={clicked === commands_labels.mic_off}
          >
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
      {type === 'text' && <p>{transcript}</p>}
      {type === 'button' && (
        <div className="btns">
          {(buttons || [])?.map((b, i) => (
            <ButtonOption onClick={() => removeOption(i)} key={i}>
              {b}
            </ButtonOption>
          ))}
        </div>
      )}
      <div className="control">
        <Button
          selected={type === 'text'}
          clicked={type === 'text'}
          onClick={() => toogleButton('text')}
        >
          Texto
        </Button>
        <Button
          selected={type === 'button'}
          clicked={type === 'button'}
          onClick={() => toogleButton('button')}
        >
          Botão
        </Button>
        <Button onClick={() => sendData('listen')}>Escutar</Button>
        <Button onClick={() => sendData('speak')}>Falar</Button>
        <NextButton
          className="next"
          onClick={sendDataToDuolinguo}
          type="button"
        >
          Enviar
        </NextButton>
        <NextButton className="next" onClick={next} type="button">
          Verificar
        </NextButton>
        <NextButton className="next" onClick={next} type="button">
          Próximo
        </NextButton>
        <PassButton
          selected={type === 'button'}
          clicked={type === 'button'}
          onClick={() => toogleButton('button')}
        >
          Não posso falar agora
        </PassButton>
        <PassButton
          selected={type === 'button'}
          clicked={type === 'button'}
          onClick={() => toogleButton('button')}
        >
          Não posso ouvir agora
        </PassButton>
      </div>
      <div className="control-menu">
        <header>
          <span>Ativar comandos de voz</span>
          <button onClick={toggleCheckbox} type="button">
            {speech_command ? (
              <IoMdCheckboxOutline
                className="checkbox"
                fontSize={20}
                color="#2CBBFA"
              />
            ) : (
              <MdCheckBoxOutlineBlank
                className="checkbox"
                fontSize={20}
                color="#9D9D9D"
              />
            )}
          </button>
        </header>
      </div>
    </Container>
  );
}

export default App;
