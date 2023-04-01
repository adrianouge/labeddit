import {
    RenderedPost,
    LikeOrDislikeSection, LikeIcon, DislikeIcon,
    CommentsIcon,
    Comments,
    LikeDislikeCommentsSection,
    SentBy
} from "./styled-components"
import likeIcon from "../images/upvote-icon.png"
import dislikeIcon from "../images/downvote-icon.png"
import commentsIcon from "../images/comments-icon.png"
import { useNavigate } from "react-router-dom"


export const PostCard = (props) => {


    const { post, likePost, dislikePost, goToClickedPost, key } = props
    
    const navigate = useNavigate()


    return (


        <RenderedPost key={key}>
            <SentBy>Enviado por: {post.creator_id}</SentBy>

            <h3 onClick={goToClickedPost}>{post.content}</h3>


            <LikeDislikeCommentsSection>

                <LikeOrDislikeSection>

                    <LikeIcon id={post.post_id} src={likeIcon} alt="like" onClick={likePost} />

                    {post.likes}

                    <DislikeIcon id={post.post_id} src={dislikeIcon} alt="dislike" onClick={dislikePost} />

                </LikeOrDislikeSection>


                <Comments>
                    <CommentsIcon src={commentsIcon} alt="comments" />
                    {post.comments}
                </Comments>


            </LikeDislikeCommentsSection>


        </RenderedPost>
    )
}