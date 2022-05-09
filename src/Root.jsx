import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from './services/common/history';
// BrowserRouter
// import ConfigService from './services/common/config-service';

import App from './components/App';

export default function Root ({ store }) {
  return (
    <Provider store={store}>
      <Router history={history}>
        <App/>
      </Router>
    </Provider>
  );
}

Root.propTypes = {
  store: PropTypes.object
};
