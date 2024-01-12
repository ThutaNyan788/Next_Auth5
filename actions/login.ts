"use server"

import * as z from 'zod';
import { LoginSchema } from '@/schemas';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { signIn } from '@/auth';

export const Login =async (values:z.infer<typeof LoginSchema>)=>{
    const validateFields = LoginSchema.safeParse(values);

    
    if(!validateFields.success){
        return {error:"Invalid Fields!"}
    }

    const {email,password} = validateFields.data;

    try {
        await signIn("credentials",{
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        if(error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                    return {error:"Invalid Credentials"}

                default:
                    return {error:"Something went wrong"}
            }
        }

        throw error;
    }

}