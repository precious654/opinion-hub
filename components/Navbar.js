"use client"

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { Icon } from '@iconify/react';
import { useSession, signIn, signOut, getProviders } from "next-auth/react";
import image from "@/assets/profile.webp";

function Navbar() {

  const isLoggedIn = false;
  const[providers, setProviders] = React.useState(null);

  React.useEffect( () => {
    const setProvider = async () => {
      const response = await getProviders();
      setProviders(response);
    } 
    setProvider();
  }, [])

  return (
    <nav className='flex py-5 justify-between'>
      <Link href="/">
        <h1 className="text-2xl font-semibold">Opinion Hub</h1> 
      </Link> 
      {
        isLoggedIn ? (
          <div>
            <div className='sm:flex md:gap-5 gap-3 hidden'>
              <Link href="/addOpinion">
                <Icon icon="jam:write" width={26} />
              </Link>
              <div>
                <Icon icon="material-symbols:logout-sharp" width={26} onClick={ () => signOut() } />
              </div>
              <Link href="/profile">
                <Image 
                src={image}
                width={34} 
                height={34} 
                className="rounded-full" />
              </Link>
            </div>

            <div className="sm:hidden flex">

            </div>
          </div>
        ) : (
          <div>
            {
              providers && Object.values(providers).map(
                (provider) => (
                  <button 
                  className="rounded-md bg-[#333333] text-[#FFFFFF] "
                  onClick={() => signIn()}
                  >Sign In</button>
                ) 
              )
            }
          </div>
        )
      }
    </nav>
  )
}

export default Navbar;