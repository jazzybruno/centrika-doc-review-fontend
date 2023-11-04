import NavBar from '@/components/shared/navbar'
import Sidebar from '@/components/shared/sidebar'
import React, { FC } from 'react'

interface Props {
    children: React.ReactNode;
    right?: React.ReactNode;
}

const DashboardLayout: FC<Props> = ({children, right}) => {
  return (
    <div className=' w-full flex min-h-screen'>
        <Sidebar  />
        <div className="flex w-full bg-[#FAFAFB] flex-col 2md:pl-[220px]">
            <NavBar right={right}/>
            {children}
        </div>
    </div>
  )
}

export default DashboardLayout