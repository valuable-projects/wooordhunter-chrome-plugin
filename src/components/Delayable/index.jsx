import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import isFunction from 'lodash/isFunction';

export default class Delayable extends PureComponent {
  static propTypes = {
    active: PropTypes.bool,
    children: PropTypes.func.isRequired,
    delay: PropTypes.number,
  };

  static defaultProps = {
    active: false,
    delay: 1500,
  };

  static getDerivedStateFromProps(nextProps) {
    if (!nextProps.active) {
      return { childrenDisplayed: false };
    }

    return null;
  }

  state = { childrenDisplayed: false };

  componentDidMount() {
    const { active, delay } = this.props;

    if (active) {
      this.unsubscribe = setTimeout(this.showChildren, delay);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      props: nextProps,
      props: { delay },
    } = this;

    if (nextProps.active !== prevProps.active) {
      switch (nextProps.active) {
        case true: {
          this.unsubscribe = setTimeout(this.showChildren, delay);
          break;
        }
        case false: {
          this.releaseSubscription();
          break;
        }
        default: {
          throw Error('Active flag should have boolean value');
        }
      }
    }

    return null;
  }

  componentWillUnmount() {
    this.releaseSubscription();
  }

  releaseSubscription = () => {
    if (isFunction(this.unsubscribe)) {
      this.unsubscribe();
    }
  };

  showChildren = () => this.setState({ childrenDisplayed: true && this.props.active });

  render() {
    const { childrenDisplayed } = this.state;

    if (!childrenDisplayed) return null;

    return React.Children.only(this.props.children);
  }
}
