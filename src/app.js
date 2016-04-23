import {createStore, combineReducers, compose} from 'redux';
import ReactDom from 'react-dom';
import React from 'react';
import {Provider} from 'react-redux';
import devTools from 'remote-redux-devtools';

import Grid from './Component/Grid';

import {grid} from './reducers';

const store = createStore(
    combineReducers({
        grid
    }),
    undefined,
    compose(
        devTools()
    )
);

ReactDom.render(
    <Provider store={store}><Grid /></Provider>,
    document.getElementById('root')
);
