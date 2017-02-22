import React from 'react'
import ReactDOM from 'react-dom'
import store from './stores'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Entry from './components/layout/Entry'

injectTapEventPlugin()

const app = (
  <Provider store={store.configureStore()}>
    <MuiThemeProvider>
      <Entry />
    </MuiThemeProvider>
  </Provider >
)

ReactDOM.render(app, document.getElementById('app'))