import RegisterPage from "../views/RegisterPage";
import LoginPage from "../views/LoginPage";
import InputProduct from "../views/InputProduct";
import ProductList from "../views/ProductList";

const components = {
   register: {
      path: "/register",
      page: RegisterPage
   },
   login: {
      path: "/",
      page: LoginPage
   },
   inputproduct: {
      path: "/inputproduct",
      page: InputProduct
   },
   productlist: {
      path: "/productlist",
      page: ProductList
   },
};

const roles = {
   GUEST: [
      components.register,
      components.login,
   ],
   USER: [
      components.inputproduct,
      components.productlist,
   ],
};

export default roles;