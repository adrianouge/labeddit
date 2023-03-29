import { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

import {
    Body, BottomBar, Button,
    ColouredDivider, Header, LabedditIcon,
    NavigateToPage, WriteArea, WriteContent
} from "../components/styled-components"

import { PostCard } from "../components/PostCard"
import labedditLogo from "../images/labeddit-logo.png"
import { LabedditContext } from "../contexts/LabedditContext"
import { CommentCard } from "../components/CommentCard"


export const Post = () => {

    const navigate = useNavigate()


    const context = useContext(LabedditContext)

    const { userToken, setUserToken, postClicked, setPostClicked } = context


    const [postToRender, setPostToRender] = useState({})


    const [newComment, setNewComment] = useState("")

    const [commentsList, setCommentsList] = useState([])

    const onChangeComment = (e) => {
        setNewComment(e.target.value)
    }



    const findPost = async () => {

        try {

            const response = await axios.get(`https://labeddit-back-end-adriano-uge.onrender.com/posts/${postClicked}/`,
                { headers: { Authorization: userToken } })

            setPostToRender(response.data.foundPost)

            return response
        }

        catch (error) { console.log(error) }
    }

    const likePost = async (e) => {

        try {
            const response = await axios.post(`https://labeddit-back-end-adriano-uge.onrender.com/posts/${e.target.id}/like`, {},
                {
                    headers: { Authorization: userToken }
                })
            console.log(response, userToken, e.target.id)
            findPost()
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
            findPost()
            console.log(response, userToken, e.target.id)
            return response
        }

        catch (error) {
            console.log(error)
        }
    }

    const renderFoundPost = (postToRender) => {

        console.log(postToRender)
        if (postToRender !== {}) {
            const goToPost = (e) => {
                navigate('/post')
            }

            return <PostCard
                key={postToRender.post_id}
                post={postToRender}
                likePost={likePost}
                dislikePost={dislikePost}
                goToClickedPost={goToPost} />
        }

        else { return "Post não encontrado." }
    }


    const logoutUser = (e) => {
        setUserToken("nenhum")
        navigate("/signin")
    }


    const getComments = async () => {

        const response = await axios.get(`https://labeddit-back-end-adriano-uge.onrender.com/posts/${postClicked}/comments`,
            { headers: { Authorization: userToken } })

        console.log(response)
        if (response.data.length >= 1) {
            const newCommentsList = []
            for (let i in response.data) {
                newCommentsList.push(response.data[i])
            }
            console.log(newCommentsList)
            setCommentsList(newCommentsList)
        }
        console.log(commentsList)
    }

    const likeComment = async (e) => {

        const response = await axios.post(
            `https://labeddit-back-end-adriano-uge.onrender.com/posts/${postClicked}/like-comment`,
            { comment_id: e.target.id },
            { headers: { Authorization: userToken } }
        )
        getComments()
        console.log(response, e.target.id)

        return response

    }

    const dislikeComment = async (e) => {

        const response = await axios.post(
            `https://labeddit-back-end-adriano-uge.onrender.com/posts/${postClicked}/dislike-comment`,
            { comment_id: e.target.id },
            { headers: { Authorization: userToken } }
        )
        getComments()
        console.log(response)

        return response

    }

    const renderCommentsList = (commentsList) => {

        if (commentsList.length >= 1) {

            return commentsList.map((comment) => {
                return <CommentCard
                    key={comment.comment_id}
                    comment={comment}
                    likeComment={likeComment}
                    dislikeComment={dislikeComment} />
            })
        }

        else { return "Post ainda não tem comentários." }
    }

    const sendComment = async (e) => {
        e.preventDefault()
        const response = await axios.post(`https://labeddit-back-end-adriano-uge.onrender.com/posts/${postClicked}/new-comment`,
            { content: newComment },
            { headers: { Authorization: userToken } })
        setNewComment("")
        getComments()
        console.log(response)
        return response
    }


    useEffect(() => { findPost() }, [postClicked])

    useEffect(() => { getComments() }, [postClicked])


    return (

        <Body>


            <Header>

                <LabedditIcon src={labedditLogo} alt='labeddit-logo' />

                <NavigateToPage onClick={logoutUser}>Logout</NavigateToPage>

            </Header>


            {renderFoundPost(postToRender)}


            <WriteArea>

                <WriteContent
                    placeholder="Escreva seu comentário"
                    value={newComment} onChange={onChangeComment}
                />

                <Button type="submit" onClick={sendComment}> Responder </Button>

            </WriteArea>


            <ColouredDivider />

            {renderCommentsList(commentsList)}

            <BottomBar />


        </Body>
    )
}