import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';

import Settings from 'material-ui/svg-icons/action/settings';
import History from 'material-ui/svg-icons/action/history';
import Search from 'material-ui/svg-icons/action/search';

const Header = () => {
  return (<Paper zDepth={1}>
    <BottomNavigation>
      <Link to="/">
        <BottomNavigationItem
          label="Поиск"
          icon={<Search />}
        />
      </Link>
      <Link to="/history">
        <BottomNavigationItem
          label="История"
          icon={<History />}
        />
      </Link>
      <Link to="/settings">
        <BottomNavigationItem
          label="Настройки"
          icon={<Settings />}
        />
      </Link>
    </BottomNavigation>
  </Paper>);
};

Header.propTypes = {
  selectedTab: PropTypes.number,
};

Header.defaultPropTypes = {
  selectedTab: 0,
};

export default Header;
