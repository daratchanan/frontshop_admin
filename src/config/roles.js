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
   inputProduct: {
      path: "/inputproduct",
      page: InputProduct
   },
   productList: {
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
      components.inputProduct,
      components.productList
   ],
}

export default roles;