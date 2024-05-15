import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
* {
padding: 0;
margin: 0;
box-sizing: border-box;
}

:focus {
outline: none;
box-shadow: 1px solid ${(props) => props.theme.colors.green100};
}

body {
color: ${(props) => props.theme.colors.gray100};
background: ${(props) => props.theme.colors.gray900};
-webkit-font-smoothing: antialiased;
}

body, input, textarea, button {
font-family: 'Roboto', sans-serif;
font-weight: 400;
font-size: 1rem;
}
`
