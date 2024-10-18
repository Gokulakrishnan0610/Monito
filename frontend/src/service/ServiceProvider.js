import { createContext, useContext } from "react";

const ContextProvider = createContext()

export const Context = ({ children }) => {

   


  
    return (
        <ContextProvider.Provider value={{
            // for auth 
         
            

        }}>
            {children}

        </ContextProvider.Provider>

    )

}
export const useService = () => useContext(ContextProvider);
export default Context