import { Router } from "./Router/Router";
import { GlobalStyle } from "./globalStyle";
import { LabedditContext } from "./contexts/LabedditContext";
import { useEffect, useState } from "react";
import axios from 'axios'


function App() {

  const [userToken, setUserToken] = useState("nenhum")
  const [postList, setPostList] = useState(["Nenhum post encontrado."])
  const [postClicked, setPostClicked] = useState("nenhum")

  const context = {
    userToken: userToken, setUserToken: setUserToken,
    postList: postList, setPostList: setPostList,
    postClicked: postClicked, setPostClicked: setPostClicked
  }

  const getPostList = async () => {

    try {

      const response = await axios.get('https://labeddit-back-end-adriano-uge.onrender.com/posts',
        {
          headers: { Authorization: userToken }
        })

      console.log(response.data, typeof response.data)

      if (response.data !== "Token inválido.") {
        const newPostList = []
        for (let i in response.data) {
          newPostList.push(response.data[i])
        }
        setPostList(newPostList)
      }

      return response
    }
    catch (error) {
      console.log(error)
    }
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
