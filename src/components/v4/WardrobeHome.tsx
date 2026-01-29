import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { fashionItems, ItemCategory } from '@/data/curatedData';
import { Search, Sparkles, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories: { id: ItemCategory | 'all'; label: string; icon: string }[] = [
    { id: 'all', label: 'All Pieces', icon: '✨' },
    { id: 'shirt', label: 'Shirts', icon: '👔' },
    { id: 'pants', label: 'Pants', icon: '👖' },
    { id: 'shoes', label: 'Shoes', icon: '👞' },
    { id: 'outerwear', label: 'Outerwear', icon: '🧥' },
    { id: 'accessories', label: 'Accessories', icon: '⌚' },
];

export function WardrobeHome() {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState<ItemCategory | 'all'>('all');

    const filteredItems = selectedCategory === 'all'
        ? Object.values(fashionItems)
        : Object.values(fashionItems).filter(item => item.category === selectedCategory);

    return (
        <div className="min-h-screen bg-background text-foreground pb-24">
            {/* Premium Header */}
            <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-white/5 px-6 py-8">
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <h1 className="font-display text-3xl font-bold tracking-tight">Dress Curator.</h1>
                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] mt-1">Good taste as a service</p>
                    </div>
                    <button className="w-10 h-10 rounded-full glass-panel flex items-center justify-center">
                        <User className="w-5 h-5 text-white/60" />
                    </button>
                </div>

                {/* Search */}
                <div className="relative group mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-white transition-colors" />
                    <input
                        type="text"
                        placeholder="Search your wardrobe..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium outline-none focus:border-white/20 transition-all placeholder:text-white/20"
                    />
                </div>

                {/* Categories Horizontal Scroll */}
                <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-6 px-6">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={cn(
                                "flex items-center gap-2 px-5 py-3 rounded-2xl whitespace-nowrap text-sm font-bold transition-all border",
                                selectedCategory === cat.id
                                    ? "bg-white text-black border-white shadow-[0_10px_20px_rgba(255,255,255,0.1)]"
                                    : "bg-white/5 text-white/40 border-white/10 hover:bg-white/10"
                            )}
                        >
                            <span className="text-base">{cat.icon}</span>
                            {cat.label}
                        </button>
                    ))}
                </div>
            </header>

            {/* Item Grid (The "Wardrobe") */}
            <div className="px-6 py-8">
                <div className="grid grid-cols-2 gap-4">
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: idx * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                onClick={() => navigate(`/item/${item.id}`)}
                                className="group cursor-pointer"
                            >
                                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-white/5 border border-white/5 mb-3">
                                    <motion.img
                                        layoutId={`item-image-${item.id}`}
                                        src={item.image}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full glass-panel flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Sparkles className="w-4 h-4 text-yellow-300" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-0.5">{item.brand}</p>
                                    <h3 className="text-sm font-bold truncate leading-tight">{item.name}</h3>
                                    <p className="text-sm font-bold opacity-80 mt-1">${item.price}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
