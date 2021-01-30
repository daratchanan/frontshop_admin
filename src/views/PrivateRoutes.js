import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import roleList from "../config/roles";
import PageNotFound from './PageNotFound';

export default function PrivateRoutes() {
   const role = "GUEST";
   const pageList = roleList[role]
//   console.log(pageList[0].path);
   return (
      <>
         <BrowserRouter>
            <Switch>
               {pageList.map((view, idx) =>
                  // console.log(view)
                  <Route key={idx} exact path={view.path} component={view.page} />
               )}
               <Route path="*" component={PageNotFound}/>
            </Switch>
         </BrowserRouter>
      </>
   )
}
