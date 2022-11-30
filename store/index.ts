import {createWrapper, Context, MakeStore, HYDRATE} from 'next-redux-wrapper';
import { Store } from 'redux'
import {configureStore} from '@reduxjs/toolkit'
import createSagaMiddleware, {Task} from 'redux-saga'
import { combineReducers } from '@reduxjs/toolkit'
import playerReducer  from './playerSlicer';
import tracksReducer  from './tracksSlicer';
import rootSaga from './sagas';

 const rootReducer = combineReducers({
    player: playerReducer,
    tracks: tracksReducer
})

export type RootState = ReturnType<typeof rootReducer>


export interface SagaStore extends Store {
  sagaTask?: Task;
}

export const reducer = (state:any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (state.count) nextState.count = state.count; // preserve count value on client side navigation
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

let sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
    reducer,
    middleware: [sagaMiddleware],
})

const makeStore = (context: Context) => {
  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);
  return store
}

export const wrapper = createWrapper<Store<RootState>>(makeStore, {debug: true}); 

// sagaMiddleware.run(rootSaga)


//  middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(middleware),

