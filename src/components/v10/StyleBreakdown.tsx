import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { curatedOutfits, fashionItems, stylists, FashionItem } from '@/data/curatedData';
import { ArrowLeft, ExternalLink, Sparkles } from 'lucide-react';
import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';

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

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            {/* Cinematic Fixed Header */}
            <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex items-center justify-between pointer-events-none">
                <button
                    onClick={() => navigate(-1)}
                    className="pointer-events-auto flex items-center gap-2 group px-4 py-2 rounded-full glass-panel border border-white/10"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase">CURATIONS</span>
                </button>
            </header>

            {/* Stage 1: The Cinema Hero (Full Bleed) */}
            <div className="relative h-[90vh] w-full overflow-hidden">
                <motion.div
                    initial={{ scale: 1.05, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                >
                    <img src={outfit.modelImage} className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </motion.div>

                <div className="absolute inset-x-0 bottom-0 p-8 pb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        <h1 className="text-4xl font-display font-black leading-tight mb-6 tracking-tighter text-white uppercase italic">
                            {outfit.name}.
                        </h1>

                        <div className="flex items-center justify-between border-t border-white/10 pt-6">
                            <div className="flex items-center gap-3">
                                <img src={stylist?.avatar} className="w-6 h-6 rounded-full object-cover border border-white/20 grayscale" />
                                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40">Curated by {stylist?.name}</span>
                            </div>
                            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[8px] font-black tracking-widest text-white/20 uppercase">
                                Archive № {outfit.id}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Stage 2: The Utility Breakdown */}
            <div className="relative z-10 bg-background pt-4 pb-48">
                <div className="px-6">
                    <div className="grid gap-6">
                        {allItems.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * (idx % 3) }}
                                className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-[40px] bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all"
                            >
                                <div className="relative w-full md:w-48 aspect-square rounded-[32px] overflow-hidden bg-white/5 shadow-2xl">
                                    <img src={item.image} className="w-full h-full object-cover grayscale-[0.2] transition-all group-hover:grayscale-0" />
                                    {item.id === focusItem?.id && (
                                        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-yellow-400 text-black text-[10px] font-black uppercase tracking-widest shadow-xl">
                                            The Hub
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 w-full">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/30">{item.brand}</span>
                                            <h4 className="text-xl font-bold mt-1 tracking-tight">{item.name}</h4>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xl font-black">${item.price}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => toggleSave(item.id)}
                                            className={cn(
                                                "px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                                                savedItems.has(item.id)
                                                    ? "bg-white text-black shadow-xl"
                                                    : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                                            )}
                                        >
                                            {savedItems.has(item.id) ? 'In Collection' : 'Acquire Later'}
                                        </button>
                                        <a
                                            href={item.purchaseUrl}
                                            target="_blank"
                                            className="flex-1 px-6 py-3 rounded-2xl bg-white text-black text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
                                        >
                                            Check Availability <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
