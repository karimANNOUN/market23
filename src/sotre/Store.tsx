import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./CartSlice";
import storage from 'redux-persist/lib/storage';
import {persistReducer , FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER} from 'redux-persist'
import {combineReducers} from '@reduxjs/toolkit'

const persistConfig={
    key:"root",
    version:1,
    storage
  }
  
  const reducer=combineReducers({
    app:cartReducer,
    
  })
  
  const persistreducer =persistReducer(persistConfig,reducer)
  
  
  
  
  
  export const store = configureStore({
    reducer: persistreducer ,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  })

