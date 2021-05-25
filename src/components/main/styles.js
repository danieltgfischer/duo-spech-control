import styled, { keyframes } from 'styled-components';
import { lighten, darken } from 'polished';

const blink = keyframes`
  from {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const out = keyframes`
 from {
    opacity: 0;
  }
  60% {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 400px;
  width: 100%;
  background-color: #fff;
  .control-container {
    position: relative;
    display: flex;
    width: 80%;
    justify-content: center;
    padding: 15px 70px;
    > div {
      position: relative;
      display: flex;

      .signal {
        position: absolute;
        top: 25px;
        right: -25px;
        z-index: 9999;
        background: #2cbbfa;
        border-radius: 50%;
        height: 15px;
        width: 15px;
        animation: ${blink} 2s infinite ease-in-out forwards;
      }
    }
  }
  > p {
    background-color: #f7f7f7;
    border-radius: 10px;
    padding: 10px 12px;
    border: 1px solid #e5e5e5;
    margin: 0 5px;
    padding: 0 20px;
    font-size: 16px;
    height: 100px;
    width: 80%;
    overflow: scroll;
    color: #3c3c3c;
    overflow-x: hidden;
    ::-webkit-scrollbar {
      width: 3px;
    }
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
    }
    ::-webkit-scrollbar-thumb {
      background-color: #e5e5e5;
    }
  }
  .btns {
    background-color: #fff;
    border-radius: 10px;
    padding: 10px 12px;
    border: 1px solid #e5e5e5;
    margin: 0 5px;
    padding: 0 20px;
    font-size: 16px;
    height: 100px;
    width: 80%;
    overflow: scroll;
    color: #3c3c3c;
    overflow-x: hidden;
    ::-webkit-scrollbar {
      width: 3px;
    }
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
    }
    ::-webkit-scrollbar-thumb {
      background-color: #e5e5e5;
    }
  }

  .control {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 15px 0 0;
    width: 100%;
  }

  .control-menu {
    padding: 15px 0;
    > header {
      display: flex;
      align-items: center;
      .checkbox {
        padding: 0 0 0 4px;
      }
    }
  }
`;

export const NextButton = styled.button`
  position: relative;
  border-width: 2px 2px 4px;
  position: relative;
  background: #58cc02;
  color: #fff;
  border: 1px #58a700;
  border-radius: 10px;
  margin: 10px 0 0;

  width: 80px;
  height: 30px;
  font-weight: bold;

  :hover {
    background: #61e000;
  }

  :active {
    border: none;
  }

  ::before {
    display: ${({ clicked }) => (clicked ? 'static' : 'none')};
    z-index: 1;
    top: -5px;
    left: -5px;
    position: absolute;
    border: 1px solid red;
    width: 84px;
    content: ' ';
    height: 34px;
    animation: ${out} 1s ease-out forwards;
  }
`;

export const Button = styled.button`
  position: relative;
  background: ${({ selected }) => (selected ? '#2CBBFA' : '#fff')};
  color: ${({ selected }) => (selected ? '#fff' : '#4b4b4b')};
  border-width: 2px 2px 4px;
  border: 2px solid
    ${({ selected }) => (selected ? darken(0.02, '#2CBBFA') : '#e5e5e5')};
  border-radius: 10px;
  width: 80px;
  height: 30px;
  font-weight: bold;
  margin: 10px 0 0;

  :hover {
    background: ${({ selected }) =>
      selected ? darken(0.001, '#2CBBFA') : '#f7f7f7'};
  }
  ::before {
    display: ${({ clicked }) => (clicked ? 'static' : 'none')};
    z-index: 1;
    top: -5px;
    left: -5px;
    position: absolute;
    border: 1px solid red;
    width: 84px;
    content: ' ';
    height: 34px;
    animation: ${out} 1s ease-out forwards;
  }
`;

export const ButtonOption = styled.button`
  background: #fff;
  color: #4b4b4b;
  border-radius: 8px;
  border-width: 2px 2px 4px;
  border: 2px solid #e5e5e5;
  padding: 2px 4px;
  font-weight: bold;
  margin: 5px;

  transition: 0.1s;

  :hover {
    box-shadow: 2px 5px 10px #eee;
  }

  :active {
    transform: translateY(1px);
  }
`;

export const Mic = styled.button`
  position: relative;
  align-self: center;
  width: 50px;
  height: 50px;
  margin: 10px 0 0;
  border: 1px solid #e5e5e5;
  border-radius: 50%;
  background-color: #fff;
  :hover {
    transform: scale(1.1);
  }

  ::before {
    display: ${({ clicked }) => (clicked ? 'static' : 'none')};
    z-index: 1;
    top: -5px;
    left: -7px;
    position: absolute;
    border: 1px solid red;
    width: 60px;
    content: ' ';
    height: 54px;
    animation: ${out} 1s ease-out forwards;
  }
`;

export const Clear = styled.button`
  position: absolute;
  right: 55px;
  background-color: #fff;
  width: 30px;
  height: 30px;
  border: 1px solid ${lighten(0.2, '#4b4b4b')};
  border-radius: 8px;
  margin: 10px 0 0;

  :hover {
    transform: scale(1.1);
  }

  ::before {
    /* display: ${({ clicked }) => (clicked ? 'static' : 'none')}; */
    z-index: 1;
    top: -4px;
    left: -4px;
    position: absolute;
    border: 1px solid red;
    width: 34px;
    content: ' ';
    height: 34px;
    animation: ${out} 1s ease-out forwards;
  }
`;

export const PassButton = styled.button`
  position: relative;
  background: #fff;
  color: #4b4b4b;
  border-width: 2px 2px 4px;
  border: 2px solid #e5e5e5;
  border-radius: 10px;
  width: 170px;
  height: 30px;
  margin: 10px 0 0;
  font-weight: bold;
  :hover {
    background: #f7f7f7;
  }
  ::before {
    display: ${({ clicked }) => (clicked ? 'static' : 'none')};
    z-index: 1;
    top: -5px;
    left: -5px;
    position: absolute;
    border: 1px solid red;
    width: 172px;
    content: ' ';
    height: 34px;
    animation: ${out} 1s ease-out forwards;
  }
`;
