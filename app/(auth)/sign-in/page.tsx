"use client"
import React from 'react'
import AuthForm from '@/components/ui/forms/AuthForm'
import { SignInSchema } from '@/lib/validation'
const SignIn = () => {
  return (
    <div>
      <AuthForm
      formType="SIGN_IN"
      schema = {SignInSchema}
      defaultValues = {{email:"", password:""}}
      onSubmit = {(data) => Promise.resolve({ success: true , data})}
      />
    </div>
  )
}

export default SignIn
