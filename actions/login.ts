"use server"

import * as z from 'zod';
import { LoginSchema } from '@/schemas';

export const Login =async (values:z.infer<typeof LoginSchema>)=>{
    const validateFields = LoginSchema.safeParse(values);

    console.log(validateFields);
    
    if(!validateFields.success){
        return {error:"Invalid Fields!"}
    }
    
    return {success:"Email Sent!"};
}