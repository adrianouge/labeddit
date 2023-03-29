import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Body,
    LabedditLogo,
    Title,
    SigninForm, Input, Button,
    Button2,
    ColouredDivider,
    BottomBar
} from "../components/styled-components"
import labedditLogo from "../images/labeddit-logo.png"
import axios from 'axios'
import { LabedditContext } from '../contexts/LabedditContext';


export const Signin = () => {

    const context = useContext(LabedditContext)

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { userToken, setUserToken,
        postList, setPostlist } = context

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }


    const loginUser = async (event) => {

        event.preventDefault()
        const body = { email, password }
        const response = await axios.post('https://labeddit-back-end-adriano-uge.onrender.com/users/login', body)
        console.log(response.data.userToken)
        if (response.data.userToken !== undefined) {
            setUserToken(response.data.userToken)
        }
        return response
    }

    const checkUserToken = (userToken) => {
        console.log(userToken)
        if (userToken !== 'nenhum') {
            navigate('/create-post')
        }
    }

    useEffect(() => { checkUserToken(userToken) }, [userToken])
    return (

        <Body>


            <LabedditLogo src={labedditLogo} alt='labeddit-logo' />

            <Title>Labeddit</Title>

            <p>O projeto de rede social da Labenu</p>


            <SigninForm>

                <Input
                    type="text" placeholder="E-mail" value={email}
                    onChange={onChangeEmail} />

                <Input
                    type="password" placeholder="Senha" value={password}
                    onChange={onChangePassword} />

                <Button
                    type="submit"
                    value="entrar"
                    onClick={loginUser}>
                    Entrar
                </Button>

            </SigninForm>


            <ColouredDivider />


            <Button2 onClick={() => navigate("/signup")}>Crie uma conta!</Button2>


            <BottomBar />
        </Body>
    )
}