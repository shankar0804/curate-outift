import { useState } from 'react';
import { Search, Sparkles, User } from 'lucide-react';
import { getFeaturedItems, getOutfitsByItem, FashionItem, CuratedOutfit } from '@/data/curatedData';
import { ItemCard } from '@/app/components/ItemCard';
import { OutfitCard } from '@/app/components/OutfitCard';
import { OutfitDetail } from '@/app/components/OutfitDetail';

type View = 'home' | 'outfits' | 'outfit-detail';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedItem, setSelectedItem] = useState<FashionItem | null>(null);
  const [selectedOutfit, setSelectedOutfit] = useState<CuratedOutfit | null>(null);
  const [relatedOutfits, setRelatedOutfits] = useState<CuratedOutfit[]>([]);

  const featuredItems = getFeaturedItems();

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

  if (currentView === 'outfit-detail' && selectedOutfit) {
    return <OutfitDetail outfit={selectedOutfit} onBack={handleBackToOutfits} />;
  }

  if (currentView === 'outfits' && selectedItem) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="p-4">
            <button
              onClick={handleBackToHome}
              className="text-sm text-muted-foreground mb-2"
            >
              ← Back
            </button>
            <h1 className="text-xl">Styled Around</h1>
            <div className="mt-3 flex items-center gap-3">
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-16 h-16 rounded-xl object-cover bg-gray-100"
              />
              <div>
                <p className="text-xs text-muted-foreground uppercase">{selectedItem.brand}</p>
                <h2>{selectedItem.name}</h2>
                <p className="text-sm text-muted-foreground">${selectedItem.price}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Curated Outfits */}
        <div className="p-4">
          <div className="mb-4">
            <p className="text-muted-foreground">
              {relatedOutfits.length} designer-curated outfit{relatedOutfits.length !== 1 ? 's' : ''}
            </p>
          </div>

          {relatedOutfits.length === 0 ? (
            <div className="text-center py-12">
              <Sparkles className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
              <p className="text-muted-foreground">
                No curated outfits yet for this item.
                <br />
                Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {relatedOutfits.map(outfit => (
                <OutfitCard
                  key={outfit.id}
                  outfit={outfit}
                  onClick={() => handleOutfitClick(outfit)}
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
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl">Dress Curator</h1>
              <p className="text-sm text-muted-foreground mt-1">Good taste as a service</p>
            </div>
            <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <User className="w-5 h-5" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search items, brands, styles..."
              className="w-full pl-12 pr-4 py-3 bg-muted border-none rounded-full outline-none focus:ring-2 focus:ring-ring/50"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* Hero Section */}
        <div className="mb-6 p-6 bg-gradient-to-br from-primary/10 to-secondary rounded-3xl">
          <Sparkles className="w-8 h-8 mb-3" />
          <h2 className="text-xl mb-2">Start with One Piece</h2>
          <p className="text-sm text-muted-foreground">
            Pick an item you like. We'll show you complete outfits curated by professional stylists.
          </p>
        </div>

        {/* Featured Items */}
        <div className="mb-6">
          <h2 className="mb-4">Featured Items</h2>
          <div className="grid grid-cols-2 gap-4">
            {featuredItems.map(item => (
              <ItemCard
                key={item.id}
                item={item}
                onClick={() => handleItemClick(item)}
              />
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-6">
          <h2 className="mb-4">How It Works</h2>
          <div className="space-y-3">
            <div className="flex gap-4 p-4 bg-white rounded-2xl">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                1
              </div>
              <div>
                <h4>Pick an Item</h4>
                <p className="text-sm text-muted-foreground">
                  Choose a piece you like or already own
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-4 bg-white rounded-2xl">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                2
              </div>
              <div>
                <h4>See Complete Looks</h4>
                <p className="text-sm text-muted-foreground">
                  View designer-curated outfits built around it
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-4 bg-white rounded-2xl">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                3
              </div>
              <div>
                <h4>Shop Each Piece</h4>
                <p className="text-sm text-muted-foreground">
                  Buy items from original brands and platforms
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
