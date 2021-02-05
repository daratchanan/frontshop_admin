import jwtDecode from "jwt-decode";

const getToken = () => {
   return localStorage.getItem("ACCESS_TOKEN");
   //console.log(getToken);
};

const setToken = (token) => {
   localStorage.setItem("ACCESS_TOKEN", token);
   //console.log(setToken);
};

const clearToken = () => {
   localStorage.clear();
};

const getRole = () => {
   const token = getToken();
   if (token) {
      return "USER"
   } else {
      return "GUEST"
   };
};

const getUser = () => {
   const token = getToken();
   if (token) {
      return jwtDecode(token)
   };
   return null;
};

export default {
   getToken,
   setToken,
   clearToken,
   getRole,
   getUser,
}