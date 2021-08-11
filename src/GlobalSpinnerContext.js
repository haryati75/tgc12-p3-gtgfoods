import React, {useState, createContext, useContext } from 'react';

const GlobalSpinnerContext = createContext();
const GlobalSpinnerActionsContext = createContext();

export const useGlobalSpinnerContext = () => useContext(GlobalSpinnerContext);
export const useGlobalSpinnerActionsContext = () => useContext(GlobalSpinnerActionsContext);

const GlobalSpinnerContextProvider = (props) => {
    const [isGlobalSpinnerOn, setGlobalSpinner] = useState(false);

    return (
        <GlobalSpinnerContext.Provider value={isGlobalSpinnerOn}>
            <GlobalSpinnerActionsContext.Provider value={setGlobalSpinner}>
                {props.children}
            </GlobalSpinnerActionsContext.Provider>
        </GlobalSpinnerContext.Provider>
    )
}

export default GlobalSpinnerContextProvider;