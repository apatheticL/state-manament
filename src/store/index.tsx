import React from 'react';
import {Provider} from 'react-redux';

import {createStore, applyMiddleware, Store} from 'redux';
import thunk from 'redux-thunk';
import ReducerManager from './reducerManager';
import {persistReducer, persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Define your state shape
interface RootState {}

let reducerManager: any = null;

let persistedReducer: any = null;

// @ts-ignore
export let store: Store<RootState, RootAction> | null = null;

export const addNewReducer = (name: string, reducer: any) => {
  if (reducerManager != null) {
    reducerManager.add(name, reducer);
    // @ts-ignore
    store.replaceReducer(persistedReducer);
  } else {
    console.warn('reducerManager is null');
  }
};

// @ts-ignore
export const addMultiNewReducer = (reducers: object[]) => {
  if (reducerManager != null) {
    reducerManager.addMulti(reducers);
    // @ts-ignore
    store.replaceReducer(persistedReducer);
  } else {
    console.warn('reducerManager is null');
  }
};

let persistor: any = null;

export const configStore = (rootReducers: any, storage: any) => {
  const persistConfig = {
    key: 'root',
    storage,
  };
  const initialReducers = {...rootReducers};

  reducerManager = new ReducerManager<any, any>(
    // @ts-ignore
    initialReducers,
  );
  persistedReducer = persistReducer(
    persistConfig,
    reducerManager.getRootReducer(),
  );
  store = createStore(persistedReducer, applyMiddleware(thunk));
  persistor = persistStore(store);
};

// @ts-ignore
const StoreProvider = ({children}) => {
  if (store == null) {
    const persistConfig = {
      key: 'root',
      storage: AsyncStorage,
    };
    persistedReducer = persistReducer(
      persistConfig,
      reducerManager.getRootReducer(),
    );
    store = createStore(persistedReducer, applyMiddleware(thunk));
  }
  if (persistor == null) {
    persistor = persistStore(store);
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default StoreProvider;
