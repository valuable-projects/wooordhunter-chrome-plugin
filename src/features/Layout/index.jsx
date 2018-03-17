import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { withRouter } from 'react-router';

import Header from './components/Header';

class Layout extends PureComponent {
  static propTypes = {
    children: PropTypes.array.isRequired,
  };

  render() {
    return (<MuiThemeProvider>
      <Header />
      {this.props.children}
    </MuiThemeProvider>);
  }
}

export default withRouter(Layout);
