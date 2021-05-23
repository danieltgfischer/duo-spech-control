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
      > .mic {
        align-self: center;
        width: 50px;
        height: 50px;
        border: 1px solid #e5e5e5;
        border-radius: 50%;
        background-color: #fff;
        :hover {
          transform: scale(1.1);
        }
      }

      .signal {
        position: absolute;
        top: 15px;
        right: -25px;
        z-index: 9999;
        background: red;
        border-radius: 50%;
        height: 15px;
        width: 15px;
        animation: ${blink} 2s infinite ease-in-out forwards;
      }
    }
    .clear {
      position: absolute;
      right: 55px;
      background-color: #fff;
      width: 30px;
      height: 30px;
      border: 1px solid ${lighten(0.2, '#9D9D9D')};
      border-radius: 8px;
      :hover {
        transform: scale(1.1);
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
    justify-content: space-around;
    margin: 15px 0 0;
    width: 100%;

    .next {
      background: #58cc02;
      color: #fff;
      border-radius: 16px;
      border-color: #58a700;
      border-width: 2px 2px 4px;
      width: 100px;
      height: 50px;
      font-weight: bold;
      :hover {
        background: #61e000;
      }
      :active {
        border: none;
      }
    }
  }
`;

export const Button = styled.button`
  background: ${({ selected }) => (selected ? '#2CBBFA' : '#fff')};
  color: ${({ selected }) => (selected ? '#fff' : '#9D9D9D')};
  border-radius: 16px;
  border-width: 2px 2px 4px;
  border: 2px solid #e5e5e5;
  width: 100px;
  height: 50px;
  font-weight: bold;
  :hover {
    background: ${({ selected }) =>
      selected ? darken(0.05, '#2CBBFA') : '#f7f7f7'};
  }
`;

export const ButtonOption = styled.button`
  background: #fff;
  color: #9d9d9d;
  border-radius: 8px;
  border-width: 2px 2px 4px;
  border: 2px solid #e5e5e5;
  padding: 2px 4px;
  font-weight: bold;
  margin: 5px;
  :hover {
    background: #f7f7f7;
  }
`;
