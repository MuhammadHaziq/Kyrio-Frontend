// import jwt from "jsonwebtoken";

const LoginCheck = () => {
  let token = localStorage.getItem("kyrio");
  try {
    if (
      typeof token !== "undefined" &&
      token !== false &&
      token !== "false" &&
      token !== "" &&
      token !== null
    ) {
      return true;
       
    } else {
      return false;
    }
  }catch(e){
    return false;
  }
};
export default LoginCheck;
