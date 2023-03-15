import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { PostCard } from "../components/PostCard"
import {
    Body,
    Header, LabedditIcon, NavigateToPage,
    Button, BottomBar, WriteArea, WriteContent, ColouredDivider, PostListSection
} from "../components/styled-components"
import labedditLogo from "../images/labeddit-logo.png"

export const CreatePost = () => {
    const navigate = useNavigate()

    const [postList, setPostList] = useState([])
    const [newPost, setNewPost] = useState("")

    const onChangeNewPost = (e) => {
        setNewPost(e.target.value)
    }

    const postListTest = [
        {
            content: "Olá, mockup do primeiro post",
            userNickname: "Mikio",
            likes: 0,
            dislikes: 0,
            comments: 0
        },
        {
            content: "Olá, mockup do segundo post",
            userNickname: "Rosana",
            likes: 0,
            dislikes: 0,
            comments: 0
        },
    ]

    const renderPostListTest = postListTest.map((post) => {
        return PostCard(post)
    })

    // const renderPostList = postList.map((post) => {
    //     return PostCard(post)
    // })

    const logoutUser = (e) => {

    }

    const createNewPost = (e) => {

    }
    
    useEffect(() => {}, [postList])

    return (


        <Body>


            <Header>

                <LabedditIcon src={labedditLogo} alt='labeddit-logo' />

                <NavigateToPage onClick={logoutUser}>Logout</NavigateToPage>

            </Header>


            <WriteArea>
                
                <WriteContent
                placeholder="Escreva seu post..."
                value={newPost} onChange={onChangeNewPost}/>

                <Button
                type="submit" value="Postar"
                onSubmit={createNewPost}/>

            </WriteArea>


            <ColouredDivider />


            <PostListSection>

                {renderPostListTest}

            </PostListSection>


            <BottomBar />


        </Body>
    )
}