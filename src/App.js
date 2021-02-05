import React, { useState } from 'react'
import localStorage from "./services/localStorage";
import UserContext from './context/UserContext';
import PrivateRoutes from "./views/PrivateRoutes";

export default function App() {
   const [role, setRole] = useState(localStorage.getRole());

   return (
      <>
         <UserContext.Provider value={{role, setRole}}>
            <PrivateRoutes />
         </UserContext.Provider>
      </>
   )
}
