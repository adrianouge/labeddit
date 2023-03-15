import { PostCard } from "../components/PostCard"
import { Body, BottomBar, Button, ColouredDivider, Header, LabedditIcon, NavigateToPage, WriteArea, WriteContent } from "../components/styled-components"
import labedditLogo from "../images/labeddit-logo.png"

export const Post = () => {
    const foundPost = async(post) => {

    }
    const postFoundMock = {
        content: "Olá, mockup do primeiro post",
        userNickname: "Mikio",
        likes: 0,
        dislikes: 0,
        comments: 0
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

    return (
        
        <Body>
            <Header>
                <LabedditIcon src={labedditLogo} alt='labeddit-logo' />
                <NavigateToPage>Logout</NavigateToPage>
            </Header>
            {PostCard(postFoundMock)}
            <WriteArea>
                <WriteContent placeholder="Escreva seu comentário" />
                <Button type="submit" value="Responder" />
            </WriteArea>
            <ColouredDivider />
            <br/>
            <br/>
            {renderPostListTest}
            <BottomBar />
        </Body>
    )
}