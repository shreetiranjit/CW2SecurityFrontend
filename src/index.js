// External Import
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Internal Import
import App from './App';
import store from './redux/store';

// Import CSS Styles
import './styles/main.css';
import './styles/navbar.css';
import './styles/footer.css';
import './styles/auth.css';
import './styles/sellerNavbar.css';
import './styles/wishlist.css';
import './styles/productPage.css';
import './styles/modalStyle.css';
import './styles/profilePage.css';
import './styles/checkoutPage.css';
// import './styles/chat.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
