import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

import './history_line.css';

export default class HistoryLine extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    word: PropTypes.string,
  };

  static defaultProps = {
    word: '',
  };

  onClick = () => {
    this.props.onClick(this.props.word);
  };

  onDelete = () => {
    this.props.onDelete(this.props.id);
  };

  render() {
    const { word } = this.props;
    return (
      <Paper zDepth={3} className="history-line-paper">
        <FlatButton className="history-line-word-button" onClick={this.onClick}>
          {word}
        </FlatButton>
        <IconButton tooltip={`Удалить ${word} из истории`} onClick={this.onDelete}>
          <DeleteIcon color="rgba(186, 193, 148, 0.5)" hoverColor="rgba(186, 193, 148, 0.85)" />
        </IconButton>
      </Paper>
    );
  }
}
