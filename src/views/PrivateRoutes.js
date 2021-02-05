import React, { useContext } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import roleList from "../config/roles";
import UserContext from '../context/UserContext';
import PageNotFound from "../views/PageNotFound";

export default function PrivateRoutes() {
   const { role } = useContext(UserContext);
   const pageList = roleList[role];

   return (
      <>
         <BrowserRouter>
            <Switch>
               {pageList.map(({ path, page }, idx) =>
                  <Route key={idx} path={path} component={page} />
               )}
               <Route path="*" component={PageNotFound}/>
            </Switch>
         </BrowserRouter>
      </>
   )
};
