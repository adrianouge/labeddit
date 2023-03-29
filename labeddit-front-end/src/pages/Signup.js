import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

import {
    Body,
    Header, LabedditIcon, NavigateToPage,
    Title,
    SignupForm, Input, Disclaimer, Label, Button,
    BottomBar
} from "../components/styled-components"

import labedditLogo from "../images/labeddit-logo.png"
import { LabedditContext } from "../contexts/LabedditContext"

export const Signup = () => {

    const context = useContext(LabedditContext)

    const { userToken, setUserToken, postList, setPostList } = context

    const navigate = useNavigate()

    const [agree, setAgree] = useState(false)
    const [nickname, setNickname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [welcome, setWelcome] = useState("Olá, boas vindas ao LabEddit ;)")

    const onChangeAgree = (e) => {
        setAgree(!agree)
        console.log(userToken)
    }
    const onChangeNickname = (e) => {
        setNickname(e.target.value)
    }
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }


    useEffect(() => { }, [userToken])
    const registerNewUser = async (event) => {

        try {
            event.preventDefault()
            const body = { name: nickname, email, password }
            const response = await axios.post('https://labeddit-back-end-adriano-uge.onrender.com/users', body)
            if (response.data.userToken) {
                setUserToken(response.data.userToken)
                console.log(userToken)
                setWelcome(response.data.message)
            }
            console.log(response, userToken)
            return response
        }
        catch (error) { console.log(error) }
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


            <Header>

                <LabedditIcon src={labedditLogo} alt='labeddit-logo' />

                <NavigateToPage
                    onClick={() => navigate("/signin")}>
                    Entrar
                </NavigateToPage>

            </Header>


            <Title>{welcome}</Title>


            <SignupForm>

                <Input
                    type="text" placeholder="Apelido" name="apelido"
                    value={nickname} onChange={onChangeNickname}
                />

                <Input
                    type="text" placeholder="E-mail" name="e-mail"
                    value={email} onChange={onChangeEmail}
                />

                <Input
                    type="password" placeholder="Senha" name="senha"
                    value={password} onChange={onChangePassword}
                />

                <Disclaimer>
                    Ao continuar, você concorda com o nosso Contrato de usuário e nossa Política de Privacidade
                </Disclaimer>

                <Label>
                    <input
                        type="checkbox"
                        name="agree"
                        checked={agree}
                        onChange={onChangeAgree}
                    />
                    Eu concordo em receber emails sobre coisas legais no Labeddit
                </Label>

                <Button
                    type="submit" value="Cadastrar"
                    onClick={registerNewUser}>
                    Cadastrar
                </Button>

            </SignupForm>


            <BottomBar />


        </Body>
    )
}