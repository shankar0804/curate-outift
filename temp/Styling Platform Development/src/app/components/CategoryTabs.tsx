import { ItemCategory } from '@/data/curatedData';
import { motion } from 'motion/react';
import { Sparkles, Shirt, Boxes, Footprints, Wind, Watch } from 'lucide-react';

interface CategoryTabsProps {
  selectedCategory: ItemCategory | 'all';
  onSelectCategory: (category: ItemCategory | 'all') => void;
}

const categories: { id: ItemCategory | 'all'; label: string; icon: any }[] = [
  { id: 'all', label: 'All', icon: Sparkles },
  { id: 'shirt', label: 'Shirts', icon: Shirt },
  { id: 'pants', label: 'Pants', icon: Boxes },
  { id: 'shoes', label: 'Shoes', icon: Footprints },
  { id: 'outerwear', label: 'Jackets', icon: Wind },
  { id: 'accessories', label: 'Accessories', icon: Watch },
];

export function CategoryTabs({ selectedCategory, onSelectCategory }: CategoryTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-5 px-5">
      {categories.map((category) => {
        const isSelected = selectedCategory === category.id;
        const Icon = category.icon;
        return (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`flex-shrink-0 px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 ${
              isSelected
                ? 'bg-foreground text-background shadow-sm'
                : 'bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm font-medium whitespace-nowrap">{category.label}</span>
          </button>
        );
      })}
    </div>
  );
}
