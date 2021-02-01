import React, { useContext } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import UserContext from '../context/UserContext';
import roleList from "../config/roles";
import PageNotfound from "./PageNotFound";

export default function PrivateRoutes() {
   const { role, setRole } = useContext(UserContext);
   const pageList = roleList[role];

   return (
      <>
         <BrowserRouter>
            <Switch>
               {pageList.map(({path,page}, idx) =>
                  <Route key={idx} exact path={path} component={page} />
               )}
               <Route path="*" component={PageNotfound}/>
            </Switch>
         </BrowserRouter>
      </>
   )
}
