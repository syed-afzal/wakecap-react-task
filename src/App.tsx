import * as React from "react";
import { UserCombo } from './components/UserCombo';
import mainReducer from './state/reducer';
import { initialState } from './state/constants';
import { AppContext } from './state/context'
import {Index} from './components/buildings';

export const App = () => {

  const [state, dispatch] = React.useReducer(mainReducer, initialState);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch
      }}>
        <UserCombo />
        <Index />
    </AppContext.Provider>
  )
};