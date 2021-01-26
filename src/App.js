import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import RegisterPage from "./views/RegisterPage";
import LoginPage from "./views/LoginPage";
import InputProduct from "./views/InputProduct";

function App() {
   return (
      <BrowserRouter>
         <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route path='/register' component={RegisterPage} />
            <Route path='/inputproduct' component={InputProduct} />
         </Switch>
      </BrowserRouter>
   );
}

export default App;
