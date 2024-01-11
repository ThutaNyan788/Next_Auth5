"use server"

import * as z from 'zod';
import { RegisterSchema } from '@/schemas';

export const Register =async (values:z.infer<typeof RegisterSchema>)=>{
    const validateFields = RegisterSchema.safeParse(values);

    console.log(validateFields);
    
    if(!validateFields.success){
        return {error:"Invalid Fields!"}
    }
    
    return {success:"Email Sent!"};
}