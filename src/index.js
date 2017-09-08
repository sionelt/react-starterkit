import 'react-hot-loader/patch'
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './App'

const RENDER = Component => {
	render(
		<AppContainer>
			<App />
		</AppContainer>,
		document.getElementById('app')
	)
}

RENDER(App)

if (module.hot) {
	module.hot.accept('./App', () => {
		RENDER(App)
	})
}





















