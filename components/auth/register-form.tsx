"use client"

import React, { useState, useTransition } from 'react'
import CardWrapper from './card-wrapper'
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterSchema } from '@/schemas';
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { Register } from '@/actions/register';

const RegisterForm = () => {
  const [isError, setError] = useState<string | undefined>("");
  const [isSuccess, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: ""
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      Register(values)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
        });
    })
  }

  return (
    <CardWrapper
      headerLabel='Create an account'
      backButtonLabel="Already have an account?"
      backButtonHref='/auth/login'
      showSocial>
      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
          <div >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="johndone" {...field}
                      disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john.done@example.com" {...field}
                      disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="*****" {...field}
                      disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormError message={isError} />
          <FormSuccess message={isSuccess} />

          <Button type='submit' className='w-full' disabled={isPending}>
            Create an account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default RegisterForm