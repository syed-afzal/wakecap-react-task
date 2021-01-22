import buildingReducer from "./building.reducer"
import userReducer from './user.reducer';

const mainReducer = (state: any, action: any) => ({
    buildings: buildingReducer(state.buildings, action),
    selectedUser: userReducer(state.selectedUser, action)
});

export default mainReducer;