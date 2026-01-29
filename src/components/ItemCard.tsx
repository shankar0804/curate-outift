import { FashionItem } from '@/data/curatedData';
import { motion } from 'motion/react';
import { Tag } from 'lucide-react';

interface ItemCardProps {
    item: FashionItem;
    onClick: () => void;
    index: number;
}

export function ItemCard({ item, onClick, index }: ItemCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="group relative flex flex-col gap-3 cursor-pointer"
        >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-muted relative">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                    <Tag className="w-3.5 h-3.5 text-foreground" />
                </div>
            </div>

            <div>
                <p className="text-xs font-medium text-muted-foreground mb-0.5">{item.brand}</p>
                <h3 className="text-sm font-medium leading-tight line-clamp-2">{item.name}</h3>
                <p className="text-sm text-foreground font-semibold mt-1">${item.price}</p>
            </div>
        </motion.div>
    );
}
