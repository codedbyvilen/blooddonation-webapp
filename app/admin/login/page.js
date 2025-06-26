import React from 'react'
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from '@clerk/nextjs'

function Page() {
    return (
        <div className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
              <SignInButton>
                    <button className='w-32 p-4 bg-red-500'>Sign In</button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div >
    )
}

export default Page
