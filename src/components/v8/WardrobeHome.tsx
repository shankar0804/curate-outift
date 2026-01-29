import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { fashionItems, ItemCategory, curatedOutfits, stylists } from '@/data/curatedData';
import { Search, User, ChevronRight, SlidersHorizontal, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories: { id: ItemCategory | 'all'; label: string; icon: string }[] = [
    { id: 'all', label: 'All Pieces', icon: '✨' },
    { id: 'shirt', label: 'Shirts', icon: '👔' },
    { id: 'pants', label: 'Pants', icon: '👖' },
    { id: 'shoes', label: 'Shoes', icon: '👞' },
    { id: 'outerwear', label: 'Outerwear', icon: '🧥' },
    { id: 'accessories', label: 'Accessories', icon: '⌚' },
];

function StudioItemCard({ item, idx, onClick }: { item: any; idx: number; onClick: () => void }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // 3D Magnetic Tilt
        setRotateX((y - centerY) / 10);
        setRotateY((centerX - x) / 10);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
    };

    const isFeatured = idx === 0 || idx === 1;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "group cursor-pointer perspective-1000",
                isFeatured ? "col-span-2" : "col-span-1"
            )}
        >
            <motion.div
                ref={cardRef}
                style={{
                    rotateX: useSpring(rotateX, { damping: 20, stiffness: 100 }),
                    rotateY: useSpring(rotateY, { damping: 20, stiffness: 100 }),
                    transformStyle: "preserve-3d"
                }}
                className={cn(
                    "relative rounded-[48px] overflow-hidden bg-white/[0.03] border border-white/5 transition-colors group-hover:bg-white/[0.06] shadow-2xl",
                    isFeatured ? "aspect-[16/10]" : "aspect-[4/5]"
                )}
            >
                {/* Spotlight Reflection */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,255,255,0.1)_0%,transparent_60%)] transition-opacity duration-500 pointer-events-none" />

                <motion.img
                    layoutId={`item-image-${item.id}`}
                    src={item.image}
                    className="absolute inset-x-0 bottom-0 w-full h-[120%] object-cover group-hover:scale-110 transition-transform duration-1000"
                    style={{ translateZ: "50px" }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute top-8 right-8 w-12 h-12 rounded-full glass-panel flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all border border-white/20 translate-y-4 group-hover:translate-y-0 shadow-2xl">
                    <ChevronRight className="w-6 h-6" />
                </div>

                <div className="absolute left-8 bottom-8" style={{ translateZ: "40px" }}>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-2">{item.brand}</p>
                    <h3 className="text-2xl font-display font-black tracking-tighter leading-none">{item.name}</h3>
                </div>
            </motion.div>
        </motion.div>
    );
}

export function WardrobeHome() {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState<ItemCategory | 'all'>('all');
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });

    // Ambient color shift based on scroll
    const ambientColor = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        ["rgba(0,0,0,1)", "rgba(10,10,10,1)", "rgba(0,0,0,1)"]
    );

    const filteredItems = selectedCategory === 'all'
        ? Object.values(fashionItems)
        : Object.values(fashionItems).filter(item => item.category === selectedCategory);

    return (
        <div ref={containerRef} className="min-h-screen bg-black text-foreground pb-48 selection:bg-white selection:text-black overflow-x-hidden">
            {/* Ambient Spotlight Background */}
            <motion.div
                style={{ backgroundColor: ambientColor }}
                className="fixed inset-0 pointer-events-none z-0"
            >
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-white/5 rounded-full blur-[100px]" />
            </motion.div>

            {/* Studio Header */}
            <header className="relative z-10 px-8 pt-16 pb-12">
                <div className="flex items-center justify-between mb-20">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="font-display text-5xl font-black leading-none tracking-tighter flex items-center gap-4"
                        >
                            The Studio<span className="text-white/20">.</span>
                        </motion.h1>
                        <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.6em] mt-4 flex items-center gap-3">
                            <div className="h-px w-8 bg-white/10" />
                            Creative Direction № 08
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button className="w-14 h-14 rounded-[20px] glass-panel flex items-center justify-center border border-white/10 hover:bg-white/5 transition-colors">
                            <SlidersHorizontal className="w-5 h-5 text-white/50" />
                        </button>
                        <button className="w-14 h-14 rounded-[24px] bg-white flex items-center justify-center border border-white shadow-2xl active:scale-95 transition-transform">
                            <User className="w-6 h-6 text-black" />
                        </button>
                    </div>
                </div>

                {/* Cover Stories: The Rack Highlight */}
                <div className="mb-24 px-2">
                    <div className="flex items-end justify-between mb-10">
                        <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-white/30">Archives Showcase</h2>
                        <button className="text-[11px] font-black uppercase tracking-widest text-white/40 hover:text-white border-b border-white/10 pb-1 text-xs">Masterworks Only</button>
                    </div>

                    <div className="flex gap-8 overflow-x-auto scrollbar-hide -mx-8 px-8 snap-x pb-4">
                        {curatedOutfits.map((outfit) => (
                            <motion.div
                                key={outfit.id}
                                onClick={() => navigate(`/look/${outfit.id}`)}
                                whileTap={{ scale: 0.98 }}
                                className="relative flex-none w-[85vw] md:w-[60vw] h-[60vh] rounded-[56px] overflow-hidden snap-center group cursor-pointer border border-white/5 shadow-2xl"
                            >
                                <img src={outfit.modelImage} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/5 transition-opacity duration-700" />

                                <div className="absolute inset-x-0 bottom-0 p-12">
                                    <div className="flex items-center gap-3 mb-6 bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 inline-flex w-fit">
                                        <Sparkles className="w-3 h-3 text-yellow-300" />
                                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/60">Immersive Highlight</span>
                                    </div>
                                    <h3 className="text-5xl font-display font-black text-white leading-[0.9] tracking-tighter mb-4">{outfit.name}</h3>
                                    <div className="flex gap-4">
                                        {outfit.vibe.map(v => (
                                            <span key={v} className="px-4 py-1.5 rounded-full bg-white/10 text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">
                                                {v}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </header>

            {/* Stage 2: The Studio Rack */}
            <section className="relative z-10 px-8">
                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-16">
                    <h2 className="text-4xl font-display font-black tracking-tighter italic">Studio Rack.</h2>
                    <div className="hidden md:block h-px flex-1 bg-white/10" />
                    <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide -mx-8 px-8 md:mx-0 md:px-0">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={cn(
                                    "px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                                    selectedCategory === cat.id ? "bg-white text-black" : "text-white/30 hover:text-white"
                                )}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-16">
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item, idx) => (
                            <StudioItemCard
                                key={item.id}
                                item={item}
                                idx={idx}
                                onClick={() => navigate(`/item/${item.id}`)}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            </section>
        </div>
    );
}
