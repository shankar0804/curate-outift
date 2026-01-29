import { FashionItem } from '@/data/curatedData';
import { motion } from 'motion/react';

interface ItemCardProps {
  item: FashionItem;
  onClick: () => void;
  index?: number;
}

export function ItemCard({ item, onClick, index = 0 }: ItemCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      onClick={onClick}
      className="group w-full text-left"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted mb-2.5">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Item Info */}
      <div>
        <h3 className="truncate text-sm font-medium mb-0.5">{item.name}</h3>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">{item.brand}</p>
          <p className="text-sm font-semibold">${item.price}</p>
        </div>
      </div>
    </motion.button>
  );
}
