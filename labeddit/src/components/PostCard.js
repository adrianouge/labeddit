import { RenderedPost,
    LikeOrDislikeSection, LikeIcon, DislikeIcon,
    CommentsIcon, 
    Comments,
    LikeDislikeCommentsSection} from "./styled-components"
import likeIcon from "../images/upvote-icon.png"
import dislikeIcon from "../images/downvote-icon.png"
import commentsIcon from "../images/comments-icon.png"
import { useNavigate } from "react-router-dom"


export const PostCard = (post) => {

    const navigate = useNavigate()

    return(


        <RenderedPost>

            <p>Enviado por: {post.userNickname}</p>

            <h2 onClick={() => navigate(`../post/${post.id}`)}>{post.content}</h2>


            <LikeDislikeCommentsSection>

            <LikeOrDislikeSection>
                <LikeIcon src={likeIcon} alt="like"/>
                {post.likes}
                <DislikeIcon src={dislikeIcon} alt="dislike"/>
            </LikeOrDislikeSection>

            <Comments>
                <CommentsIcon src={commentsIcon} alt="comments"/>
                {post.comments}
            </Comments>

            </LikeDislikeCommentsSection>

            
        </RenderedPost>
    )
}