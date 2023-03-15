import { useState } from 'react';
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

export const Signin = () => {
    const navigate = useNavigate()

    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")

    const onChangeEmail = (e) => {
        setUserEmail(e.target.value)
    }
    const onChangePassword = (e) => {
        setUserPassword(e.target.value)
    }

    const userInfo = {email: userEmail, password: userPassword}
    const loginUser = async(userInfo) => {

    }

    return (

        <Body>


            <LabedditLogo src={labedditLogo} alt='labeddit-logo' />

            <Title>Labeddit</Title>

            <p>O projeto de rede social da Labenu</p>


            <SigninForm>

                <Input
                    type="text" placeholder="E-mail" value={userEmail}
                    onChange={onChangeEmail}/>

                <Input
                    type="text" placeholder="Senha" value={userPassword}
                    onChange={onChangePassword} />

                <Button
                    type="submit" value="Continuar"
                    onSubmit={loginUser} />

            </SigninForm>


            <ColouredDivider />


            <Button2 onClick={() => navigate("/signup")}>Crie uma conta!</Button2>

            
            <BottomBar />
        </Body>
    )
}