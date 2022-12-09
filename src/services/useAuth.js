import * as React from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

const API_URL = process.env.REACT_APP_API_URL;
const authContext = React.createContext();

function useAuth() {
    const [authed, setAuthed] = React.useState(false);

    return {
        authed,
        login(username, password) {
            return axios.post(API_URL + "/api/signin", {
                    email:username,
                    password
                }).then(
                    (response)=>{
                        console.log (response.headers);
                        if (response.headers.hasOwnProperty('x-auth-token')) {
                            localStorage.setItem("user", response.headers['x-auth-token']);
                            setAuthed(true);
                            return{
                                "status":"success",
                                "message":"Successfully logged in!"
                            }
                        }
                    },
                    
                ).catch((error)=>{
                    setAuthed(false);
                    return{
                        "status":"error",
                        "message":error.response.data.error
                    }
                });
        },
        signup(firstanme, lastname,email, password, cnfpassword) {
            return axios.post(API_URL + "/api/signup", {
                    firstname:firstanme,
                    lastname:lastname,
                    email:email,
                    password:password,
                    confirmPassword:cnfpassword
                }).then(
                    (response)=>{
                        console.log (response.headers);
                        return{
                            "status":"success",
                            "message":"Successfully Created!"
                        }
                    },
                    
                ).catch((error)=>{
                    setAuthed(false);
                    return{
                        "status":"error",
                        "message":error.response.data.error
                    }
                });
        },
        logout() {
            localStorage.removeItem("user");
            setAuthed(false);
        },
        getCurrentUser() {
            if (localStorage.getItem("user")) {
                const jwt_Token_decoded = jwt_decode(localStorage.getItem("user"));
                // console.log(jwt_Token_decoded.exp * 1000);
                // console.log(Date.now());
                if (jwt_Token_decoded.exp * 1000 < Date.now()) {
                    localStorage.removeItem("user");
                    // Causing Warnings: modify this set state
                    setAuthed(false);
                } else {
                    // Causing Warnings: modify this set state
                    setAuthed(true);
                    return {status:true, access_token:localStorage.getItem('user')};
                }
            }
            return {"status":false}
        }
    };
}

export function AuthProvider({ children }) {
    const auth = useAuth();

    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

export default function AuthConsumer() {
    return React.useContext(authContext);
}