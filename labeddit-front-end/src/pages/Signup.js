import { useState } from "react"
import {
    Body,
    Header, LabedditIcon, NavigateToPage,
    Title,
    SignupForm, Input, Disclaimer, Label, Button,
    BottomBar
} from "../components/styled-components"
import { useNavigate } from "react-router-dom"
import labedditLogo from "../images/labeddit-logo.png"

export const Signup = () => {

    const navigate = useNavigate()

    const [agree, setAgree] = useState(false)
    const [nickname, setNickname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onChangeAgree = (e) => {
        setAgree(!agree)
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

    const welcome = "Olá, boas vindas ao LabEddit ;)"

    const newUser = { nickname, email, password }

    const registerNewUser = async (e) => {

    }

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
                    type="text" placeholder="Senha" name="senha"
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
                    onSubmit={registerNewUser} />

            </SignupForm>


            <BottomBar />


        </Body>
    )
}