import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
	body {
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
		font-family: 'Roboto', sans-serif;
	}

	* {
		box-sizing: border-box;
	}

	p, div {
		margin: 0;
	}

	button {
		outline: none;
		appearance: none;
		border: none;
	}
`
