import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames'

import {checkMorpionCell} from '../actions'

var MorpionCell;

export default MorpionCell = connect(
    null,
    (dispatch) => {
        return {
            onClick: (position) => {
                dispatch(checkMorpionCell(position))
            }
        }
    }
)(({
    position,
    onClick,
    enabled,
    checked,
    player
}) => {
    const classes = classNames('morpion-grid_cell', {
        '--disabled': checked,
        '--x': player === 1,
        '--o': player === 2
    });

    return (
        <div
            className={classes}
            onClick={event => {
                event.preventDefault();
                if (!checked && enabled) {
                    onClick(position);
                } else {
                    console.warn('Nope')
                }
            }}>
        </div>
    );
});
