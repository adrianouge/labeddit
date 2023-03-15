import { Router } from "./Router/Router";
import { GlobalStyle } from "./globalStyle";
import { LabedditContext } from "./contexts/LabedditContext";
import { useState } from "react";

function App() {
  const [postList, setPostList] = useState([])
  const [userList, setUserList] = useState([])
  const context = { postList, setPostList, userList, setUserList }

  const getPostList = () => {
    postList.push()
  }

  const getUserList = () => {
    userList.push()
  }
  
  return (
    <>
      <GlobalStyle />
      <LabedditContext.Provider value={context}>
      <Router />
      </LabedditContext.Provider>
    </>
  );
}

export default App;
