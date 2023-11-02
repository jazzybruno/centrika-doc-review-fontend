'use client';
import { useAuth } from '@/contexts/AuthProvider';
import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface Props {
   right?: React.ReactNode;
}

const NavBar: FC<Props> = ({right}) => {
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
      <div className=" sticky h-[80px] bg-[#FAFAFB]  top-0 bg-accent z-10 w-full items-center flex p-5 pl-8 justify-between">
         <h1 title={title} className=" capitalize font-semibold text-xl truncate">
            {title}
         </h1>
         {right}
      </div>
   );
};

export default NavBar;