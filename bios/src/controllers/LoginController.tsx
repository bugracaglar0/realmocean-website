import { Button, Fragment, HStack, SecureField, Text, TextField, UIController, UIImage, UINavigate, UIView, VStack, cLeading, useNavigate, useState, Icon } from "@tuval/forms";
import { Services, useCreateEmailSession, useGetMe, useCreateTeam } from "@realmocean/sdk";

import React from "react";

const GoogleLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path d="M24 12.2755C24 11.4598 23.9325 10.6397 23.7885 9.83716H12.2406V14.4581H18.8536C18.5791 15.9485 17.6974 17.2669 16.4063 18.1047V21.103H20.3516C22.6684 19.013 24 15.9264 24 12.2755Z" fill="#4285F4"></path><path d="M12.2408 23.9999C15.5427 23.9999 18.3274 22.9373 20.3562 21.103L16.4109 18.1046C15.3133 18.8366 13.8962 19.2511 12.2453 19.2511C9.05125 19.2511 6.3431 17.139 5.3714 14.2994H1.30017V17.3903C3.37852 21.4425 7.6117 23.9999 12.2408 23.9999Z" fill="#34A853"></path><path d="M5.36688 14.2995C4.85404 12.8091 4.85404 11.1953 5.36688 9.70496V6.61401H1.30015C-0.436312 10.0048 -0.436312 13.9996 1.30015 17.3904L5.36688 14.2995Z" fill="#FBBC04"></path><path d="M12.2407 4.74881C13.9862 4.72235 15.6732 5.36611 16.9373 6.54781L20.4327 3.12176C18.2194 1.08465 15.2818 -0.0353205 12.2407 -4.58262e-05C7.61169 -4.58262e-05 3.37852 2.55737 1.30017 6.61395L5.36689 9.7049C6.33409 6.86088 9.04674 4.74881 12.2407 4.74881Z" fill="#EA4335"></path></g><defs>
        <clipPath id="clip0"><rect width="24" height="24" fill="white"></rect></clipPath>
    </defs></svg>
)

export class LoginController extends UIController {
    public override LoadView(): UIView {

        const navigate = useNavigate();

        const { me, isLoading, isError: isAccountGetError } = useGetMe('console');

        console.log("myaccount:", me);

        const { createEmailSession, isSuccess, isError, error } = useCreateEmailSession('console');

        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        return (
            isLoading ? Fragment() :
                me != null ? UINavigate('/app/layout') :
                    HStack(
                        HStack(
                            UIImage('/images/login_image.webp')
                        ).width('50%'),
                        VStack({ alignment: cLeading, spacing: 10 })(
                            Text('Email').fontSize(16),
                            TextField().fontSize(16).padding(10).onChange(e => setEmail(e)),
                            Text('Password').fontSize(16),
                            SecureField().fontSize(16).padding(10).onChange(e => setPassword(e)),
                            VStack({ spacing: 10 })(
                                Button(
                                    Text('Login')
                                ).width('50%')
                                    .onClick(() => {
                                        createEmailSession({
                                            email: email,
                                            password: password
                                        }, () => {
                                            navigate('/app/layout')
                                        })
                                    }),
                                Text('or'),
                                Button(
                                    Text('SignUp')
                                ).width('50%')
                                    .onClick(() => {
                                        navigate('/signup');
                                    }),
                                Text('or'),
                                HStack({ spacing: 10 })(
                                    Icon(GoogleLogo),
                                    Text('Sign in with Google').fontFamily('"Graphik Regular", sans-serif').fontSize('2rem')
                                ).height(48).width('100%')
                                    .minWidth('25rem')
                                    .maxWidth('40rem')
                                    .marginBottom('2rem')
                                    .cursor('pointer')
                                    .background('white')
                                    .shadow({ hover: '0 4px 16px rgba(0, 0, 0, 0.1)' })
                                    .onClick(() => {
                                        Services.Accounts.createOAuth2Session(
                                            "google",
                                            `${window.location.protocol}//${window.location.host}/app/loginSuccess`,
                                            `${window.location.protocol}//${window.location.host}/login-failure`
                                        )
                                    }),
                            ).height(),
                            isError && Text(error?.message),
                            isSuccess && UINavigate('/app/layout')
                        ).width('50%').padding(100)
                    )

        )
    }
}