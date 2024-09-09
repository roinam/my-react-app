export const appReducer = (state, action) => {
    const {type, payload} = action;

    switch(type){
        case "UPDATE_TITLE":
            return {...state, title: payload.title}
        
        default:
            throw new Error("No Case Found In appReducer")
    }
}