import Images from "../../components/admin/Images";
import Upload from "../../components/admin/Upload";

import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";

// main admin page
const Admin: NextPage = () => {
    const [focus, setFocus] = useState("dashboard");
    const { data: sessionData } = useSession();

    // on page load, if there is no session data, redirect to login page
    useEffect(() => {
        // if session has loaded and there is no session data, redirect to login page
        if (sessionData === null) {
            // redirect to login page
            signIn();
        }
    }, [sessionData])

    // return the admin page styled with tailwin
    // there is a navbar and a main section
    // the navbar is a sidebar
    // the main section is a component depending on the focus
    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            
            {/* sidebar */}
            <div className="flex flex-col flex-shrink-0 w-64">
                <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <div className="flex items-center flex-shrink-0 px-4 text-2xl text-gray-900 rounded-md dark:text-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                        </svg>
                        <span className="ml-2 font-semibold tracking-wide truncate">{sessionData?.user?.name || "Admin"}</span>
                    </div>
                    <div className="flex flex-col flex-grow mt-5">
                        <nav className="flex-1 px-2 space-y-1 bg-white dark:bg-gray-800">
                            <button
                                className="flex items-center w-full px-2 py-2 text-sm font-medium text-gray-900 rounded-md bg-gray-100 dark:text-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                                onClick={() => { setFocus("dashboard") }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>
                                <span className="ml-2 text-sm tracking-wide truncate">Dashboard</span>
                            </button>

                            <button
                                className="flex items-center w-full px-2 py-2 text-sm font-medium text-gray-900 rounded-md bg-gray-100 dark:text-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
                                onClick={() => { setFocus("images") }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                                <span className="ml-2 text-sm tracking-wide truncate">Images</span>
                            </button>

                            <button
                                className="flex items-center w-full px-2 py-2 text-sm font-medium text-gray-900 rounded-md bg-gray-100 dark:text-gray-100 dark:bg-gray-700"
                                onClick={() => { setFocus("upload") }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                </svg>
                                <span className="ml-2 text-sm tracking-wide truncate">Upload</span>
                            </button>

                            <button
                                className="flex items-center w-full px-2 py-2 text-sm font-medium text-gray-900 rounded-md bg-gray-100 dark:text-gray-100 dark:bg-gray-700"
                                onClick={() => { setFocus("contact") }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                                <span className="ml-2 text-sm tracking-wide truncate">Contact</span>
                            </button>

                            <button
                                className="flex items-center w-full px-2 py-2 text-sm font-medium text-gray-900 rounded-md bg-gray-100 dark:text-gray-100 dark:bg-gray-700"
                                onClick={() => { setFocus("about") }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                                </svg>
                                <span className="ml-2 text-sm tracking-wide truncate">About</span>
                            </button>

                            <button
                                className="flex items-center w-full px-2 py-2 text-sm font-medium text-gray-900 rounded-md bg-gray-100 dark:text-gray-100 dark:bg-gray-700"
                                onClick={() => { setFocus("profile") }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="ml-2 text-sm tracking-wide truncate">Profile</span>
                            </button>
                        </nav>
                    </div>
                </div>
            </div>

            {/* main section */}
            <div className="flex flex-col flex-1 w-0 overflow-hidden">
                <span className="flex items-center justify-between flex-shrink-0 px-4 py-2 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <h1 className="text-2xl font-medium leading-6 text-gray-900 dark:text-gray-100">{focus}</h1>
                </span>
                <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
                    {focus === "dashboard" && <Dashboard />}
                    {focus === "images" && <Images />}
                    {focus === "upload" && <Upload />}
                    {focus === "contact" && <Contact />}
                    {focus === "about" && <About />}
                    {focus === "profile" && <Profile />}
                </main>
            </div>
        </div>
    )
};
export default Admin;

// dashboard that follows the same tailwindcss styling as the main Admin page
const Dashboard: React.FC = () => {
    return (
        <div className="flex flex-col flex-1 overflow-hidden">
            <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
                <div className="flex flex-col items-center justify-center flex-1 h-full p-4">
                    <div className="flex items-center justify-center flex-shrink-0 w-16 h-16 text-white bg-gray-500 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                    </div>
                    <div className="flex flex-col items-center justify-center flex-1">
                        <h2 className="mt-2 text-2xl font-semibold text-gray-900 dark:text-gray-100">Welcome to your dashboard</h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">This is where you can manage your images, about page, and contact user interface.</p>
                    </div>
                </div>
            </main>
        </div>
    )
};

// about page for about page updates that follows the same tailwindcss styling as the main Admin page
const About: React.FC = () => {
    return (
        <div className="flex flex-col flex-1 overflow-hidden">
            <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
                <div className="flex flex-col items-center justify-center flex-1 h-full p-4">
                    <div className="flex items-center justify-center flex-shrink-0 w-16 h-16 text-white bg-gray-500 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                        </svg>
                    </div>
                    <div className="flex flex-col items-center justify-center flex-1">
                        <h2 className="mt-2 text-2xl font-semibold text-gray-900 dark:text-gray-100">Welcome to your about page</h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">This is where you can edit your about page.</p>
                    </div>
                </div>
            </main>
        </div>
    )
};

// contact page for contact page updates that follows the same tailwindcss styling as the main Admin page
const Contact: React.FC = () => {
    return (
        <div className="flex flex-col flex-1 overflow-hidden">
            <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
                <div className="flex flex-col items-center justify-center flex-1 h-full p-4">
                    <div className="flex items-center justify-center flex-shrink-0 w-16 h-16 text-white bg-gray-500 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                    </div>
                    <div className="flex flex-col items-center justify-center flex-1">
                        <h2 className="mt-2 text-2xl font-semibold text-gray-900 dark:text-gray-100">Welcome to your contact page</h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">This is where you can edit your contact page.</p>
                    </div>
                </div>
            </main>
        </div>
    )
};

// profile page for profile page updates that follows the same tailwindcss styling as the main Admin page
const Profile: React.FC = () => {
    return (
        <div className="flex flex-col flex-1 overflow-hidden">
            <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
                <div className="flex flex-col items-center justify-center flex-1 h-full p-4">
                    <div className="flex items-center justify-center flex-shrink-0 w-16 h-16 text-white bg-gray-500 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <div className="flex flex-col items-center justify-center flex-1">
                        <h2 className="mt-2 text-2xl font-semibold text-gray-900 dark:text-gray-100">Welcome to your profile page</h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">This is where you can edit your profile page.</p>
                    </div>
                </div>
            </main>
        </div>
    )
};
