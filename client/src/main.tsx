import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { MyContextProvider } from './context/myContext.tsx'
import store, { persistor } from './redux/store.jsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <MyContextProvider>
          <App />
      </MyContextProvider>
    </PersistGate>
  </Provider>
  // </React.StrictMode>,
)

