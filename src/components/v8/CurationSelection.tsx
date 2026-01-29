import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { fashionItems, stylists, getOutfitsByItem } from '@/data/curatedData';
import { ArrowLeft, Sparkles, ChevronRight, Share2 } from 'lucide-react';
import { useMemo } from 'react';

export function CurationSelection() {
    const { itemId } = useParams();
    const navigate = useNavigate();

    const item = useMemo(() =>
        itemId ? fashionItems[itemId] : null,
        [itemId]);

    const outfits = useMemo(() =>
        itemId ? getOutfitsByItem(itemId) : [],
        [itemId]);

    if (!item) return null;

    return (
        <div className="min-h-screen bg-black text-foreground selection:bg-white selection:text-black overflow-x-hidden">
            {/* Cinematic Fixed Header */}
            <header className="fixed top-0 left-0 right-0 z-50 px-8 py-10 flex items-center justify-between pointer-events-none">
                <button
                    onClick={() => navigate('/')}
                    className="pointer-events-auto flex items-center gap-3 group px-5 py-3 rounded-full glass-panel border border-white/10 hover:bg-white/5 transition-all active:scale-95"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white/60 group-hover:text-white transition-colors">THE STUDIO</span>
                </button>
                <div className="pointer-events-auto flex items-center gap-4">
                    <button className="w-12 h-12 rounded-full glass-panel border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors border border-white/5 active:scale-95">
                        <Share2 className="w-4 h-4" />
                    </button>
                    <div className="px-5 py-3 rounded-full glass-panel border border-white/10">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Recording Session</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Stage 1: The Spotlight Pedestal */}
            <section className="relative h-[80vh] flex flex-col items-center justify-center pt-24 overflow-hidden">
                {/* Spotlight Background Beam */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-full bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08)_0%,transparent_70%)] pointer-events-none" />

                <motion.div
                    layoutId={`item-image-${item.id}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 w-72 h-72 md:w-96 md:h-96"
                >
                    <div className="absolute inset-0 bg-white/5 blur-[80px] rounded-full scale-150 opacity-20" />
                    <img
                        src={item.image}
                        className="w-full h-full object-contain drop-shadow-[0_45px_100px_rgba(0,0,0,0.8)] filter brightness-110 contrast-110"
                    />

                    {/* Shadow on "Floor" */}
                    <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-48 h-12 bg-black/80 blur-2xl rounded-full scale-150" />
                </motion.div>

                <div className="mt-12 text-center z-10">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20 mb-3"
                    >
                        In The Spotlight
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-4xl font-display font-black tracking-tighter"
                    >
                        {item.name}
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="h-px w-24 bg-white/10 mx-auto mt-6"
                    />
                </div>
            </section>

            {/* Stage 2: The Curations (Motion Cards) */}
            <section className="relative z-20 pb-48 px-6">
                <div className="flex items-center justify-between mb-16">
                    <div className="flex items-center gap-4">
                        <div className="h-0.5 w-12 bg-white/20" />
                        <h3 className="text-4xl font-display font-black tracking-tighter italic">Vibe Select.</h3>
                    </div>
                </div>

                <div className="grid gap-16 max-w-lg mx-auto">
                    {outfits.map((outfit, idx) => {
                        const stylist = stylists.find(s => s.id === outfit.stylistId);
                        return (
                            <motion.div
                                key={outfit.id}
                                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                onClick={() => navigate(`/look/${outfit.id}?from=${item.id}`)}
                                whileTap={{ scale: 0.98 }}
                                className="group relative cursor-pointer"
                            >
                                <div className="absolute -inset-4 rounded-[64px] bg-white/[0.02] border border-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-105" />

                                <div className="relative aspect-[3/4] rounded-[56px] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.8)] border border-white/10">
                                    <motion.img
                                        src={outfit.modelImage}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

                                    <div className="absolute inset-x-0 bottom-0 p-10 pb-12">
                                        <div className="flex items-center gap-3 mb-6 bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 w-fit">
                                            <img src={stylist?.avatar} className="w-8 h-8 rounded-xl border border-white/20 object-cover" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Styled by {stylist?.name}</span>
                                        </div>
                                        <h4 className="text-4xl font-display font-black mb-6 tracking-tighter leading-none italic uppercase">{outfit.name}</h4>
                                        <div className="flex flex-wrap gap-3">
                                            {outfit.vibe.map(v => (
                                                <span key={v} className="px-5 py-2 rounded-full border border-white/10 text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">
                                                    {v}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="absolute top-10 right-10 w-20 h-20 rounded-full glass-panel flex items-center justify-center translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 border border-white/20 shadow-2xl">
                                        <ChevronRight className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
