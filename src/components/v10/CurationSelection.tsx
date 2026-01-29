import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { fashionItems, stylists, getOutfitsByItem } from '@/data/curatedData';
import { ArrowLeft, ChevronRight } from 'lucide-react';

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
            </header>

            <div className="flex-1 px-6 pt-10 pb-32">
                {/* The "Styled around" Context */}
                <div className="flex items-center gap-8 mb-16 px-4">
                    <div className="w-40 h-50 rounded-3xl overflow-hidden shrink-0 bg-white/[0.03] border border-white/10 shadow-2xl">
                        <motion.img
                            layoutId={`item-image-${item.id}`}
                            src={item.image}
                            className="w-full h-full object-cover object-top"
                        />
                    </div>
                    <div>
                        <p className="text-[11px] font-black text-white/15 uppercase tracking-[0.5em] mb-2">{item.brand}</p>
                        <h2 className="text-2xl font-bold tracking-tighter uppercase leading-none">{item.name}</h2>
                        <div className="h-0.5 w-10 bg-white/10 my-4" />
                        <span className="text-2xl font-black text-white/90">${item.price}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-10">
                    <h3 className="text-4xl font-display font-black tracking-tighter">Choose a Vibe.</h3>
                    <div className="h-0.5 flex-1 mx-6 bg-white/5" />
                </div>

                <div className="grid gap-8">
                    {outfits.map((outfit) => {
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
                                className="group relative h-[65vh] rounded-[40px] overflow-hidden cursor-pointer border border-white/5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] bg-white/5"
                            >
                                <motion.img
                                    src={outfit.modelImage}
                                    className="absolute inset-x-0 bottom-0 w-full h-[110%] object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent" />

                                <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col items-start">
                                    <h4 className="text-3xl font-display font-black mb-3 tracking-tighter text-white uppercase italic">{outfit.name}</h4>

                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex flex-wrap gap-2">
                                            {outfit.vibe.map(v => (
                                                <span key={v} className="text-[8px] font-black text-white/30 uppercase tracking-[0.1em]">
                                                    {v}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                                            <img src={stylist?.avatar} className="w-4 h-4 rounded-full grayscale object-cover opacity-80" />
                                            <span className="text-[7px] font-black uppercase tracking-[0.2em] text-white/40">{stylist?.name}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute top-6 right-6 w-12 h-12 rounded-full glass-panel flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 border border-white/20 shadow-xl">
                                    <ChevronRight className="w-5 h-5 text-white" />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
