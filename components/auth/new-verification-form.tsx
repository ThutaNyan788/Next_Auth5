"use client"

import React, { useCallback, useEffect ,useState} from 'react'
import CardWrapper from './card-wrapper'
import { BeatLoader } from 'react-spinners'
import { useSearchParams } from 'next/navigation';
import newVerification from '@/actions/new-verification';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';

const NewVerificationForm = () => {
    const [error,setError] = useState<string | undefined>("");
    const [success,setSuccess] = useState<string | undefined>("");


    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const onSubmit = useCallback(()=>{
        if(!token){
            setError("Token Missing");
        }
        newVerification(token)
        .then((data)=>{
            setSuccess(data.success);
            setError(data.error);
        })
        .catch((error)=>{
            setError("Something went wrong");
        });
        
    },[token]);

    useEffect(()=>{
        onSubmit();
    },[onSubmit]);

  return (
    <CardWrapper
    headerLabel='Confirming your verification'
    backButtonLabel='Back to Login'
    backButtonHref='/auth/login'>
        <div className="flex justify-center items-center w-full">
            {!success && !error && (
                <BeatLoader/>
            )}

            <FormError message={error}/>
            <FormSuccess message={success}/>
        </div>
    </CardWrapper>
  )
}

export default NewVerificationForm