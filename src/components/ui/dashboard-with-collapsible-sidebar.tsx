"use client"
import React, { useState, useEffect } from "react";
import {
    Home,
    Users,
    Layers,
    Inbox,
    Settings,
    Bell,
    Sun,
    Moon,
    ChevronsRight,
    Activity,
    ChevronRight,
    Search,
    Plus,
    ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
    id: string;
    icon: any;
    label: string;
    href: string;
}

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    return (
        <div className={`flex min-h-screen w-full bg-brand-dark text-white font-sans selection:bg-brand-blue/30`}>
            <div className="flex w-full h-screen overflow-hidden">
                <SlimSidebar />
                <div className="flex-1 flex flex-col min-w-0">
                    <Header />
                    <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
};

const SlimSidebar = () => {
    const pathname = usePathname();

    const mainNav: NavItemProps[] = [
        { id: 'overview', icon: Home, label: 'Overview', href: '/admin' },
        { id: 'templates', icon: Layers, label: 'Templates', href: '/admin/templates' },
        { id: 'team', icon: Users, label: 'Team', href: '/admin/team' },
        { id: 'leads', icon: Inbox, label: 'Leads', href: '/admin/leads' },
    ];

    return (
        <div className="w-20 h-full border-r border-neutral-800 bg-[#080808] flex flex-col items-center py-6 gap-8 z-20">
            <div className="size-12 rounded-xl bg-brand-blue flex items-center justify-center shadow-[0_0_20px_rgba(46,92,255,0.4)] mb-4">
                <Activity className="size-6 text-white" />
            </div>

            <div className="flex flex-col gap-4">
                {mainNav.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={`group relative size-12 rounded-xl flex items-center justify-center transition-all duration-300 ${isActive
                                ? 'bg-brand-blue/10 text-brand-blue border border-brand-blue/20'
                                : 'text-neutral-500 hover:text-white hover:bg-neutral-900 border border-transparent'
                                }`}
                        >
                            <item.icon className={`size-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />

                            <div className="absolute left-full ml-4 px-2 py-1 bg-neutral-900 border border-neutral-800 text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                                {item.label}
                            </div>

                            {isActive && (
                                <div className="absolute -left-1 w-1 h-6 bg-brand-blue rounded-full shadow-[0_0_8px_#2E5CFF]" />
                            )}
                        </Link>
                    );
                })}
            </div>

            <div className="mt-auto flex flex-col gap-4">
                <Link href="/admin/settings" className="size-12 rounded-xl flex items-center justify-center text-neutral-500 hover:text-white hover:bg-neutral-900 transition-all">
                    <Settings className="size-5" />
                </Link>
                <div className="size-10 rounded-full overflow-hidden border border-neutral-800 p-0.5">
                    <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100&h=100&auto=format&fit=crop" className="rounded-full object-cover size-full" alt="User" />
                </div>
            </div>
        </div>
    );
};

const Header = () => {
    const pathname = usePathname();
    const getPageTitle = () => {
        if (pathname === '/admin') return 'Overview';
        if (pathname.includes('/templates')) return 'Templates';
        if (pathname.includes('/team')) return 'Team';
        if (pathname.includes('/leads')) return 'Leads';
        if (pathname.includes('/settings')) return 'Settings';
        return 'Admin';
    };

    return (
        <header className="h-16 md:h-20 border-b border-neutral-800 bg-brand-dark/80 backdrop-blur-xl flex items-center justify-between px-4 md:px-8 z-10">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-neutral-500 text-xs uppercase font-mono tracking-widest">
                    <span>Admin</span>
                    <ChevronRight className="size-3" />
                    <span className="text-white font-bold">{getPageTitle()}</span>
                </div>
            </div>

            <div className="flex-1 max-w-md mx-8 hidden lg:block">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-600" />
                    <input
                        type="text"
                        placeholder="Search records..."
                        className="w-full h-10 bg-neutral-900/50 border border-neutral-800 rounded-lg pl-10 pr-4 text-sm focus:outline-none focus:border-brand-blue/50 transition-colors"
                    />
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button className="relative p-2 text-neutral-400 hover:text-white transition-colors">
                    <Bell className="size-5" />
                    <span className="absolute top-1.5 right-1.5 size-1.5 bg-brand-blue rounded-full" />
                </button>
                <div className="h-6 w-px bg-neutral-800" />
                <button className="flex items-center gap-2 px-3 py-1.5 bg-brand-blue text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors">
                    <Plus className="size-4" />
                    <span className="hidden sm:inline">Add New</span>
                </button>
            </div>
        </header>
    );
};

export const DataNode = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={`group relative p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-brand-blue/30 hover:bg-neutral-900/60 ${className}`}>
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-700">
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-brand-blue to-transparent h-[200%] -translate-y-full hover:animate-scan" />
            </div>

            {children}
        </div>
    );
};
