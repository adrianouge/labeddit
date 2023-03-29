import {
    RenderedComment,
    LikeOrDislikeSection, LikeIcon, DislikeIcon,
    LikeDislikeSection
} from "./styled-components"

import likeIcon from "../images/upvote-icon.png"
import dislikeIcon from "../images/downvote-icon.png"


export const CommentCard = (props) => {

    const { comment, likeComment, dislikeComment, key } = props

    return (


        <RenderedComment key={key}>
            
            Enviado por: {comment.commmenter_id}

            <h3>{comment.content}</h3>


            <LikeDislikeSection>

                <LikeOrDislikeSection>

                    <LikeIcon
                        id={comment.comment_id}
                        src={likeIcon}
                        alt="like"
                        onClick={likeComment}
                    />

                    {comment.likes}

                    <DislikeIcon
                        id={comment.comment_id}
                        src={dislikeIcon}
                        alt="dislike"
                        onClick={dislikeComment}
                    />

                </LikeOrDislikeSection>


            </LikeDislikeSection>


        </RenderedComment>
    )
}