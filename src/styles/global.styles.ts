import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
	body {
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
		font-family: 'Roboto', sans-serif;
		background-color: #E1C478;
	}

	* {
		box-sizing: border-box;
	}

	p, div {
		margin: 0;
	}

	button {
		appearance: none;
		border: none;
	}
`
