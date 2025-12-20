import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/app.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './assets/scss/main.scss';
import { AuthProvider } from './context/AuthContext'; // ✅ add AuthProvider

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </StrictMode>
);
