"use client"
import React from 'react'

import Image from "next/image";
import Link from "next/link";
import { Button } from './ui/button';
import { useRouter, usePathname } from 'next/navigation';

const Nav = () => {
  const router = useRouter();

  const pathname = usePathname()

  // Do something with the currentPath
  console.log(pathname);

  const handleCreateTask = () => {
    router.push("/task")
  }

  return (
    <nav className='flex items-center justify-between '>
      <Link href="/" className='flex items-center justify-start'>
        <Image
          src="/logo.png"
          alt="Tasks app logo"
          width={50}
          height={50}
          priority={true}
        />
        <p className="logo_text">Task App</p>
      </Link>

      <div className="flex justify-end">{
        pathname === "/task" ? (
          null
        ) :
          <Button onClick={handleCreateTask}>
            Create Task
          </Button>
      }
      </div>
    </nav>
  )
}

export default Nav