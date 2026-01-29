import { CuratedOutfit, stylists } from '@/data/curatedData';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface OutfitCardProps {
    outfit: CuratedOutfit;
    onClick: () => void;
    index: number;
}

export function OutfitCard({ outfit, onClick, index }: OutfitCardProps) {
    const stylist = stylists.find(s => s.id === outfit.stylistId);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="group relative cursor-pointer overflow-hidden rounded-3xl"
        >
            <div className="aspect-[3/4] relative">
                <img
                    src={outfit.modelImage}
                    alt={outfit.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3 text-yellow-300" />
                            <span className="text-[10px] uppercase tracking-wide font-medium">Curated by {stylist?.name.split(' ')[0]}</span>
                        </div>
                    </div>
                    <h3 className="font-semibold text-lg leading-tight mb-1">{outfit.name}</h3>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                        {outfit.vibe.slice(0, 2).map((vibe) => (
                            <span key={vibe} className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full border border-white/10">
                                {vibe}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
