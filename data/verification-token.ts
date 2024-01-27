import { db } from "@/lib/db";


export const  getVerificationTokenByToken=async (token:string)=>{
    try {
      const verficationToken = await db.verficationToken.findUnique({
          where:{token}
      })
  
      return verficationToken;
    } catch (error) {
      return null;
    }
  }


export const  getVerificationTokenByEmail=async (email:string)=>{
  try {
    const verficationToken = await db.verficationToken.findFirst({
        where:{email}
    })

    return verficationToken;
  } catch (error) {
    return null;
  }
}
