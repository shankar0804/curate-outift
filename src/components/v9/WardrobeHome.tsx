import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { fashionItems, ItemCategory, curatedOutfits, stylists } from '@/data/curatedData';
import { Search, User, ChevronRight } from 'lucide-react';
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
            {/* Masthead Header */}
            <header className="px-6 pt-10 pb-6 border-b border-white/5">
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <h1 className="font-display text-5xl font-black tracking-tighter leading-none italic uppercase">
                            The Curator<span className="text-white/20">.</span>
                        </h1>
                        <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.4em] mt-2">Editorial Collection № 07</p>
                    </div>
                    <button className="w-11 h-11 rounded-2xl glass-panel flex items-center justify-center border border-white/10">
                        <User className="w-5 h-5 text-white/60" />
                    </button>
                </div>

                {/* Search - Editorial Style */}
                <div className="relative group mb-6">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-white transition-colors" />
                    <input
                        type="text"
                        placeholder="Discover your next piece..."
                        className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold outline-none focus:border-white/20 focus:bg-white/[0.04] transition-all placeholder:text-white/10"
                    />
                </div>

                <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-6 px-6">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={cn(
                                "flex items-center gap-2 px-5 py-2.5 rounded-xl whitespace-nowrap text-[9px] font-black uppercase tracking-[0.15em] transition-all border",
                                selectedCategory === cat.id
                                    ? "bg-white text-black border-white shadow-xl"
                                    : "bg-white/5 text-white/30 border-white/5 hover:bg-white/10"
                            )}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </header>

            {/* Stage 1: Featured Stories Carousel */}
            <section className="py-8 border-b border-white/5">
                <div className="px-6 flex items-end justify-between mb-6">
                    <div>
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20">Volume 01</span>
                        <h2 className="text-2xl font-display font-black tracking-tighter mt-0.5">Cover Stories.</h2>
                    </div>
                    <button className="text-[9px] font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors border-b border-white/5 pb-0.5">View All</button>
                </div>

                <div className="flex gap-5 overflow-x-auto scrollbar-hide px-6 snap-x">
                    {curatedOutfits.map((outfit) => {
                        const stylist = stylists.find(s => s.id === outfit.stylistId);
                        return (
                            <motion.div
                                key={outfit.id}
                                onClick={() => navigate(`/look/${outfit.id}`)}
                                whileTap={{ scale: 0.96 }}
                                className="relative flex-none w-[82vw] h-[48vh] rounded-[40px] overflow-hidden snap-center group cursor-pointer border border-white/5 shadow-2xl"
                            >
                                <img src={outfit.modelImage} className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-90" />

                                <div className="absolute inset-x-0 bottom-0 p-8">
                                    <div className="flex items-center gap-2 mb-3 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 w-fit">
                                        <img src={stylist?.avatar} className="w-5 h-5 rounded-full border border-white/20 object-cover" />
                                        <span className="text-[8px] font-black uppercase tracking-[0.15em] text-white/60">{stylist?.name}</span>
                                    </div>
                                    <h3 className="text-3xl font-display font-black text-white leading-none tracking-tighter mb-2">{outfit.name}</h3>
                                    <div className="flex gap-2">
                                        {outfit.vibe.slice(0, 2).map(v => (
                                            <span key={v} className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">{v}</span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Stage 2: Uniform Wardrobe Gallery */}
            <section className="px-6 py-10">
                <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-2xl font-display font-black tracking-tighter">Wardrobe.</h2>
                    <div className="h-0.5 flex-1 bg-white/5" />
                    <span className="text-[9px] font-black text-white/15 uppercase tracking-widest">{filteredItems.length} ARCHIVED</span>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item) => {
                            return (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    onClick={() => navigate(`/item/${item.id}`)}
                                    className="group cursor-pointer col-span-1"
                                >
                                    <div className="relative rounded-[32px] overflow-hidden bg-white/[0.03] border border-white/5 mb-3 shadow-xl aspect-[4/5]">
                                        <motion.img
                                            layoutId={`item-image-${item.id}`}
                                            src={item.image}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                        />
                                        <div className="absolute top-4 right-4 w-9 h-9 rounded-full glass-panel flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all border border-white/20 shadow-xl">
                                            <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                    <div className="px-1">
                                        <div className="flex items-center justify-between mb-0.5">
                                            <p className="text-[8px] font-black uppercase tracking-[0.15em] text-white/20">{item.brand}</p>
                                            <p className="text-[11px] font-black text-white/70">${item.price}</p>
                                        </div>
                                        <h3 className="text-sm font-bold tracking-tight truncate opacity-90">{item.name}</h3>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </section>
        </div>
    );
}
