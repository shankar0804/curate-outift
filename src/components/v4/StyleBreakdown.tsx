import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { curatedOutfits, fashionItems, stylists, FashionItem } from '@/data/curatedData';
import { ArrowLeft, ShoppingBag, ExternalLink, Sparkles } from 'lucide-react';
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

    const totalPrice = allItems.reduce((sum, item) => sum + item.price, 0);

    const toggleSave = (id: string) => {
        setSavedItems(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id); else next.add(id);
            return next;
        });
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            {/* V1 Inspired Fixed Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/5 p-6 flex items-center justify-between">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 group">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-bold tracking-widest uppercase">CURATIONS</span>
                </button>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    <Sparkles className="w-3 h-3 text-yellow-300" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">{outfit.name}</span>
                </div>
            </header>

            {/* Main Content Area */}
            <div className="mt-24 pb-48">
                {/* Hero Visualized Look */}
                <div className="px-6 mb-12">
                    <div className="relative aspect-[3/4] rounded-[48px] overflow-hidden shadow-2xl shadow-black/50 border border-white/5">
                        <img src={outfit.modelImage} className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                        <div className="absolute bottom-8 left-8 right-8">
                            <div className="flex items-center gap-3 mb-4">
                                <img src={stylist?.avatar} className="w-10 h-10 rounded-2xl object-cover border border-white/20" />
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-white/40">STYLED BY</p>
                                    <p className="text-xs font-bold text-white">{stylist?.name}</p>
                                </div>
                            </div>
                            <p className="text-white/80 text-sm italic leading-relaxed">"{outfit.description}"</p>
                        </div>
                    </div>
                </div>

                {/* The Breakdown (The V1 Core Utility) */}
                <div className="px-6">
                    <div className="flex items-end justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-display font-bold tracking-tight">The Breakdown</h2>
                            <p className="text-xs font-bold text-white/30 uppercase tracking-widest mt-1">{allItems.length} Pieces to make the look</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">Total Effort</p>
                            <p className="text-2xl font-bold">${totalPrice}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {allItems.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * idx }}
                                className="flex items-center gap-4 p-4 rounded-3xl bg-white/5 border border-white/10 group active:scale-[0.98] transition-transform"
                            >
                                <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-white/5 shrink-0">
                                    <img src={item.image} className="w-full h-full object-cover grayscale-[0.2] transition-all group-hover:grayscale-0" />
                                    {item.id === focusItem?.id && (
                                        <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-lg bg-yellow-400 text-black text-[8px] font-black uppercase">Focal</div>
                                    )}
                                </div>

                                <div className="flex-1 min-w-0 py-1">
                                    <div className="flex items-start justify-between gap-2">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/30 truncate">{item.brand}</span>
                                        <span className="text-xs font-bold">${item.price}</span>
                                    </div>
                                    <h4 className="text-sm font-bold truncate mt-0.5">{item.name}</h4>
                                    <div className="flex gap-2 mt-4">
                                        <button
                                            onClick={() => toggleSave(item.id)}
                                            className={cn(
                                                "px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors",
                                                savedItems.has(item.id) ? "bg-white text-black" : "bg-white/10 text-white hover:bg-white/20"
                                            )}
                                        >
                                            {savedItems.has(item.id) ? 'Saved' : 'Save Piece'}
                                        </button>
                                        <a
                                            href={item.purchaseUrl}
                                            target="_blank"
                                            className="flex-1 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/10"
                                        >
                                            Visit Platform <ExternalLink className="w-2.5 h-2.5" />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* V1 Inspired Fixed Bottom CTA */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-background/80 backdrop-blur-3xl border-t border-white/5 z-40">
                <button
                    onClick={() => allItems.forEach(i => window.open(i.purchaseUrl, '_blank'))}
                    className="w-full py-5 bg-white text-black rounded-[24px] font-black text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-transform"
                >
                    <ShoppingBag className="w-4 h-4" />
                    Buy Complete Masterpiece
                </button>
            </div>
        </div>
    );
}
