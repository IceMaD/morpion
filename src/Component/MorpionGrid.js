import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames'

import MorpionCell from './MorpionCell'

var MorpionGrid;

export default MorpionGrid = connect()(({
    grid
}) => {
    const classes = classNames('morpion-grid', {
        '--disabled': !grid.enabled,
        '--x': grid.winner === 1,
        '--o': grid.winner === 2}
    );

    return (
        <div
            className={classes}>

            {grid.cells.map((row, rowIndex) => (
                <div key={rowIndex} className={'morpion-grid_row'}>

                    {row.map((cell, colIndex) => (
                        <MorpionCell
                            key={colIndex}
                            checked={cell.checked}
                            player={cell.player}
                            position={{grid: grid.position, cell: cell.position}}
                            enabled={grid.enabled} />
                    ))}

                </div>
            ))}

        </div>
    );
});
