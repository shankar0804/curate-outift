import { CuratedOutfit, fashionItems, stylists } from '@/data/curatedData';
import { ArrowLeft, ExternalLink, CheckCircle2, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface OutfitDetailProps {
    outfit: CuratedOutfit;
    onBack: () => void;
}

export function OutfitDetail({ outfit, onBack }: OutfitDetailProps) {
    const stylist = stylists.find(s => s.id === outfit.stylistId);

    // Get all items in the outfit
    const outfitItems = [
        outfit.items.shirt && fashionItems[outfit.items.shirt],
        outfit.items.pants && fashionItems[outfit.items.pants],
        outfit.items.shoes && fashionItems[outfit.items.shoes],
        outfit.items.outerwear && fashionItems[outfit.items.outerwear],
        ...(outfit.items.accessories?.map(id => fashionItems[id]) || [])
    ].filter(Boolean);

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header Image */}
            <div className="relative h-[60vh] w-full">
                <img
                    src={outfit.modelImage}
                    alt={outfit.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background" />

                {/* Navigation */}
                <div className="absolute top-0 left-0 right-0 p-5 pt-8 flex items-center justify-between">
                    <button
                        onClick={onBack}
                        className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/30 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                </div>

                {/* Title Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-2"
                    >
                        <span className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                            {stylist?.specialization}
                        </span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl font-bold mb-2 text-foreground"
                    >
                        {outfit.name}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-muted-foreground text-sm max-w-md"
                    >
                        {outfit.description}
                    </motion.p>
                </div>
            </div>

            {/* Stylist Note */}
            <div className="px-6 py-6 border-b border-border/50">
                <div className="flex items-center gap-4">
                    <img
                        src={stylist?.avatar}
                        alt={stylist?.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/10"
                    />
                    <div>
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Curated by</p>
                        <p className="font-semibold">{stylist?.name}</p>
                    </div>
                </div>

                <div className="mt-4 p-4 bg-muted/30 rounded-2xl border border-border/50">
                    <p className="text-sm italic text-muted-foreground">
                        "Good taste as a service — I've balanced the proportions here so you don't have to think about it. The textures work together to create depth without being loud."
                    </p>
                </div>
            </div>

            {/* Shop the Look */}
            <div className="px-6 py-8">
                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5" />
                    Shop the Look
                </h2>

                <div className="space-y-4">
                    {outfitItems.map((item, index) => (
                        <motion.div
                            key={item!.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-4 p-3 rounded-2xl bg-card border border-border/40 hover:border-primary/20 transition-colors"
                        >
                            <div className="w-16 h-16 rounded-xl bg-muted overflow-hidden flex-shrink-0">
                                <img src={item!.image} alt={item!.name} className="w-full h-full object-cover" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-muted-foreground">{item!.brand}</p>
                                <h3 className="font-medium text-sm truncate">{item!.name}</h3>
                                <p className="font-semibold mt-0.5">${item!.price}</p>
                            </div>

                            <a
                                href={item!.purchaseUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="w-10 h-10 rounded-full bg-primary/5 hover:bg-primary/10 flex items-center justify-center text-primary transition-colors flex-shrink-0"
                            >
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </motion.div>
                    ))}
                </div>

                <button className="w-full mt-8 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                    <CheckCircle2 className="w-5 h-5" />
                    Buy Complete Outfit (${outfitItems.reduce((acc, item) => acc + item!.price, 0)})
                </button>
            </div>
        </div>
    );
}
