"use client"

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { Icon } from '@iconify/react';
import { useSession, signIn, signOut, getProviders } from "next-auth/react";


function Navbar() {

  const {data: session} = useSession();
  const[providers, setProviders] = React.useState(null);
  const [toggleDropdown, setToggleDropdown] = React.useState(false);

  React.useEffect( () => {
    const setUpProvider = async () => {
      const response = await getProviders();
      setProviders(response);
    } 
    setUpProvider();
  }, [])

  return (
    <nav className='flex py-5 justify-between'>
      <Link href="/">
        <h1 className="text-2xl font-semibold">Opinion Hub</h1> 
      </Link> 
      {
        session?.user ? (
          <div>
            <div className='sm:flex gap-5 hidden items-center'>
              <Link href="/addOpinion">
                <Icon icon="jam:write" width={26} />
              </Link>
              <div>
                <Icon icon="material-symbols:logout-sharp" width={26} onClick={ () => signOut() } />
              </div>
              <Link href="/profile">
                <img 
                src={session?.user.image}
                width={34} 
                height={34} 
                className="rounded-full" 
                />
              </Link>
            </div>

            <div className="sm:hidden flex flex-col gap-3 items-end">
              <img 
                  src={session?.user.image}
                  width={34} 
                  height={34} 
                  className="rounded-full"
                  onClick={() => setToggleDropdown( (prevState) => !prevState)}
              />
              { toggleDropdown && 
                <div className='bg-[#F2F2F2] flex flex-col gap-3 rounded-lg px-8 py-4 font-medium'>
                  <Link 
                  href="/profile" 
                  onClick={() => setToggleDropdown((prevState) => !prevState)}
                  >My Profile</Link>
                  <Link 
                  href="/addOpinion"
                  onClick={() => setToggleDropdown((prevState) => !prevState)}
                  >Add Opinion</Link>
                  <button
                   className='rounded-lg border-0 bg-[#333333] text-[#FFFFFF] py-2 hover:text-[#333333] hover:bg-[#FFFFFF]'
                   onClick={
                    () => {
                      setToggleDropdown((prevState) => !prevState);
                      signOut();
                    }
                   }
                  >Sign Out</button>
                </div>
              }

              </div>
          </div>
        ) : (
          <div>
            {
              providers && Object.values(providers).map(
                (provider) => (
                  <div key={provider.name}>
                    <Icon icon="uil:signin" width={26} onClick={() => signIn()} />
                  </div>
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