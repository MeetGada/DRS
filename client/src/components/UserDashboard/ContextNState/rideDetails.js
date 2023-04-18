import { useContext, useState } from "react";
import { rideContext } from "./rideContext";

export const rideData = (props) =>{
    // const contextValue = ;
    const [value, setValue] = useState(null)

    return(
        <rideContext.Provider value={{value, setValue}}>
            {props.children}
        </rideContext.Provider>
    )
}