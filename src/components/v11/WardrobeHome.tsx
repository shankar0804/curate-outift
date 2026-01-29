import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { fashionItems, ItemCategory, curatedOutfits, stylists } from '@/data/curatedData';
import { Search, User, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';

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

    const isDesktop = useMediaQuery('(min-width: 768px)');

    return (
        <div className="min-h-screen bg-background text-foreground">
            {isDesktop ? (
                <div className="pb-24">
                    <DesktopView
                        filteredItems={filteredItems}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        navigate={navigate}
                    />
                </div>
            ) : (
                <div className="pb-24">
                    <MobileView
                        filteredItems={filteredItems}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        navigate={navigate}
                    />
                </div>
            )}
        </div>
    );
}

interface ViewProps {
    filteredItems: any[];
    selectedCategory: string;
    setSelectedCategory: (cat: any) => void;
    navigate: any;
}

function DesktopView({ filteredItems, selectedCategory, setSelectedCategory, navigate }: ViewProps) {
    return (
        <>
            {/* Minimalist Top Bar */}
            <header className="px-12 pt-16 pb-6 border-b border-white/5">
                <div className="flex items-center justify-between">
                    <h1 className="font-display text-4xl font-extrabold leading-normal uppercase">
                        The Curator<span className="text-white/20">.</span>
                    </h1>

                    <div className="flex items-center gap-8 flex-1 max-w-2xl px-12">
                        {/* Search - Editorial Style */}
                        <div className="relative group w-full">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-white transition-colors" />
                            <input
                                type="text"
                                placeholder="Discover your next piece..."
                                className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-sm font-medium outline-none focus:border-white/20 focus:bg-white/[0.04] transition-all placeholder:text-white/10 font-display"
                            />
                        </div>
                    </div>

                    <button className="w-12 h-12 rounded-2xl glass-panel flex items-center justify-center border border-white/10 hover:bg-white/5 transition-colors">
                        <User className="w-5 h-5 text-white/60" />
                    </button>
                </div>
            </header>

            {/* Stage 1: Featured Stories Carousel */}
            <section className="py-12 border-b border-white/5">
                <div className="px-12 flex items-end justify-between mb-6">
                    <div>
                        <h2 className="text-4xl font-display font-extrabold leading-none">Curated Edits.</h2>
                    </div>
                </div>

                <div className="flex gap-8 overflow-x-auto scrollbar-hide px-12 snap-x pb-4">
                    {curatedOutfits.map((outfit) => {
                        const stylist = stylists.find(s => s.id === outfit.stylistId);
                        return (
                            <motion.div
                                key={outfit.id}
                                onClick={() => navigate(`/look/${outfit.id}`)}
                                whileTap={{ scale: 0.98 }}
                                className="relative flex-none w-[28vw] h-[65vh] rounded-[48px] overflow-hidden snap-center group cursor-pointer border border-white/5 shadow-2xl"
                            >
                                <img src={outfit.modelImage} className="absolute inset-x-0 bottom-0 w-full h-[110%] object-cover object-top transition-all duration-1000 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent" />

                                <div className="absolute inset-x-0 bottom-0 p-10">
                                    <div className="flex items-end justify-between gap-6">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-display font-extrabold text-white leading-tight mb-3 uppercase">{outfit.name}</h3>
                                            <div className="flex gap-3">
                                                {outfit.vibe.slice(0, 3).map(v => (
                                                    <span key={v} className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em] border border-white/10 px-3 py-1 rounded-full font-display">{v}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 pb-2 border-b border-white/10 h-fit">
                                            <img src={stylist?.avatar} className="w-6 h-6 rounded-full grayscale object-cover ring-1 ring-white/20" />
                                            <span className="text-[8px] font-bold uppercase tracking-widest text-white/40 leading-none font-display">{stylist?.name}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            <section className="px-12 pt-16 pb-8">
                <div className="flex items-center gap-6">
                    <h2 className="text-4xl font-display font-extrabold leading-none tracking-tight">Pick a piece. Build around it.</h2>
                    <div className="h-px flex-1 bg-white/5" />
                    <span className="text-[10px] font-medium text-white/20 uppercase tracking-[0.2em] font-display">{filteredItems.length} ARCHIVED</span>
                </div>
            </section>

            {/* Category Filter - Relocated */}
            <section className="px-12 py-8 bg-black/20 sticky top-0 z-40 border-b border-white/5 backdrop-blur-md">
                <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2 max-w-7xl mx-auto">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={cn(
                                "flex items-center gap-2 px-8 py-4 rounded-full whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.2em] transition-all border font-display",
                                selectedCategory === cat.id
                                    ? "bg-white text-black border-white shadow-2xl scale-105"
                                    : "bg-white/5 text-white/40 border-white/5 hover:bg-white/10 hover:text-white"
                            )}
                        >
                            <span className="opacity-50 group-hover:opacity-100 font-black">{cat.icon}</span>
                            <span className="font-display">{cat.label}</span>
                        </button>
                    ))}
                </div>
            </section>

            <section className="px-12 py-16">
                <div className="grid grid-cols-4 gap-x-8 gap-y-16">
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                onClick={() => navigate(`/item/${item.id}`)}
                                className="group cursor-pointer flex flex-col"
                            >
                                <div className="relative rounded-[32px] overflow-hidden bg-white/[0.03] border border-white/5 mb-6 shadow-2xl aspect-[3/4]">
                                    <motion.img
                                        layoutId={`item-image-${item.id}`}
                                        src={item.image}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 right-4 w-12 h-12 rounded-2xl glass-panel flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 border border-white/20 shadow-xl translate-x-4 group-hover:translate-x-0">
                                        <ChevronRight className="w-5 h-5" />
                                    </div>
                                </div>
                                <div className="px-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/10 group-hover:text-white/30 transition-colors font-display">{item.brand}</p>
                                        <p className="text-sm font-bold text-white/40 group-hover:text-white/90 transition-colors font-display">Rs. {item.price}</p>
                                    </div>
                                    <h3 className="text-base font-display font-bold uppercase leading-tight group-hover:text-white transition-colors">{item.name}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </section>
        </>
    );
}

function MobileView({ filteredItems, selectedCategory, setSelectedCategory, navigate }: ViewProps) {
    return (
        <>
            <header className="px-6 pt-12 pb-4 border-b border-white/5">
                <div className="flex items-center justify-between mb-10">
                    <h1 className="font-display text-base font-extrabold tracking-widest leading-none uppercase">
                        The Curator<span className="text-white/20">.</span>
                    </h1>
                    <button className="w-9 h-9 rounded-xl glass-panel flex items-center justify-center border border-white/10">
                        <User className="w-4 h-4 text-white/60" />
                    </button>
                </div>

                <div className="relative group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-white transition-colors" />
                    <input
                        type="text"
                        placeholder="Discover your next piece..."
                        className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold outline-none focus:border-white/20 focus:bg-white/[0.04] transition-all placeholder:text-white/10 font-display"
                    />
                </div>
            </header>

            <section className="py-6 border-b border-white/5">
                <div className="px-6 flex items-end justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-display font-extrabold tracking-tight mt-0.5">Curated Edits.</h2>
                    </div>
                </div>

                <div className="flex gap-4 overflow-x-auto scrollbar-hide px-6 snap-x">
                    {curatedOutfits.map((outfit) => {
                        const stylist = stylists.find(s => s.id === outfit.stylistId);
                        return (
                            <motion.div
                                key={outfit.id}
                                onClick={() => navigate(`/look/${outfit.id}`)}
                                whileTap={{ scale: 0.96 }}
                                className="relative flex-none w-[82vw] h-[45vh] rounded-[32px] overflow-hidden snap-center group cursor-pointer border border-white/5 shadow-2xl"
                            >
                                <img src={outfit.modelImage} className="absolute inset-x-0 bottom-0 w-full h-[110%] object-cover object-top" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                                <div className="absolute inset-x-0 bottom-0 p-6">
                                    <div className="flex items-end justify-between gap-4">
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-display font-extrabold text-white leading-tight mb-2 uppercase">{outfit.name}</h3>
                                            <div className="flex gap-2">
                                                {outfit.vibe.slice(0, 2).map(v => (
                                                    <span key={v} className="text-[8px] font-bold text-white/30 uppercase tracking-[0.2em] font-display">{v}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 pb-1 border-b border-white/10 h-fit">
                                            <img src={stylist?.avatar} className="w-4 h-4 rounded-full grayscale object-cover" />
                                            <span className="text-[7px] font-bold uppercase tracking-widest text-white/40 font-display">{stylist?.name}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            <section className="px-6 pt-10 pb-2">
                <h2 className="text-lg font-display font-extrabold tracking-tighter leading-tight whitespace-nowrap">Pick a piece. Build around it.</h2>
            </section>

            {/* Category Filter - Relocated Mobile */}
            <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex gap-3 overflow-x-auto scrollbar-hide">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={cn(
                            "flex items-center gap-2 px-6 py-3 rounded-full whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.15em] transition-all border font-display",
                            selectedCategory === cat.id
                                ? "bg-white text-black border-white shadow-xl"
                                : "bg-white/5 text-white/30 border-white/5 hover:bg-white/10"
                        )}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            <section className="px-6 py-8">
                <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item) => (
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
                                <div className="relative rounded-[24px] overflow-hidden bg-white/[0.03] border border-white/5 mb-3 shadow-xl aspect-[4/5]">
                                    <motion.img
                                        layoutId={`item-image-${item.id}`}
                                        src={item.image}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full glass-panel flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all border border-white/20 shadow-xl">
                                        <ChevronRight className="w-4 h-4" />
                                    </div>
                                </div>
                                <div className="px-1">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <p className="text-[7.5px] font-bold uppercase tracking-[0.1em] text-white/20 font-display">{item.brand}</p>
                                        <p className="text-[10px] font-bold text-white/60 font-display">Rs. {item.price}</p>
                                    </div>
                                    <h3 className="text-xs font-bold tracking-tight truncate uppercase font-display">{item.name}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </section>
        </>
    );
}
