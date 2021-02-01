import PrivateRoutes from "./views/PrivateRoutes";
import localStorage from "./services/localStorage"
import { useState } from "react";
import UserContext from "./context/UserContext";

function App() {

   const [role, setRole] = useState(localStorage.getRole());

   return (
      <>
         <UserContext.Provider value={{ role, setRole }}>
            <PrivateRoutes />
         </UserContext.Provider>
      </>
   );
}

export default App;
