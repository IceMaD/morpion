const gridMap = (grid, callback) => {
    return grid.map(row => {
        return row.map(cell => {
            return callback(cell)
        })
    })
};

const initGrid = (reducer, action) => {
    return [...Array(3)].map(function(undefinedX, rowIndex) {
        return [...Array(3)].map(function(undefinedX, cellIndex) {
            return reducer(
                void 0,
                {...action, position: `${rowIndex}${cellIndex}`}
            )
        })
    });
};

const morpionCell = (state = {}, action) => {
    switch (action.type) {
        case '@@INIT':
            return {
                ...state,
                checked: false,
                player: void 0,
                position: action.position
            };
        case 'CHECK_MORPION_CELL':
            if (state.position !== action.position.cell) {
                return state;
            }

            return {
                ...state,
                checked: true,
                player: action.player
            };
        default:
            return state
    }
};

export const positions = (state, action) => {
    switch (action.type) {
        case '@@INIT':
            return {
                1: {},
                2: {}
            };
        case 'CHECK_MORPION_CELL':
            let newState = {...state};
            newState[action.player][action.position.cell] = true;

            return newState;
        default:
            return state;
    }
};

export const morpionGrid = (state, action) => {

    /* @TODO Find a way to make this cleaner */
    const getWinner = (position) => {
        switch (true) {
            case position[1]['00'] && position[1]['01'] && position[1]['02']:
            case position[1]['10'] && position[1]['11'] && position[1]['12']:
            case position[1]['20'] && position[1]['21'] && position[1]['22']:
            case position[1]['00'] && position[1]['10'] && position[1]['20']:
            case position[1]['01'] && position[1]['11'] && position[1]['21']:
            case position[1]['02'] && position[1]['12'] && position[1]['22']:
            case position[1]['00'] && position[1]['11'] && position[1]['22']:
            case position[1]['02'] && position[1]['11'] && position[1]['20']:
                return 1;
            case position[2]['00'] && position[2]['01'] && position[2]['02']:
            case position[2]['10'] && position[2]['11'] && position[2]['12']:
            case position[2]['20'] && position[2]['21'] && position[2]['22']:
            case position[2]['00'] && position[2]['10'] && position[2]['20']:
            case position[2]['01'] && position[2]['11'] && position[2]['21']:
            case position[2]['02'] && position[2]['12'] && position[2]['22']:
            case position[2]['00'] && position[2]['11'] && position[2]['22']:
            case position[2]['02'] && position[2]['11'] && position[2]['20']:
                return 2;
            default:
                return void 0;
        }
    };

    switch (action.type) {
        case '@@INIT':
            return {
                ...state,
                position: action.position,
                positions: positions(void 0, action),
                enabled: true,
                cells: initGrid(morpionCell, action)
            };
        case 'CHECK_MORPION_CELL':
            let newState = {
                ...state,
                enabled: state.position === action.position.cell
            };

            if(state.position === action.position.grid) {
                newState.cells = gridMap(state.cells, cell => morpionCell(cell, action));
                newState.positions = positions(state.positions, action);
                newState.winner = newState.winner || getWinner(state.positions);
            }

            return newState;

        default:
            return state
    }
};

const player = (state = 1, action) => {
    switch (action.type) {
        case 'CHECK_MORPION_CELL':
            return state === 1 ? 2 : 1;
        default:
            return state
    }
};

export const grid = (state, action) => {

    state = state || {
        player: player(void 0, action),
        morpionGrids: initGrid(morpionGrid, action)
    };

    switch (action.type) {
        case 'CHECK_MORPION_CELL':

            return {
                ...state,
                player: player(state.player, action),
                morpionGrids: gridMap(state.morpionGrids, cell => morpionGrid(cell, {...action, player: state.player}))
            };
        default:
            return state
    }
};



