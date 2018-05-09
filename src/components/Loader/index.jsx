import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

import CircularProgress from 'material-ui/CircularProgress';

import './loader.css';

export default class Loader extends PureComponent {
  constructor(props) {
    super(props);

    this.el = document.getElementById('loader');
  }

  renderLoader = () => (
    <div className="loader-container layout-body">
      <CircularProgress />
    </div>
  );

  render() {
    return ReactDOM.createPortal(this.renderLoader(), this.el);
  }
}
