import React from 'react';
import PropTypes from 'prop-types';
import '../scss/main.scss';

const App = ({ title }) => <h1 className="title-app">{title}</h1>;

App.propTypes = {
  title: PropTypes.string,
};

App.defaultProps = {
  title: '',
};

export default App;
