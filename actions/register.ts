"use server"

import * as z from 'zod';
import bcrypt, { hash } from 'bcryptjs';
import { RegisterSchema } from '@/schemas';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { generateVerficationToken } from '@/lib/token';
import { sendVerificationEmail } from '@/lib/mail';

export const Register =async (values:z.infer<typeof RegisterSchema>)=>{
    const validateFields = RegisterSchema.safeParse(values);

    // console.log(validateFields);
    
    if(!validateFields.success){
        return {error:"Invalid Fields!"}
    }

    const {email,password,name} = validateFields.data;
    const hashedPassword = await bcrypt.hash(password,10);

    const existingUser = await getUserByEmail(email);

    if(existingUser){
        return {error:"This Email is already exist!"}
    }

    await db.user.create({
        data:{
            name,
            email,
            password:hashedPassword
        }
    })

    const verificationToken = await generateVerficationToken(email);
    //TODO:: Send Verification token email
    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
    );


    
    return {success:"Confirmation Email Sent!"};
}