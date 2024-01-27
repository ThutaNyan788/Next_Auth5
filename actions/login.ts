"use server"

import * as z from 'zod';
import { LoginSchema } from '@/schemas';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { signIn } from '@/auth';
import { getUserByEmail } from '@/data/user';
import { generateVerficationToken } from '@/lib/token';
import { sendVerificationEmail } from '@/lib/mail';

export const Login = async (values: z.infer<typeof LoginSchema>) => {
    const validateFields = LoginSchema.safeParse(values);

    console.log({ValidateField:validateFields});
    
    if (!validateFields.success) {
        return { error: "Invalid Fields!" }
    }

    const { email, password } = validateFields.data;
    // console.log({Email:email});
    
    const existingUser = await getUserByEmail(email);
    console.log({ ExistUser: existingUser });

    if (!existingUser?.email || !existingUser.password || !existingUser) {
        return { error: "Email does not exist" }
    }

    if (!existingUser.emailVerified) {
        const verficationToken = await generateVerficationToken(existingUser.email);

        await sendVerificationEmail(
            verficationToken.email,
            verficationToken.token
        );

        return { success: "Confirmation Email Sent" };

    }


    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid Credentials" }

                default:
                    return { error: "Something went wrong" }
            }
        }

        throw error;
    }

}