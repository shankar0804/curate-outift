import { motion } from 'motion/react';
import { CuratedOutfit, fashionItems, stylists, FashionItem } from '@/data/curatedData';
import { ShoppingBag, ExternalLink, X, ChevronRight } from 'lucide-react';

interface LookbookOverlayProps {
    outfit: CuratedOutfit;
    onClose: () => void;
}

export function LookbookOverlay({ outfit, onClose }: LookbookOverlayProps) {
    const stylist = stylists.find(s => s.id === outfit.stylistId);
    const items = [
        outfit.items.shirt && fashionItems[outfit.items.shirt],
        outfit.items.pants && fashionItems[outfit.items.pants],
        outfit.items.shoes && fashionItems[outfit.items.shoes],
        outfit.items.outerwear && fashionItems[outfit.items.outerwear],
        ...(outfit.items.accessories?.map(id => fashionItems[id]) || [])
    ].filter((item): item is FashionItem => !!item);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background overflow-hidden flex flex-col"
        >
            {/* Immersive Header Image */}
            <div className="relative h-[70vh] w-full shrink-0">
                <motion.img
                    layoutId={`outfit-image-${outfit.id}`}
                    src={outfit.modelImage}
                    alt={outfit.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background" />

                {/* Top Controls */}
                <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center">
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="glass-panel px-3 py-1.5 rounded-full flex items-center gap-2">
                        <img src={stylist?.avatar} className="w-5 h-5 rounded-full object-cover" />
                        <span className="text-[10px] font-bold tracking-widest uppercase text-white/90">Curated by {stylist?.name.split(' ')[0]}</span>
                    </div>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-12 left-6 right-6">
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="font-display text-4xl font-bold text-white mb-2 leading-tight"
                    >
                        {outfit.name}
                    </motion.h1>
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex gap-2"
                    >
                        {outfit.vibe.map(v => (
                            <span key={v} className="text-[10px] font-bold uppercase tracking-widest text-white/60"># {v}</span>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Swipeable Bottom Sheet Area */}
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex-1 bg-background relative z-10 -mt-10 rounded-t-[32px] px-6 pt-10 pb-12 overflow-y-auto"
            >
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <ShoppingBag className="w-5 h-5 text-yellow-400" />
                        <h2 className="text-xl font-bold tracking-tight">Shop the Curation</h2>
                    </div>
                    <span className="text-xs font-bold text-white/40">{items.length} Primary Items</span>
                </div>

                <div className="space-y-6">
                    {items.map((item, idx) => (
                        <motion.div
                            key={item!.id}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 + idx * 0.1 }}
                            className="flex items-center gap-4 group"
                        >
                            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-muted/50 shrink-0">
                                <img src={item!.image} className="w-full h-full object-cover grayscale-[0.2] transition-all group-hover:grayscale-0" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] font-bold uppercase tracking-tighter text-white/40 truncate">{item!.brand}</p>
                                <h3 className="text-sm font-semibold truncate leading-tight mt-0.5">{item!.name}</h3>
                                <p className="text-sm font-bold text-white/90 mt-1">${item!.price}</p>
                            </div>
                            <a
                                href={item!.purchaseUrl}
                                target="_blank"
                                className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center transition-all hover:bg-white/10 active:scale-95"
                            >
                                <ExternalLink className="w-4 h-4 text-white/60" />
                            </a>
                        </motion.div>
                    ))}
                </div>

                <motion.button
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-10 py-5 bg-white text-black rounded-full font-bold text-sm tracking-widest uppercase shadow-[0_20px_40px_rgba(255,255,255,0.1)] flex items-center justify-center gap-3 transition-transform"
                >
                    Checkout Full Look
                    <ChevronRight className="w-4 h-4" />
                </motion.button>
            </motion.div>
        </motion.div>
    );
}
