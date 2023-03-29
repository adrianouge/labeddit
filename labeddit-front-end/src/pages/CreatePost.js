import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { PostCard } from "../components/PostCard"
import axios from "axios"

import {
    Body,
    Header, LabedditIcon, NavigateToPage,
    Button, BottomBar, WriteArea, WriteContent, ColouredDivider, PostListSection, RenderedPost
} from "../components/styled-components"

import { LabedditContext } from "../contexts/LabedditContext"
import labedditLogo from "../images/labeddit-logo.png"


export const CreatePost = () => {

    const context = useContext(LabedditContext)

    const { userToken, setUserToken,
        postList, setPostList,
        postClicked, setPostClicked } = context


    const navigate = useNavigate()


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


    const [newPost, setNewPost] = useState("")

    const onChangeNewPost = (e) => {
        setNewPost(e.target.value)
    }

    const createNewPost = async (e) => {

        try {
            e.preventDefault()

            const body = { content: newPost }
            const response = await axios.post(
                'https://labeddit-back-end-adriano-uge.onrender.com/posts',
                body,
                {
                    headers: {
                        Authorization: userToken
                    }
                })
            setNewPost("")

            if (response.data.message === 'Post criado com sucesso.') {
                getPostList()
            }

            return console.log(response)
        }

        catch (error) { console.log(error) }
    }


    const likePost = async (e) => {
        try {
            const response = await axios.post(`https://labeddit-back-end-adriano-uge.onrender.com/posts/${e.target.id}/like`, {},
                {
                    headers: { Authorization: userToken }
                })
            console.log(response)
            getPostList()
            return response
        }

        catch (error) {
            console.log(error)
        }
    }

    const dislikePost = async (e) => {

        try {
            const response = await axios.post(`https://labeddit-back-end-adriano-uge.onrender.com/posts/${e.target.id}/dislike`, {},
                {
                    headers: { Authorization: userToken }
                })
            console.log(response)
            getPostList()
            return response
        }

        catch (error) {
            console.log(error)
        }
    }


    const renderPostCard = (postList) => {
        if (postList.length > 0) {
            return postList.map(
                (post) => {

                    const goToPost = (e) => {
                        setPostClicked(post.post_id)
                        navigate('/post')
                    }


                    return <PostCard
                        key={post.post_id}
                        post={post}
                        likePost={likePost}
                        dislikePost={dislikePost}
                        goToClickedPost={goToPost}
                    />
                }
            )
        }

        else {
            return "Ainda não há posts"
        }
    }

    const logoutUser = (e) => {
        setUserToken("nenhum")
        navigate("/signin")
    }


    useEffect(() => { getPostList() }, [userToken])


    return (


        <Body>


            <Header>

                <LabedditIcon src={labedditLogo} alt='labeddit-logo' />

                <NavigateToPage onClick={logoutUser}>Logout</NavigateToPage>

            </Header>


            <WriteArea>

                <WriteContent
                    placeholder="Escreva seu post..."
                    value={newPost} onChange={onChangeNewPost} />

                <Button
                    type="submit" value="Postar"
                    onClick={createNewPost}>
                    Postar!
                </Button>

            </WriteArea>


            <ColouredDivider />


            <PostListSection>

                {renderPostCard(postList)}

            </PostListSection>


            <BottomBar />


        </Body>
    )
}