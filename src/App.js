import { BrowserRouter, Switch, Route } from "react-router-dom";
import RegisterPage from "./views/RegisterPage";
import LoginPage from "./views/LoginPage";
import InputProduct from "./views/InputProduct";
import ProductList from "./views/ProductList";

function App() {
   return (
      <BrowserRouter>
         <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route path='/register' component={RegisterPage} />
            <Route path='/inputproduct' component={InputProduct} />
            <Route path='/productlist' component={ProductList} />
         </Switch>
      </BrowserRouter>
   );
}

export default App;
