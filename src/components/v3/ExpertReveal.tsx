import { motion, AnimatePresence } from 'motion/react';
import { CuratedOutfit, fashionItems, stylists, FashionItem } from '@/data/curatedData';
import { ArrowLeft, ShoppingBag, X, Info, CheckCircle2, Star } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ExpertRevealProps {
    outfit: CuratedOutfit;
    focusItem: FashionItem;
    onClose: () => void;
}

export function ExpertReveal({ outfit, focusItem, onClose }: ExpertRevealProps) {
    const [showShop, setShowShop] = useState(false);
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
            {/* Immersive AI Model Background */}
            <div className="absolute inset-0">
                <motion.img
                    layoutId={`outfit-image-${outfit.id}`}
                    src={outfit.modelImage}
                    alt={outfit.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
            </div>

            {/* Floating Header UI */}
            <header className="relative z-10 p-6 flex justify-between items-start">
                <button
                    onClick={onClose}
                    className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white active:scale-95 transition-transform"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>

                <div className="flex flex-col items-end gap-2">
                    <div className="glass-panel px-4 py-2 rounded-2xl flex items-center gap-3">
                        <div className="text-right">
                            <p className="text-[9px] font-black tracking-widest uppercase text-white/40">MASTER STYLIST</p>
                            <p className="text-xs font-bold text-white">{stylist?.name}</p>
                        </div>
                        <img src={stylist?.avatar} className="w-8 h-8 rounded-full border border-white/20 object-cover" />
                    </div>
                </div>
            </header>

            {/* Animated Annotations (Taste Markers) */}
            <div className="flex-1 relative z-10">
                <TasteMarker
                    x="30%" y="45%"
                    label="Symmetry"
                    note="The neckline depth matches the trouser silhouette for a balanced center of gravity."
                    delay={1}
                />
                <TasteMarker
                    x="65%" y="75%"
                    label="Texture Contrast"
                    note="Mixing the crisp cotton of the focus item with these suede textures adds sophistication."
                    delay={1.5}
                />
            </div>

            {/* Reveal Overlay Content */}
            <div className="relative z-10 p-8">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mb-8"
                >
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-black mb-4">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-[10px] font-black tracking-widest uppercase">The Masterpiece</span>
                    </div>
                    <h1 className="font-display text-5xl font-bold text-white mb-3">"{outfit.name}"</h1>
                    <p className="text-white/60 text-sm italic max-w-sm leading-relaxed border-l-2 border-white/20 pl-4">
                        {outfit.description}
                    </p>
                </motion.div>

                {/* Action Bar */}
                <div className="flex gap-4">
                    <button
                        onClick={() => setShowShop(true)}
                        className="flex-1 py-5 bg-white text-black rounded-[24px] font-bold text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-transform"
                    >
                        <ShoppingBag className="w-4 h-4" />
                        Shop the Vision
                    </button>
                    <button className="w-16 h-16 rounded-[24px] glass-panel flex items-center justify-center text-white">
                        <Info className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Shopping Drawer Side-Sheet */}
            <AnimatePresence>
                {showShop && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                            onClick={() => setShowShop(false)}
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 bottom-0 w-[85vw] max-w-sm z-50 bg-black border-l border-white/10 p-8 overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-10">
                                <h2 className="text-xl font-bold tracking-tight">The Curation</h2>
                                <button onClick={() => setShowShop(false)} className="w-10 h-10 rounded-full glass-panel flex items-center justify-center">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-8">
                                {items.map((item, idx) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white/5 border border-white/10 shrink-0">
                                            <img src={item.image} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <div>
                                                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-tighter">{item.brand}</p>
                                                    <h4 className="text-xs font-semibold truncate mt-0.5">{item.name}</h4>
                                                </div>
                                                {item.id === focusItem.id && (
                                                    <span className="px-2 py-0.5 rounded-full bg-yellow-400 text-black text-[8px] font-black uppercase shrink-0">Your Focal</span>
                                                )}
                                            </div>
                                            <p className="text-sm font-bold mt-1">${item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full mt-12 py-5 bg-yellow-400 text-black rounded-[24px] font-black text-xs tracking-widest uppercase flex items-center justify-center gap-3">
                                <CheckCircle2 className="w-4 h-4" />
                                Reserve Complete Look
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

function TasteMarker({ x, y, label, note, delay }: { x: string; y: string; label: string; note: string; delay: number }) {
    const [open, setOpen] = useState(false);

    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay, type: "spring" }}
            className="absolute"
            style={{ left: x, top: y }}
        >
            <div className="relative">
                <button
                    onClick={() => setOpen(!open)}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white animate-pulse"
                >
                    <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white]" />
                </button>

                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 10 }}
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 p-4 glass-panel rounded-2xl"
                        >
                            <p className="text-[10px] font-black uppercase tracking-widest text-yellow-300 mb-1">{label}</p>
                            <p className="text-[11px] font-medium leading-relaxed text-white/80">{note}</p>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-white/10 border-8 border-transparent border-t-white/10" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
