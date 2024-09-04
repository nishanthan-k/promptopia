"use client";
import Link from 'next/link';
import Image from 'next/image';
import { signIn, signOut, useSession, getProviders, getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);
  const navLinks = [
    {
      route: '/profile',
      text: 'My Profile',
    },
    {
      route: '/create-prompt',
      text: 'Create Prompt',
    },
  ]

  useEffect(() => {
    const handleProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }

    handleProviders();
  }, [])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex flex-center gap-2' >
        <Image
          width={30}
          height={30}
          src='/assets/images/logo.svg'
          alt='Promptopia'
          className='object-contain'
        />
        <p className='logo_text'>Promptopia</p>
      </Link>

      <div className='hidden sm:block'>
        {session?.user ? (
          <div className='flex ga-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>
              Create Post
            </Link>

            <button type='button' onClick=  {signOut} className='outline_btn'>
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                width={30}
                height={30}
                src={session?.user.image}
                alt='Profile'
                className='rounded-full'
              />
            </Link>
          </div>
        ) : (
          <>
            {providers && (
              Object.values(providers).map(provider => (
                <button 
                  type='button'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className='black_btn'
                >
                  Sign In
                </button>
              ))
            )}
          </>
        )}
      </div>

      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
               width={30}
               height={30}
               src={session?.user.image}
               alt='Profile'
               className='rounded-full'
               onClick={() => setToggleDropDown(!toggleDropDown)}
             />

             {toggleDropDown && (
              <div className='dropdown'>
                {navLinks.map((link) => (
                  <Link
                    key={link.route}
                    href={link.route}
                    className='dropdown_link'
                    onClick={() => setToggleDropDown(false)}
                  >
                    {link.text}
                  </Link>
                ))}
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
             )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </nav>
  )
}

export default Nav;
