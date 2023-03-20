import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { LinkItem } from '../types';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { concatClasses } from '../util';


export default function Navbar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);


    const navigation: LinkItem[] = [
        { name: "Home", href: "/" },
        { name: "Practice", href: "/practice" },
        { name: "Play", href: "/play" }
    ];


    const openhandler = (): void => {
        setIsOpen(open => !open);
    }


    useEffect(() => {
        // reset state of mobile link menu if view is changed to desktop
        const closeResize = () => {
            if (window.innerWidth > 400) {
                setIsOpen(false);
            }
        }
        window.addEventListener('resize', closeResize);
    },);


    return (

        <nav className={`flex ${isOpen ? "h-[220px]" : "h-[70px]"} bg-slateBlue w-full 
            transition-all ease-linear duration-300 font-mulish`}>
            {<div className="flex flex-col sm:flex-row max-w-7xl justify-between">
                <div className="flex items-center sm:hidden p-4">
                    <button className="text-white" onClick={openhandler}>
                        <span className="sr-only">Open main menu</span>
                        {isOpen ?
                            <XMarkIcon className="block h-8 w-8" aria-hidden="true" /> :
                            <Bars3Icon className="block h-8 w-8" aria-hidden="true" />}
                    </button>
                </div>
                <div className="justify-center text-xl items-center space-x-4 px-4 border-white hidden sm:flex text-white">
                    {navigation.map(link => {
                        return <NavLink className={({ isActive }) => {
                            return concatClasses(isActive ? "text-clearblue font-bold" : "text-white", "hover:underline underline-offset-4")
                        }} key={link.name} to={link.href}>{link.name}</NavLink>
                    })}
                </div>
                {/* mobile toggle menu */}
                {isOpen ? <div className="flex text-lg flex-1 flex-col p-4 text-white space-y-4 sm:hidden">
                    {navigation.map(link => {
                        return <NavLink className={({ isActive }) => {
                            return concatClasses(isActive ? "text-clearblue" : "text-white",
                                "animate-fadeIn transition-all duration-300 transform hover:translate-x-2")
                        }} key={link.name} to={link.href}>{link.name}</NavLink>
                    })}
                </div> : ""}
            </div>}
        </nav>
    );
}