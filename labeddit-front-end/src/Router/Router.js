import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Signup } from "../pages/Signup"
import { Signin } from "../pages/Signin"
import { Post } from "../pages/Post"
import { CreatePost } from "../pages/CreatePost"
import { GlobalStyle } from "../globalStyle";

export const Router = () => {
    return (
        <BrowserRouter>
            < GlobalStyle />
            <Routes>
                <Route index element={<Signup />} />
                <Route path="signup" element={<Signup />} />
                <Route path="signin" element={<Signin />} />
                <Route path="post" element={<Post />} />
                <Route path="create-post" element={<CreatePost />} />
            </Routes>
        </BrowserRouter>
    )
}