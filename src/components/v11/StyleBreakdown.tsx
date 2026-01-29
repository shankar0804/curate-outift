import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { curatedOutfits, fashionItems, stylists, FashionItem } from '@/data/curatedData';
import { ArrowLeft, ExternalLink, Sparkles } from 'lucide-react';
import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export function StyleBreakdown() {
    const { outfitId } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [savedItems, setSavedItems] = useState<Set<string>>(new Set());

    const focalItemId = searchParams.get('from');

    const outfit = useMemo(() =>
        curatedOutfits.find(o => o.id === outfitId),
        [outfitId]);

    const focusItem = useMemo(() =>
        focalItemId ? fashionItems[focalItemId] : null,
        [focalItemId]);

    if (!outfit) {
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6 text-center">
                <div>
                    <h2 className="text-xl font-bold mb-4">Look not found</h2>
                    <button onClick={() => navigate('/')} className="px-6 py-2 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs">
                        Back to Wardrobe
                    </button>
                </div>
            </div>
        );
    }

    const stylist = stylists.find(s => s.id === outfit.stylistId);

    const allItems: FashionItem[] = [
        outfit.items.shirt && fashionItems[outfit.items.shirt],
        outfit.items.pants && fashionItems[outfit.items.pants],
        outfit.items.shoes && fashionItems[outfit.items.shoes],
        outfit.items.outerwear && fashionItems[outfit.items.outerwear],
        ...(outfit.items.accessories?.map(id => fashionItems[id]) || [])
    ].filter((item): item is FashionItem => !!item);

    const toggleSave = (id: string) => {
        setSavedItems(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id); else next.add(id);
            return next;
        });
    };

    const isDesktop = useMediaQuery('(min-width: 768px)');

    return (
        <div className="h-screen bg-background text-foreground">
            {isDesktop ? (
                <div className="h-full overflow-hidden flex">
                    <DesktopView
                        outfit={outfit}
                        stylist={stylist}
                        allItems={allItems}
                        focusItem={focusItem}
                        savedItems={savedItems}
                        toggleSave={toggleSave}
                        navigate={navigate}
                    />
                </div>
            ) : (
                <div className="h-full overflow-y-auto scrollbar-hide">
                    <MobileView
                        outfit={outfit}
                        stylist={stylist}
                        allItems={allItems}
                        focusItem={focusItem}
                        savedItems={savedItems}
                        toggleSave={toggleSave}
                        navigate={navigate}
                    />
                </div>
            )}
        </div>
    );
}

interface ViewProps {
    outfit: any;
    stylist: any;
    allItems: any[];
    focusItem?: any;
    savedItems: Set<string>;
    toggleSave: (id: string) => void;
    navigate: any;
}

