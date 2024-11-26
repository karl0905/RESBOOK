import React from 'react'
import Card from "@/global/dashboard/Card"
import Logo from "@/global/dashboard/Logo"
import DarkBackground from '@/global/dashboard/Darkbackground'
import Heading from '@/global/dashboard/Heading'
import Navbar from '@/global/components/Navbar'


export default function page() {
    return (
        <div>
            <Logo />
            <Heading />
            <Navbar />
        </div>
    )
}


