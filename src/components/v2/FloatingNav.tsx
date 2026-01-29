import { motion } from 'motion/react';
import { Home, Compass, Bookmark, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function FloatingNav() {
    const [active, setActive] = useState('Home');
    const NAV_ITEMS = [
        { name: 'Home', icon: Home },
        { name: 'Browse', icon: Compass },
        { name: 'Saved', icon: Bookmark },
        { name: 'Profile', icon: User },
    ];

    return (
        <div className="fixed bottom-8 left-0 right-0 z-40 px-8 pointer-events-none">
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="max-w-xs mx-auto glass-panel rounded-full p-2 flex items-center justify-between pointer-events-auto"
            >
                {NAV_ITEMS.map((item) => (
                    <button
                        key={item.name}
                        onClick={() => setActive(item.name)}
                        className={cn(
                            "relative flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all",
                            active === item.name ? "text-white" : "text-white/40"
                        )}
                    >
                        {active === item.name && (
                            <motion.div
                                layoutId="navGlow"
                                className="absolute inset-0 bg-white/5 rounded-full ring-1 ring-white/10"
                            />
                        )}
                        <item.icon className={cn("w-5 h-5", active === item.name ? "stroke-[2.5px]" : "stroke-[2px]")} />
                    </button>
                ))}
            </motion.div>
        </div>
    );
}
