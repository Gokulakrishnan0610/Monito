import { createContext, useContext } from "react";

const ContextProvider=createContext()

export const Context=({children})=>{
    const name="pasupathi"
    return(
        <ContextProvider.Provider value={{name

        }}>
            {children}
            
        </ContextProvider.Provider>

    )
    
}
export const useService = () => useContext(ContextProvider);
export default Context