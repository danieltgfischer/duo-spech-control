import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
  html, body {
    min-height: 150px!important;
    width: 350px!important;
    font-family: Roboto, sans-serif;
    ::-webkit-scrollbar {
      width: 0;
      display: none;
    }
  }

  #root {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  button {
    cursor: pointer;
    outline: none;
    border: none;
  }

`;

export default GlobalStyle;
