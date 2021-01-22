const userReducer = (state: number, action: any) => {
    switch (action.type) {
        case 'SET':
            return  action.payload
        default:
            return state;
    }
}
export default userReducer;