function DesktopView({ outfit, stylist, allItems, focusItem, savedItems, toggleSave, navigate }: ViewProps) {
    return (
        <>
            {/* Left: Cinematic Hero (Fixed) */}
            <div className="w-1/2 h-full relative border-r border-white/5 bg-black">
                <header className="absolute top-0 left-0 right-0 z-50 p-8 flex items-center justify-between pointer-events-none">
                    <button
                        onClick={() => navigate(-1)}
                        className="pointer-events-auto flex items-center gap-3 px-6 py-3 rounded-full glass-panel border border-white/10 group active:scale-95 transition-all text-sm font-bold uppercase tracking-widest"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Curations
                    </button>

                    <div className="pointer-events-auto flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black font-bold text-[10px] uppercase tracking-[0.2em] shadow-2xl">
                        <Sparkles className="w-3 h-3" />
                        <span className="text-[9px] tracking-[0.2em] font-display">V11 EDITION</span>
                    </div>
                </header>

                <motion.div
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                >
                    <img src={outfit.modelImage} className="w-full h-full object-cover object-top opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/40" />
                </motion.div>

                <div className="absolute inset-x-0 bottom-0 p-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 1 }}
                    >
                        <span className="text-white/10 text-[10px] font-medium uppercase tracking-[0.6em] mb-4 block font-display">Archive Exhibit</span>
                        <h1 className="text-[6vw] font-display font-extrabold leading-none text-white uppercase mb-8">
                            {outfit.name}.
                        </h1>

                        <div className="flex items-center gap-6 pt-10 border-t border-white/10">
                            <img src={stylist?.avatar} className="w-14 h-14 rounded-2xl object-cover border border-white/10 grayscale hover:grayscale-0 transition-all cursor-crosshair" />
                            <div className="font-display">
                                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20 mb-1">Curated Perspective</p>
                                <p className="text-xl font-bold text-white uppercase tracking-tight">{stylist?.name}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Right: Detailed Breakdown (Scrollable) */}
            <div className="flex-1 h-full overflow-y-auto scrollbar-hide bg-white/[0.01]">
                <div className="p-16 max-w-4xl mx-auto">
                    <div className="flex items-center gap-6 mb-16 font-display">
                        <h2 className="text-3xl font-display font-extrabold leading-none">Essentials.</h2>
                        <div className="h-px flex-1 bg-white/5 mt-2" />
                        <span className="text-[10px] font-medium text-white/20 uppercase tracking-[0.4em]">{allItems.length} COMPONENTS</span>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        {allItems.map((item: any, idx: number) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * idx, duration: 0.8 }}
                                className="group p-8 rounded-[48px] bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all duration-500"
                            >
                                <div className="relative w-full aspect-square rounded-[32px] overflow-hidden bg-white/5 mb-8 shadow-2xl">
                                    <img src={item.image} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" />
                                    {item.id === focusItem?.id && (
                                        <div className="absolute top-6 left-6 px-4 py-2 rounded-xl bg-white text-black text-[10px] font-bold uppercase tracking-widest shadow-2xl font-display">
                                            The Root
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 font-display">
                                    <div className="flex items-start justify-between mb-6">
                                        <div>
                                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20 mb-1 block group-hover:text-white/40 transition-colors">{item.brand}</span>
                                            <h4 className="text-lg font-display font-bold uppercase leading-tight">{item.name}</h4>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-2xl font-bold text-white/90">${item.price}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => toggleSave(item.id)}
                                            className={cn(
                                                "flex-1 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all border",
                                                savedItems.has(item.id)
                                                    ? "bg-white text-black border-white shadow-2xl scale-[1.02]"
                                                    : "bg-white/5 text-white border-white/5 hover:bg-white/10 hover:border-white/20"
                                            )}
                                        >
                                            {savedItems.has(item.id) ? 'Archived' : 'Archive'}
                                        </button>
                                        <a
                                            href={item.purchaseUrl}
                                            target="_blank"
                                            className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center shadow-2xl hover:scale-110 active:scale-90 transition-all"
                                        >
                                            <ExternalLink className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Decorative Footer */}
                    <div className="mt-24 pt-12 border-t border-white/5 flex items-center justify-between text-white/10">
                        <span className="text-[10px] font-black uppercase tracking-widest">Minimal Collection № 011</span>
                        <span className="text-[10px] font-black uppercase tracking-widest">2026 Season</span>
                    </div>
                </div>
            </div>
        </>
    );
}

function MobileView({ outfit, stylist, allItems, focusItem, savedItems, toggleSave, navigate }: ViewProps) {
    return (
        <div className="pb-32 font-display">
            <header className="absolute top-0 left-0 right-0 z-50 p-6 flex items-center justify-between pointer-events-none">
                <button
                    onClick={() => navigate(-1)}
                    className="pointer-events-auto w-12 h-12 rounded-2xl glass-panel border border-white/10 flex items-center justify-center active:scale-90 transition-all"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
            </header>

            <div className="relative h-[85vh] w-full overflow-hidden rounded-b-[64px] border-b border-white/5">
                <img src={outfit.modelImage} className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                    <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/30 mb-2 block font-display">Archive Exhibit</span>
                    <h1 className="text-5xl font-display font-extrabold text-white uppercase leading-none mb-8 tracking-tight">{outfit.name}.</h1>
                    <div className="flex items-center gap-4 py-6 border-t border-white/10">
                        <img src={stylist?.avatar} className="w-10 h-10 rounded-xl object-cover grayscale" />
                        <div>
                            <p className="text-[8px] font-bold uppercase tracking-widest text-white/30">Curator</p>
                            <p className="text-sm font-bold text-white uppercase tracking-tight">{stylist?.name}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <div className="flex items-center gap-4 mb-8 pt-8 font-display">
                    <h2 className="text-2xl font-display font-extrabold tracking-tight">Essentials.</h2>
                    <div className="h-px flex-1 bg-white/5" />
                    <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{allItems.length} ITEMS</span>
                </div>

                <div className="space-y-8 font-display">
                    {allItems.map((item: any) => (
                        <div key={item.id} className="relative p-6 rounded-[32px] bg-white/[0.02] border border-white/5">
                            <div className="flex gap-6 mb-6">
                                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white/5 shrink-0">
                                    <img src={item.image} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-white/20 mb-1 block">{item.brand}</span>
                                    <h4 className="text-lg font-display font-bold uppercase leading-tight mb-2 font-display">{item.name}</h4>
                                    <span className="text-xl font-bold text-white/80">${item.price}</span>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => toggleSave(item.id)}
                                    className={cn(
                                        "flex-1 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all border font-display",
                                        savedItems.has(item.id)
                                            ? "bg-white text-black border-white shadow-2xl"
                                            : "bg-white/5 text-white border-white/5"
                                    )}
                                >
                                    {savedItems.has(item.id) ? 'Archived' : 'Archive'}
                                </button>
                                <a
                                    href={item.purchaseUrl}
                                    target="_blank"
                                    className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center shadow-2xl"
                                >
                                    <ExternalLink className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
