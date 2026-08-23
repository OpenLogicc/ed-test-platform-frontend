import React, { useState } from 'react'
import { Bell, X} from "lucide-react";

export const Notifications = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <div>

            {/* drawer init and toggle */}
            <div className="text-center">
                <button 
                    className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 transition-all duration-300 border border-slate-700 relative" 
                    type="button" 
                    onClick={() => setIsDrawerOpen(true)}
                    aria-controls="drawer-example"
                >
                    <Bell className="w-5 h-5 text-white" />
                    <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-800"></span>
                </button>
            </div>

            {/* drawer component */}
            <div 
                id="drawer-example" 
                className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform duration-300 bg-gradient-to-b from-slate-900 to-slate-800 w-96 border-e border-slate-700 ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`} 
                tabIndex={-1} 
                aria-labelledby="drawer-label"
            >
                <div className="border-b border-slate-700 pb-4 mb-5 flex items-center">
                    <h5 id="drawer-label" className="inline-flex items-center text-lg font-bold text-white">
                        <svg className="w-5 h-5 me-2 text-blue-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                        Notifications
                    </h5>
                    <button 
                        type="button" 
                        onClick={() => setIsDrawerOpen(false)}
                        aria-controls="drawer-example" 
                        className="text-slate-400 bg-transparent hover:text-white hover:bg-slate-700 rounded-lg w-9 h-9 absolute top-2.5 end-2.5 flex items-center justify-center transition-colors"
                    >
                        <X className="w-5 h-5" />
                        <span className="sr-only">Close menu</span>
                    </button>
                </div>
                <p className="mb-4 text-sm text-slate-300 leading-relaxed">Stay updated with the latest notifications and important updates from your dashboard.</p>
                <div className="bg-slate-700 rounded-lg p-4 mb-4">
                    <p className="text-sm text-slate-200">📢 <span className="font-semibold text-white">New features available!</span></p>
                </div>
                <div className="bg-slate-700 rounded-lg p-4 mb-4">
                    <p className="text-sm text-slate-200">📢 <span className="font-semibold text-white">New Test InRole Now!</span></p>
                </div>

            
            </div>

        </div>
    )
}
