import React, { createContext, Dispatch } from 'react';
import { initialState } from '../constants';
import { Building } from './../../models/index';

type InitialStateType = {
  buildings: Building[];
  selectedUser: string
}

export const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null
});