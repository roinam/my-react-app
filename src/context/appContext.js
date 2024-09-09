import { useContext, useReducer } from "react";
import { createContext } from "react";
import { appReducer } from "../reducer/appReducer";

const initialState = {
    title: ""
}

const AppContext = createContext(initialState);

export const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    const updateTitle = (text) => {
        
        dispatch({
            type: "UPDATE_TITLE",
            payload: {
                title: text
            }
        })
    };

    const value = {
        title: state.title,
        updateTitle
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppData = () => {
    const context = useContext(AppContext);
    return context;
}