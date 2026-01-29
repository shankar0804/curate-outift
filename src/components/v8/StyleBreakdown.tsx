import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { curatedOutfits, fashionItems, stylists, FashionItem } from '@/data/curatedData';
import { ArrowLeft, ShoppingBag, ExternalLink, Sparkles, Plus } from 'lucide-react';
import { useState, useMemo, useRef } from 'react';
import { cn } from '@/lib/utils';

export function StyleBreakdown() {
    const { outfitId } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [savedItems, setSavedItems] = useState<Set<string>>(new Set());
    const detailContainerRef = useRef(null);

    const focalItemId = searchParams.get('from');

    const outfit = useMemo(() =>
        curatedOutfits.find(o => o.id === outfitId),
        [outfitId]);

    const focusItem = useMemo(() =>
        focalItemId ? fashionItems[focalItemId] : null,
        [focalItemId]);

    const { scrollYProgress } = useScroll({
        target: detailContainerRef,
        offset: ["start start", "end end"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
    const blur = useTransform(scrollYProgress, [0, 0.3], ["blur(0px)", "blur(20px)"]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.4]);

    if (!outfit) {
        return (
            <div className="min-h-screen bg-black text-foreground flex items-center justify-center p-6 text-center">
                <div>
                    <h2 className="text-xl font-bold mb-4">Look not found</h2>
                    <button onClick={() => navigate('/')} className="px-6 py-2 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs">
                        Back to Studio
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
        <div ref={detailContainerRef} className="min-h-screen bg-black text-foreground selection:bg-white selection:text-black">
            {/* Cinematic Sticky Anchor */}
            <div className="fixed inset-0 z-0 h-screen w-full overflow-hidden">
                <motion.div style={{ scale, filter: blur, opacity }} className="h-full w-full">
                    <img src={outfit.modelImage} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </motion.div>
            </div>

            {/* Kinetic Header */}
            <header className="fixed top-0 left-0 right-0 z-50 px-8 py-10 flex items-center justify-between pointer-events-none">
                <button
                    onClick={() => navigate(-1)}
                    className="pointer-events-auto flex items-center gap-3 group px-5 py-3 rounded-full glass-panel border border-white/10"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] font-black tracking-[0.3em] uppercase">CURATIONS</span>
                </button>
                <div className="pointer-events-auto flex items-center gap-4">
                    <div className="px-5 py-3 rounded-full glass-panel border border-white/10 uppercase text-[10px] font-black tracking-widest text-white/40">
                        {outfit.name}
                    </div>
                </div>
            </header>

            {/* Scrolling Content Stage */}
            <div className="relative z-10">
                {/* Hero Spacer & Title */}
                <div className="h-screen flex flex-col justify-end p-8 pb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <img src={stylist?.avatar} className="w-14 h-14 rounded-2xl border-2 border-white/20 shadow-2xl object-cover" />
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Styled By</p>
                                <p className="text-sm font-bold">{stylist?.name}</p>
                            </div>
                        </div>
                        <h1 className="text-7xl font-display font-black leading-[0.85] tracking-tighter italic uppercase mb-8">
                            {outfit.name}.
                        </h1>
                        <p className="max-w-xs text-lg text-white/60 font-medium leading-relaxed italic border-l-2 border-white/10 pl-6">
                            "{outfit.description}"
                        </p>
                    </motion.div>
                </div>

                {/* The "Slide-to-Explore" Breakdown */}
                <section className="bg-black/80 backdrop-blur-3xl rounded-t-[64px] border-t border-white/10 px-6 pt-20 pb-64 min-h-screen shadow-[0_-50px_100px_rgba(0,0,0,0.9)]">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-0.5 w-12 bg-white/20" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">The Archive Breakdown</span>
                            </div>
                            <h2 className="text-5xl font-display font-black tracking-tighter">Hand-Picked.</h2>
                        </div>
                        <div className="text-right glass-panel p-6 rounded-[32px] border border-white/5">
                            <p className="text-[10px] font-bold text-white/10 uppercase tracking-widest mb-1">Look Value</p>
                            <p className="text-4xl font-black">${totalPrice}</p>
                        </div>
                    </div>

                    <div className="grid gap-10">
                        {allItems.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * (idx % 4) }}
                                className="flex flex-col md:flex-row items-center gap-8 p-8 rounded-[48px] bg-white/[0.02] border border-white/5 group hover:bg-white/[0.04] transition-all"
                            >
                                <div className="relative w-full md:w-56 aspect-square rounded-[40px] overflow-hidden bg-black/40 border border-white/10 shadow-2xl">
                                    <img src={item.image} className="w-full h-full object-cover filter brightness-90 group-hover:brightness-110 transition-all duration-700" />
                                    {item.id === focusItem?.id && (
                                        <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-yellow-400 text-black text-[10px] font-black uppercase tracking-widest shadow-2xl">
                                            The Anchor
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 w-full flex flex-col justify-between py-2">
                                    <div className="mb-8">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/20">{item.brand}</span>
                                                <h4 className="text-3xl font-display font-black mt-2 tracking-tighter leading-none">{item.name}</h4>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-2xl font-black opacity-90">${item.price}</span>
                                            </div>
                                        </div>
                                        <div className="h-px w-full bg-white/5 mt-4" />
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => toggleSave(item.id)}
                                            className={cn(
                                                "px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                                                savedItems.has(item.id)
                                                    ? "bg-white text-black shadow-2xl"
                                                    : "bg-white/5 text-white/40 border border-white/10 hover:bg-white/10"
                                            )}
                                        >
                                            {savedItems.has(item.id) ? 'Archived' : 'Archive Piece'}
                                        </button>
                                        <a
                                            href={item.purchaseUrl}
                                            target="_blank"
                                            className="flex-1 px-8 py-4 rounded-2xl bg-white text-black text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
                                        >
                                            Visit Atelier <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>

            {/* V1 Inspired Fixed Bottom CTA */}
            <div className="fixed bottom-10 left-8 right-8 z-40">
                <button
                    onClick={() => allItems.forEach(i => window.open(i.purchaseUrl, '_blank'))}
                    className="w-full py-7 bg-white text-black rounded-[32px] font-black text-xs tracking-[0.4em] uppercase flex items-center justify-center gap-4 shadow-[0_30px_60px_rgba(0,0,0,0.8)] active:scale-95 transition-all"
                >
                    <ShoppingBag className="w-5 h-5" />
                    Acquire Complete Archive
                </button>
            </div>
        </div>
    );
}
