'use client';
import { BellIcon, SearchIcon, Settings } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthProvider';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
   const [title, setTitle] = useState('');
   const [paths, setPaths] = useState<string[]>([]);
   const pathname = useLocation().pathname;
   const { user } = useAuth();

   useEffect(() => {
      setTitle(
         pathname
            .split('/')
            .map((path, index) => {
               if (index === 0) return null;
               if (index === pathname.split('/').length - 1) return path.split('-').join(' ');
               return `${path.split('-').join(' ')} / `;
            })
            .join(',')
            .replace(/,/g, ''),
      );
      // setTitle(pathname.split('/')[1].split('-').join(' '));
      setPaths(pathname.split('/'));
   }, [pathname]);

   return (
      <div className=" sticky h-[80px] top-0 bg-accent z-10 w-full items-center flex p-5 pl-8 justify-between">
         <h1 title={title} className=" capitalize font-semibold text-xl truncate">
            {title}
         </h1>
      </div>
   );
};

export default NavBar;