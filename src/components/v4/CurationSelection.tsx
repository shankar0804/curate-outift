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

            <div className="px-6 pt-10 pb-20">
                {/* The "Styled around" Context */}
                <div className="flex items-center gap-5 mb-12 p-6 rounded-[32px] bg-white/5 border border-white/10">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                        <motion.img
                            layoutId={`item-image-${item.id}`}
                            src={item.image}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Styling around</p>
                        <h2 className="text-xl font-bold leading-tight">{item.name}</h2>
                        <p className="text-sm font-bold opacity-60 mt-1">${item.price}</p>
                    </div>
                </div>

                <h3 className="text-2xl font-display font-bold mb-6">Pick a Vibe</h3>

                <div className="space-y-4">
                    {outfits.map((outfit, idx) => {
                        const stylist = stylists.find(s => s.id === outfit.stylistId);
                        return (
                            <motion.div
                                key={outfit.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                onClick={() => navigate(`/look/${outfit.id}?from=${item.id}`)}
                                whileTap={{ scale: 0.98 }}
                                className="group relative h-64 rounded-[40px] overflow-hidden cursor-pointer border border-white/5"
                            >
                                <img src={outfit.modelImage} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                                <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col items-start">
                                    <div className="flex items-center gap-2 mb-3">
                                        <img src={stylist?.avatar} className="w-6 h-6 rounded-full border border-white/20 object-cover" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/60">by {stylist?.name}</span>
                                    </div>
                                    <h4 className="text-2xl font-bold mb-1">{outfit.name}</h4>
                                    <div className="flex gap-2">
                                        {outfit.vibe.slice(0, 2).map(v => (
                                            <span key={v} className="text-[9px] font-bold text-white/40 uppercase tracking-widest"># {v}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="absolute top-8 right-8 w-12 h-12 rounded-full glass-panel flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                                    <ChevronRight className="w-5 h-5" />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
