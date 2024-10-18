import { createContext, useContext } from "react";

const ContextProvider = createContext()

export const Context = ({ children }) => {


    // user signup
    const signUp = async (state) => {
        try {
            // const responce = await axios.post(`${PORT}/signup`, state)
            return
            // responce.data
        } catch (error) {
            // return error.response.data
        }
    }

    const logIn = async (state) => {
        // try {
        //   const responce = await axios.get(`${PORT}/login`, {
        //     params: state
        //   })
        //   return responce.data
        // } catch (error) {
        //   return error.response.data
        // }
    }

    // password reset
    const passwordReset = async (state) => {
        // try {
        //     const responce = await axios.post(`${PORT}/passwordreset`, state)

        //     return responce.data
        // } catch (error) {
        //     return error.response.data



        // }

    }
    return (
        <ContextProvider.Provider value={{
            // for auth 
            signUp, logIn, passwordReset

        }}>
            {children}

        </ContextProvider.Provider>

    )

}
export const useService = () => useContext(ContextProvider);
export default Context