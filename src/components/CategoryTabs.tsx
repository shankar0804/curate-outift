import { ItemCategory } from '@/data/curatedData';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

interface CategoryTabsProps {
    selectedCategory: ItemCategory | 'all';
    onSelectCategory: (category: ItemCategory | 'all') => void;
}

const categories: { id: ItemCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Items' },
    { id: 'shirt', label: 'Shirts' },
    { id: 'pants', label: 'Pants' },
    { id: 'shoes', label: 'Shoes' },
    { id: 'outerwear', label: 'Outerwear' },
    { id: 'accessories', label: 'Accessories' },
];

export function CategoryTabs({ selectedCategory, onSelectCategory }: CategoryTabsProps) {
    return (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-5 px-5 select-none">
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => onSelectCategory(category.id)}
                    className={cn(
                        "relative px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        selectedCategory === category.id
                            ? "text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted"
                    )}
                >
                    {selectedCategory === category.id && (
                        <motion.div
                            layoutId="activeCategory"
                            className="absolute inset-0 bg-primary rounded-full"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className="relative z-10">{category.label}</span>
                </button>
            ))}
        </div>
    );
}
