import React,{useState} from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import roleList from "../config/roles";
import PageNotFound from "./PageNotFound";
import localStorage from "../services/localStorage";

export default function PrivateRoutes() {
   const [role, setRole] = useState(localStorage.getRole());

   const pageList = roleList[role];

   return (
      <>
         <BrowserRouter>
            <Switch>
               {pageList.map((page, idx) =>
                  <Route key={idx} exact path={page.path} component={page.page} />
               )}
               <Route path="*" component={PageNotFound} />
            </Switch>
         </BrowserRouter>
      </>
   )
}
