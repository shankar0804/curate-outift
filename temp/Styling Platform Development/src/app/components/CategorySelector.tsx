import { ItemCategory } from '@/data/curatedData';
import { motion } from 'motion/react';

interface CategorySelectorProps {
  onSelectCategory: (category: ItemCategory) => void;
}

const categories: { id: ItemCategory; label: string; icon: string }[] = [
  { id: 'shirt', label: 'Shirts', icon: '👔' },
  { id: 'pants', label: 'Pants', icon: '👖' },
  { id: 'shoes', label: 'Shoes', icon: '👞' },
  { id: 'outerwear', label: 'Outerwear', icon: '🧥' },
  { id: 'accessories', label: 'Accessories', icon: '⌚' },
];

export function CategorySelector({ onSelectCategory }: CategorySelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {categories.map((category, index) => (
        <motion.button
          key={category.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onSelectCategory(category.id)}
          className="group relative overflow-hidden bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 active:scale-95"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="relative">
            <div className="text-5xl mb-3">{category.icon}</div>
            <h3 className="text-lg">{category.label}</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Find your style
            </p>
          </div>

          <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
