import { createContext, useContext, useEffect } from "react";

export const rideContext = createContext(null)

// export const rideFunction = () => {
//     const { value, setValue } = useContext(rideContext);

//     useEffect(() => {
//         setValue('new value');
//         // console.log(item)
//     }, []);

//     return (
//         <div>
//           <p>Context value: {value}</p>
//         </div>
//     );
// }