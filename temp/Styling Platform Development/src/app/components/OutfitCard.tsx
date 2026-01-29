import { CuratedOutfit, stylists } from '@/data/curatedData';
import { motion } from 'motion/react';

interface OutfitCardProps {
  outfit: CuratedOutfit;
  onClick: () => void;
  index?: number;
}

export function OutfitCard({ outfit, onClick, index = 0 }: OutfitCardProps) {
  const stylist = stylists.find(s => s.id === outfit.stylistId);
  
  const itemCount = 
    (outfit.items.shirt ? 1 : 0) +
    (outfit.items.pants ? 1 : 0) +
    (outfit.items.shoes ? 1 : 0) +
    (outfit.items.outerwear ? 1 : 0) +
    (outfit.items.accessories?.length || 0);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      onClick={onClick}
      className="group w-full text-left"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted">
        <img
          src={outfit.modelImage}
          alt={outfit.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent" />
        
        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-sm font-semibold text-background mb-1 line-clamp-1">{outfit.name}</h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <img
                src={stylist?.avatar}
                alt={stylist?.name}
                className="w-5 h-5 rounded-full object-cover"
              />
              <p className="text-xs text-background/90">{stylist?.name}</p>
            </div>
            
            <p className="text-xs text-background/80">{itemCount} pieces</p>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
