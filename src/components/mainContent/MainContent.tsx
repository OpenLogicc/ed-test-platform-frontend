import React from 'react'
import { TestSeries } from '../testSeries/TestSeries'
import { Payments } from '../payments/Payments'
import { Dashboard } from '../dashBoard/DashBoard'
import { Mentorships } from '../mentorships/Mentorships'
import MyTests from '../my-tests/MyTests'

interface MainContentProps {
    section: string
}

export const MainContent: React.FC<MainContentProps> = ({ section }) => {
    const renderContent = () => {
        switch (section) {
            case 'dashboard':
                return (
                    <Dashboard />
                )
            case 'inbox':
                return (
                    <div className="bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-700">
                        <h1 className="text-4xl font-bold mb-3">Inbox 📧</h1>
                        <p className="text-slate-400 text-lg">
                            View all your messages and notifications.
                        </p>
                    </div>
                )
            case 'students':
                return (
                    <div className="bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-700">
                        <h1 className="text-4xl font-bold mb-3">Students 👥</h1>
                        <p className="text-slate-400 text-lg">
                            Manage all your students and their progress.
                        </p>
                    </div>
                )
            case 'mentorship':
                return (
                    <Mentorships />
                )
            case 'tests':
                return (
                    <TestSeries />
                )
            case 'my-tests':
                return (
                    
                    <div>
                        <div className="bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-700">
                            <h1 className="text-4xl font-bold mb-3">My Tests 📝</h1>
                            <p className="text-slate-400 text-lg">
                                Get an overview of all the tests you've taken and your performance.
                            </p>
                        </div>
                    </div>
                )
            case 'analytics':
                return (
                    <div className="bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-700">
                        <h1 className="text-4xl font-bold mb-3">Analytics 📈</h1>
                        <p className="text-slate-400 text-lg">
                            Track your performance and improvement over time.
                        </p>
                    </div>
                )
            case 'payments':
                return (
                    <div className="bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-700">
                        <h1 className="text-4xl font-bold mb-3">Payments 💳</h1>
                        <p className="text-slate-400 text-lg">
                            Manage your payments and billing information.
                        </p>
                        <Payments />
                    </div>
                    
                )
            case 'settings':
                return (
                    <div className="bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-700">
                        <h1 className="text-4xl font-bold mb-3">Settings ⚙️</h1>
                        <p className="text-slate-400 text-lg">
                            Customize your preferences and account settings.
                        </p>
                    </div>
                )
            default:
                return (
                    <Dashboard />
                )
        }
    }

    return (
        <div>
            {renderContent()}
        </div>
    )
}
