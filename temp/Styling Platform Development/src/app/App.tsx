import { useState } from 'react';
import { Search, User, ArrowLeft, Zap } from 'lucide-react';
import { fashionItems, getOutfitsByItem, FashionItem, CuratedOutfit, ItemCategory } from '@/data/curatedData';
import { CategoryTabs } from '@/app/components/CategoryTabs';
import { ItemCard } from '@/app/components/ItemCard';
import { OutfitCard } from '@/app/components/OutfitCard';
import { OutfitDetail } from '@/app/components/OutfitDetail';
import { motion } from 'motion/react';

type View = 'home' | 'outfits' | 'outfit-detail';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory | 'all'>('all');
  const [selectedItem, setSelectedItem] = useState<FashionItem | null>(null);
  const [selectedOutfit, setSelectedOutfit] = useState<CuratedOutfit | null>(null);
  const [relatedOutfits, setRelatedOutfits] = useState<CuratedOutfit[]>([]);

  const handleItemClick = (item: FashionItem) => {
    setSelectedItem(item);
    const outfits = getOutfitsByItem(item.id);
    setRelatedOutfits(outfits);
    setCurrentView('outfits');
  };

  const handleOutfitClick = (outfit: CuratedOutfit) => {
    setSelectedOutfit(outfit);
    setCurrentView('outfit-detail');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedItem(null);
    setRelatedOutfits([]);
  };

  const handleBackToOutfits = () => {
    setCurrentView('outfits');
    setSelectedOutfit(null);
  };

  // Filter items by category
  const allItems = Object.values(fashionItems);
  const filteredItems = selectedCategory === 'all' 
    ? allItems 
    : allItems.filter(item => item.category === selectedCategory);

  // Outfit Detail View
  if (currentView === 'outfit-detail' && selectedOutfit) {
    return <OutfitDetail outfit={selectedOutfit} onBack={handleBackToOutfits} />;
  }

  // Outfits View
  if (currentView === 'outfits' && selectedItem) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background border-b border-border/50">
          <div className="p-5">
            <button
              onClick={handleBackToHome}
              className="flex items-center gap-2 text-muted-foreground mb-4 hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back</span>
            </button>
            
            {/* Selected Item Card */}
            <div className="bg-muted/30 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-background flex-shrink-0">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-1">Styling around</p>
                  <h3 className="truncate font-medium">{selectedItem.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedItem.brand} · ${selectedItem.price}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Curated Outfits */}
        <div className="p-5 pb-20">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-1">Designer Curations</h2>
            <p className="text-sm text-muted-foreground">
              {relatedOutfits.length} styled outfit{relatedOutfits.length !== 1 ? 's' : ''}
            </p>
          </div>

          {relatedOutfits.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted flex items-center justify-center">
                <Zap className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-medium mb-1">Coming Soon</h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                Our stylists are creating perfect looks with this piece.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {relatedOutfits.map((outfit, index) => (
                <OutfitCard
                  key={outfit.id}
                  outfit={outfit}
                  onClick={() => handleOutfitClick(outfit)}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Home View
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border/50">
        <div className="p-5 pb-4">
          {/* Top Bar */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <h1 className="text-xl font-semibold mb-0.5">Dress Curator</h1>
              <p className="text-sm text-muted-foreground">Good taste as a service</p>
            </div>
            <button className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors">
              <User className="w-5 h-5" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search items, brands, styles..."
              className="w-full pl-10 pr-4 py-3 bg-muted/30 border border-border/50 rounded-xl outline-none focus:border-border transition-colors text-sm placeholder:text-muted-foreground"
            />
          </div>

          {/* Category Tabs */}
          <CategoryTabs
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="p-5 pb-20">
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-foreground text-background rounded-3xl p-6 mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-background/10 rounded-full mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">How it works</span>
          </div>
          
          <h2 className="text-xl font-semibold mb-2">
            Tap Any Item Below
          </h2>
          <p className="text-sm text-background/80 leading-relaxed">
            See complete, designer-curated outfits built around it. Each look is ready to shop from original brands.
          </p>
        </motion.div>

        {/* Items Grid */}
        <div>
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {filteredItems.map((item, index) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onClick={() => handleItemClick(item)}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-sm text-muted-foreground">No items in this category</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
