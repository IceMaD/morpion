import React from 'react';
import {connect} from 'react-redux';

import MorpionGrid from './MorpionGrid';

let Grid;

export default Grid = connect(
    (state) => {
        return {
            morpionGrids: state.grid.morpionGrids
        }
    }
)(({
    morpionGrids
}) => {
    return (
        <div className={'table'}>
            {morpionGrids.map((row, rowIndex) => (
                <div className={'table_row'} key={rowIndex}>
                    {row.map((morpionGrid, colIndex) => (
                        <div className={'table_cell'} key={colIndex}>
                            <MorpionGrid grid={morpionGrid} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
});
