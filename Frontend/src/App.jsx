import React from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import Home from "./pages/Home";
import "./styles/App.css";
import Routes from "./Routes";

/**
 * If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
 */
const MainContent = () => {    
    return (
        <div className="App">
            <AuthenticatedTemplate>
                <Routes></Routes>
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <Home></Home> 
                {/* <Routes></Routes> */}
            </UnauthenticatedTemplate>
        </div>
    );
};

export default function App() {
    return (
        <MainContent></MainContent>
    );
}
