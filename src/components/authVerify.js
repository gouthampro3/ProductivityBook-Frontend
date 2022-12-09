import { withRouter } from "react-router-dom";
import useAuth from './useAuth'

const AuthVerifyComponent = ({ history }) => {
    const {logout} = useAuth();
    // history.listen(() => {  // <--- Here you subscribe to the route change
    //     if (localStorage.getItem("user")) {
    //         const jwt_Token_decoded = Jwt_Decode(JSON.parse(localStorage.getItem("user")).access_token);
    //         console.log(jwt_Token_decoded.exp * 1000);
    //         console.log(Date.now());
    //         if (jwt_Token_decoded.exp * 1000 < Date.now()) {
    //             logout()
    //         } else {
    //             initialstate.user = jwt_Token_decoded;
    //         }
    //     }
    // });
    return <div></div>;
};

export default withRouter(AuthVerifyComponent);