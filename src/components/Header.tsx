import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from './ui/button';
import LogoutButton from './LogoutButton';
import { getUser } from '@/auth/server';

const Header = async () => {

  const user = await getUser();

  return (
    <header className="flex w-full justify-between py-[1rem] px-[2rem] shadow-[var(--header)] items-center relative">
        <Link href="/" className="flex gap-4 items-center">
          <Image 
          src="https://imgs.search.brave.com/3N8i8Bvq786fpfwdpOED7McJVg3ENguA9CdwuZCpXTA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yYW5k/b20taW1hZ2UtcGVw/ZWJpZ290ZXMudmVy/Y2VsLmFwcC9hcGkv/cmFuZG9tLWltYWdl" 
          width="50" 
          height="50" 
          alt="logo"
          className="rounded-full aspect-square object-cover"
          priority />
          <h1 className=" text-2xl font-semibold leading-6">Smart Noter</h1>
        </Link>
      <div className="flex gap-4">
        <ModeToggle />
        {user ? (
          <LogoutButton />
        ) 
        : 
        ( <>
            <Button asChild className="hidden sm:block">
              <Link href="/sign-up">Sign Up</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/login">Login</Link>
            </Button>  
          </> 
        ) }
      </div>
    </header>
  )
}

export default Header