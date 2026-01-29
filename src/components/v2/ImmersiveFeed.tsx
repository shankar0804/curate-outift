import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FashionItem, fashionItems } from '@/data/curatedData';
import { Search, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming this utility exists

interface ImmersiveFeedProps {
    onItemSelect: (item: FashionItem) => void;
}

const FEED_ITEMS = Object.values(fashionItems);

export function ImmersiveFeed({ onItemSelect }: ImmersiveFeedProps) {
    const [activeTab, setActiveTab] = useState('For You');

    return (
        <div className="min-h-screen bg-background text-foreground pb-24">
            {/* Floating Header */}
            <motion.div
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="fixed top-0 left-0 right-0 z-40 p-6 flex items-center justify-between pointer-events-none"
            >
                <div className="pointer-events-auto">
                    <h1 className="font-display text-2xl font-bold tracking-tight">Curator.</h1>
                </div>
                <button className="pointer-events-auto w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white/80 active:scale-90 transition-transform">
                    <Search className="w-5 h-5" />
                </button>
            </motion.div>

            {/* Tabs */}
            <div className="fixed top-20 left-0 right-0 z-30 flex justify-center gap-6 pointer-events-none">
                {['For You', 'Trending', 'Designers'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                            "pointer-events-auto text-sm font-medium transition-colors relative pb-1",
                            activeTab === tab ? "text-white" : "text-white/40"
                        )}
                    >
                        {tab}
                        {activeTab === tab && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Masonry Feed */}
            <div className="px-2 pt-36 grid grid-cols-2 gap-2">
                {FEED_ITEMS.map((item, index) => (
                    <FeedItem
                        key={item.id}
                        item={item}
                        index={index}
                        onClick={() => onItemSelect(item)}
                    />
                ))}
            </div>
        </div>
    );
}

function FeedItem({ item, index, onClick }: { item: FashionItem; index: number; onClick: () => void }) {
    // Staggered columns effect
    const isEven = index % 2 === 0;

    return (
        <motion.div
            layoutId={`item-container-${item.id}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
                "relative rounded-2xl overflow-hidden cursor-pointer",
                isEven ? "h-64" : "h-72 translate-y-8" // Stagger effect
            )}
            onClick={onClick}
        >
            <motion.img
                layoutId={`item-image-${item.id}`}
                src={item.image}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

            <div className="absolute bottom-3 left-3 right-3">
                <motion.p
                    layoutId={`item-brand-${item.id}`}
                    className="text-[10px] items-center gap-1 text-white/80 font-medium uppercase tracking-wider mb-0.5 flex"
                >
                    <Sparkles className="w-2.5 h-2.5 text-yellow-300" />
                    {item.brand}
                </motion.p>
                <motion.h3
                    layoutId={`item-title-${item.id}`}
                    className="text-sm font-medium text-white line-clamp-2 leading-tight"
                >
                    {item.name}
                </motion.h3>
            </div>
        </motion.div>
    );
}
