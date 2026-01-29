import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { fashionItems, stylists, getOutfitsByItem } from '@/data/curatedData';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

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
    const isDesktop = useMediaQuery('(min-width: 768px)');

    return (
        <div className="h-screen bg-background text-foreground">
            {isDesktop ? (
                <div className="h-full overflow-hidden flex">
                    <DesktopView item={item} outfits={outfits} navigate={navigate} />
                </div>
            ) : (
                <div className="h-full overflow-y-auto scrollbar-hide">
                    <MobileView item={item} outfits={outfits} navigate={navigate} />
                </div>
            )}
        </div>
    );
}

interface ViewProps {
    item: any;
    outfits: any[];
    navigate: any;
}

function DesktopView({ item, outfits, navigate }: ViewProps) {
    return (
        <>
            {/* Left: Product Spotlight (Fixed) */}
            <aside className="w-[40vw] h-full relative flex flex-col border-r border-white/5 bg-white/[0.01]">
                <header className="p-8 flex items-center justify-between z-20 sticky top-0">
                    <button onClick={() => navigate('/')} className="flex items-center gap-2 group">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-bold tracking-widest uppercase">Inventory</span>
                    </button>
                </header>

                <div className="flex-1 relative flex items-center justify-center p-8 overflow-hidden">
                    <div className="w-full flex flex-col items-center max-h-[85vh] justify-center">
                        <motion.div
                            layoutId={`item-image-${item.id}`}
                            className="w-full max-w-[21vw] aspect-[3/4] rounded-[32px] overflow-hidden bg-white/[0.03] border border-white/10 shadow-2xl relative mb-6 shrink-0"
                        >
                            <img
                                src={item.image}
                                className="w-full h-full object-cover object-top"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="w-full max-w-[21vw] flex items-end justify-between gap-4"
                        >
                            <div className="text-left">
                                <p className="text-[9px] font-medium text-white/20 uppercase tracking-[0.6em] mb-4">{item.brand}</p>
                                <h2 className="text-2xl font-display font-bold uppercase leading-tight mb-4">{item.name}</h2>
                                <div className="flex items-center gap-3">
                                    <span className="text-lg font-bold text-white/20">${item.price}</span>
                                </div>
                            </div>

                            <a
                                href={item.purchaseUrl}
                                target="_blank"
                                className="px-5 py-3.5 rounded-[12px] bg-white text-black text-[8px] font-bold uppercase tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95 transition-all shrink-0 mb-1"
                            >
                                Shop Item
                            </a>
                        </motion.div>
                    </div>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-white/5 blur-[120px] rounded-full pointer-events-none -z-10" />
            </aside>

            {/* Right: Curated Vibes (Scrollable) */}
            <main className="flex-1 h-full overflow-y-auto scrollbar-hide px-12 pt-16 pb-48">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-6 mb-12">
                        <h3 className="text-4xl font-display font-extrabold leading-none">The Aesthetic.</h3>
                        <div className="h-px flex-1 bg-white/5 mt-4" />
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        {outfits.map((outfit: any) => {
                            const stylist = stylists.find(s => s.id === outfit.stylistId);
                            return (
                                <motion.div
                                    key={outfit.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    onClick={() => navigate(`/look/${outfit.id}?from=${item.id}`)}
                                    className="group relative h-[55vh] rounded-[40px] overflow-hidden cursor-pointer border border-white/5 shadow-2xl bg-white/[0.02] transform transition-all duration-700 hover:scale-[1.02]"
                                >
                                    <motion.img
                                        src={outfit.modelImage}
                                        className="absolute inset-x-0 bottom-0 w-full h-[110%] object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />

                                    <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col items-start translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                        <h4 className="text-3xl font-display font-bold mb-4 text-white uppercase leading-none">{outfit.name}</h4>

                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex flex-wrap gap-2">
                                                {outfit.vibe.slice(0, 2).map((v: string) => (
                                                    <span key={v} className="text-[9px] font-medium text-white/40 uppercase tracking-[0.1em] border border-white/10 px-3 py-1.5 rounded-full">
                                                        {v}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <img src={stylist?.avatar} className="w-6 h-6 rounded-full grayscale object-cover ring-1 ring-white/10" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute top-6 right-6 w-12 h-12 rounded-2xl glass-panel flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 border border-white/20 shadow-xl">
                                        <ChevronRight className="w-5 h-5 text-white" />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </main>
        </>
    );
}

function MobileView({ item, outfits, navigate }: ViewProps) {
    return (
        <div className="pb-24">
            <header className="px-6 pt-12 pb-6 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-xl z-20">
                <button onClick={() => navigate('/')} className="flex items-center gap-2 group">
                    <ArrowLeft className="w-5 h-5" />
                    <span className="text-[10px] font-bold tracking-widest uppercase">Inventory</span>
                </button>
            </header>

            <div className="px-6 py-4">
                <motion.div
                    layoutId={`item-image-${item.id}`}
                    className="w-full aspect-[4/5] rounded-[32px] overflow-hidden bg-white/[0.03] border border-white/10 shadow-2xl mb-8"
                >
                    <img src={item.image} className="w-full h-full object-cover" />
                </motion.div>

                <div className="flex items-end justify-between gap-4 mb-12">
                    <div className="flex-1">
                        <p className="text-[9px] font-medium text-white/20 uppercase tracking-[0.4em] mb-2">{item.brand}</p>
                        <h2 className="text-2xl font-display font-extrabold uppercase leading-tight mb-2">{item.name}</h2>
                        <span className="text-lg font-bold text-white/20">${item.price}</span>
                    </div>
                    <a
                        href={item.purchaseUrl}
                        target="_blank"
                        className="px-6 py-4 rounded-2xl bg-white text-black text-[10px] font-bold uppercase tracking-[0.15em] shadow-2xl shrink-0"
                    >
                        Shop Now
                    </a>
                </div>

                <div className="flex items-center gap-4 mb-8">
                    <h3 className="text-xl font-display font-extrabold tracking-tight">The Aesthetic.</h3>
                    <div className="h-px flex-1 bg-white/5" />
                </div>

                <div className="space-y-6">
                    {outfits.map((outfit: any) => {
                        const stylist = stylists.find(s => s.id === outfit.stylistId);
                        return (
                            <motion.div
                                key={outfit.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                onClick={() => navigate(`/look/${outfit.id}?from=${item.id}`)}
                                className="group relative h-[60vh] rounded-[40px] overflow-hidden border border-white/5 shadow-2xl bg-white/[0.02]"
                            >
                                <img src={outfit.modelImage} className="absolute inset-0 w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
                                <div className="absolute inset-x-0 bottom-0 p-8">
                                    <h4 className="text-2xl font-display font-extrabold text-white uppercase mb-4">{outfit.name}</h4>
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-wrap gap-2">
                                            {outfit.vibe.slice(0, 2).map((v: string) => (
                                                <span key={v} className="text-[8px] font-bold text-white/40 uppercase tracking-[0.1em] border border-white/10 px-3 py-1.5 rounded-full">
                                                    {v}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <img src={stylist?.avatar} className="w-5 h-5 rounded-full grayscale object-cover ring-1 ring-white/10" />
                                            <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest">{stylist?.name}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

