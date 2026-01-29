import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { fashionItems, stylists, getOutfitsByItem } from '@/data/curatedData';
import { ArrowLeft, Sparkles, ChevronRight } from 'lucide-react';

export function CurationSelection() {
    const { itemId } = useParams();
    const navigate = useNavigate();

    const item = itemId ? fashionItems[itemId] : null;
    const outfits = itemId ? getOutfitsByItem(itemId) : [];

    if (!item) {
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6 text-center">
                <div>
                    <h2 className="text-xl font-bold mb-4">Item not found</h2>
                    <button onClick={() => navigate('/')} className="px-6 py-2 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs">
                        Back to Wardrobe
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <header className="p-6 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-xl z-10 border-b border-white/5">
                <button onClick={() => navigate('/')} className="flex items-center gap-2 group">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-bold tracking-widest uppercase">BACK</span>
                </button>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    <Sparkles className="w-3 h-3 text-yellow-300" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">Expert Curations</span>
                </div>
            </header>

            <div className="flex-1 px-6 pt-10 pb-32">
                {/* The "Styled around" Context */}
                <div className="flex items-center gap-6 mb-16 p-6 rounded-[40px] glass-panel border border-white/10 shadow-2xl">
                    <div className="w-28 h-28 rounded-3xl overflow-hidden shrink-0 shadow-xl">
                        <motion.img
                            layoutId={`item-image-${item.id}`}
                            src={item.image}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-2">Refining the style</p>
                        <h2 className="text-2xl font-display font-black leading-tight tracking-tight">{item.name}</h2>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-lg font-black text-white/90">${item.price}</span>
                            <div className="h-1 w-1 rounded-full bg-white/20" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{item.brand}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-10">
                    <h3 className="text-4xl font-display font-black tracking-tighter">Choose a Vibe.</h3>
                    <div className="h-0.5 flex-1 mx-6 bg-white/5" />
                </div>

                <div className="grid gap-12">
                    {outfits.map((outfit, idx) => {
                        const stylist = stylists.find(s => s.id === outfit.stylistId);
                        return (
                            <motion.div
                                key={outfit.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                onClick={() => navigate(`/look/${outfit.id}?from=${item.id}`)}
                                whileTap={{ scale: 0.98 }}
                                className="group relative h-[70vh] rounded-[60px] overflow-hidden cursor-pointer border border-white/5 shadow-2xl"
                            >
                                <motion.img
                                    src={outfit.modelImage}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

                                <div className="absolute inset-x-0 bottom-0 p-10 pb-12 flex flex-col items-start translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="flex items-center gap-3 mb-6 bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
                                        <img src={stylist?.avatar} className="w-8 h-8 rounded-xl border border-white/20 object-cover" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">Styled by {stylist?.name}</span>
                                    </div>
                                    <h4 className="text-5xl font-display font-black mb-4 tracking-tighter text-white">{outfit.name}</h4>
                                    <div className="flex flex-wrap gap-3">
                                        {outfit.vibe.map(v => (
                                            <span key={v} className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-[9px] font-black text-white/60 uppercase tracking-[0.2em]">
                                                {v}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="absolute top-10 right-10 w-16 h-16 rounded-full glass-panel flex items-center justify-center translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 border border-white/20 shadow-2xl">
                                    <ChevronRight className="w-6 h-6 text-white" />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
