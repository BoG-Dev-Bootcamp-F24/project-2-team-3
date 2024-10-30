import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import Login from "./pages/Login/Login";
import SideBar from "./components/SideBar/SideBar";
import MainContent from "./components/MainContent/MainContent";

export default function Home() {
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
