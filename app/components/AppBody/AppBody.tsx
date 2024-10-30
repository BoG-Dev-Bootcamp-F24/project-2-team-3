import { useState } from "react"
import Login from "./Login"
import SideBar from "./SideBar";
import MainContent from "./MainContent";

export default function AppBody() {
    const [loggedIn, setLoggedIn] = useState(false);

    return(
        (loggedIn ?
            <Login />
        :
        <div className="app-body">
            <SideBar />
            <MainContent />
        </div>
        )
        
    )
}