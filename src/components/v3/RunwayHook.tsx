import { motion } from 'motion/react';
import { FashionItem, getFeaturedItems } from '@/data/curatedData';
import { cn } from '@/lib/utils';
import { Sparkles, ArrowRight } from 'lucide-react';

interface RunwayHookProps {
    onSelectItem: (item: FashionItem) => void;
}

const FEATURED = getFeaturedItems();

export function RunwayHook({ onSelectItem }: RunwayHookProps) {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col justify-center px-6 pt-20 pb-12 overflow-hidden">
            {/* Branding Header */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 text-center"
            >
                <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/60">Expert Styling Studio</span>
                </div>
                <h1 className="font-display text-5xl font-bold tracking-tight mb-4">Dress Curator.</h1>
                <p className="text-white/40 max-w-xs mx-auto text-sm leading-relaxed">
                    High taste, on demand. Pick a focal piece and let our stylists build the masterpiece around it.
                </p>
            </motion.header>

            {/* Hero Carousel */}
            <div className="flex-1 -mx-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide flex items-center">
                <div className="flex gap-4 px-12">
                    {FEATURED.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + idx * 0.1, type: "spring", stiffness: 100, damping: 20 }}
                            className="snap-center shrink-0 w-[75vw] max-w-sm group"
                            onClick={() => onSelectItem(item)}
                        >
                            <div className="relative aspect-[4/5] rounded-[48px] overflow-hidden mb-6 shadow-2xl shadow-black/50 border border-white/5">
                                <img
                                    src={item.image}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                                {/* Float Badge */}
                                <div className="absolute bottom-10 left-10 right-10 flex items-center justify-between">
                                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 flex-1">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-0.5">{item.brand}</p>
                                        <h3 className="font-semibold text-white text-base truncate">{item.name}</h3>
                                    </div>
                                    <div className="ml-3 w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center shadow-lg active:scale-90 transition-transform cursor-pointer">
                                        <ArrowRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Decorative Blank Slide */}
                    <div className="shrink-0 w-12" />
                </div>
            </div>

            {/* Instructional Footer */}
            <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-12 text-center"
            >
                <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Swipe to explore focal pieces</span>
            </motion.footer>
        </div>
    );
}
