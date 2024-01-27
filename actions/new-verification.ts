"use server"

import { getUserByEmail } from "@/data/user"
import { getVerificationTokenByToken } from "@/data/verification-token"
import { db } from "@/lib/db"


export default async function newVerification(token:string) {
    const existingToken = await getVerificationTokenByToken(token);

    if(!existingToken){
        return {error:"Token does not exist"};
    }


    const hasExpired = new Date(existingToken.expires) < new Date();

    if(hasExpired){
        return {error:"Token has expired"};
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if(!existingToken){
        return {error:"Email does not exist"};
    }


    try {
        await db.user.update({
            where:{
                id:existingUser?.id
            },
            data:{
                emailVerified:new Date(),
                email:existingToken.email
            }
        })
    } catch (error) {
        console.log(error);
        
    }


    await db.verficationToken.delete({
        where:{id:existingToken.id}
    })


    return {success:"Email Verified!"};
}
