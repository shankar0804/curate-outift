import { CuratedOutfit, fashionItems, stylists, FashionItem } from '@/data/curatedData';
import { ArrowLeft, ExternalLink, ShoppingBag, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface OutfitDetailProps {
  outfit: CuratedOutfit;
  onBack: () => void;
}

export function OutfitDetail({ outfit, onBack }: OutfitDetailProps) {
  const stylist = stylists.find(s => s.id === outfit.stylistId);
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set());
  
  const allItems: FashionItem[] = [];
  if (outfit.items.shirt) allItems.push(fashionItems[outfit.items.shirt]);
  if (outfit.items.pants) allItems.push(fashionItems[outfit.items.pants]);
  if (outfit.items.shoes) allItems.push(fashionItems[outfit.items.shoes]);
  if (outfit.items.outerwear) allItems.push(fashionItems[outfit.items.outerwear]);
  outfit.items.accessories?.forEach(id => allItems.push(fashionItems[id]));

  const totalPrice = allItems.reduce((sum, item) => sum + item.price, 0);

  const toggleSaveItem = (itemId: string) => {
    setSavedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const openAllLinks = () => {
    allItems.forEach(item => {
      window.open(item.purchaseUrl, '_blank');
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border/50">
        <div className="flex items-center justify-between p-5 max-w-md mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <button className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors">
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-[60vh] overflow-hidden bg-muted mt-[71px]">
        <img
          src={outfit.modelImage}
          alt={outfit.name}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative -mt-6 bg-background rounded-t-3xl px-5 pt-5 pb-32">
        {/* Tags & Title */}
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            {outfit.vibe.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="px-3 py-1.5 bg-muted text-foreground rounded-lg text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-2xl font-semibold mb-2">{outfit.name}</h1>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {outfit.description}
          </p>
        </div>

        {/* Stylist Card */}
        <div className="p-4 bg-muted/30 rounded-2xl mb-6">
          <div className="flex items-center gap-3">
            <img
              src={stylist?.avatar}
              alt={stylist?.name}
              className="w-12 h-12 rounded-xl object-cover"
            />
            <div className="flex-1">
              <p className="font-medium text-sm mb-0.5">{stylist?.name}</p>
              <p className="text-xs text-muted-foreground">{stylist?.specialization}</p>
            </div>
          </div>
        </div>

        {/* Items Section */}
        <div>
          {/* Section Header */}
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold mb-0.5">Complete Look</h2>
              <p className="text-xs text-muted-foreground">{allItems.length} pieces</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-0.5">Total</p>
              <p className="text-xl font-semibold">${totalPrice}</p>
            </div>
          </div>

          {/* Items List */}
          <div className="space-y-3">
            {allItems.map((item) => {
              const isSaved = savedItems.has(item.id);
              return (
                <div
                  key={item.id}
                  className="bg-muted/30 rounded-2xl overflow-hidden"
                >
                  <div className="flex gap-3 p-3">
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-background">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      {isSaved && (
                        <div className="absolute inset-0 bg-foreground/10 flex items-center justify-center">
                          <div className="w-8 h-8 bg-foreground rounded-full flex items-center justify-center">
                            <Check className="w-5 h-5 text-background" strokeWidth={2.5} />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <span className="inline-block px-2 py-0.5 bg-muted text-foreground text-xs font-medium rounded mb-1.5 capitalize">
                          {item.category}
                        </span>
                        <h4 className="font-medium text-sm truncate mb-0.5">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">{item.brand}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <p className="font-semibold">${item.price}</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => toggleSaveItem(item.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                              isSaved
                                ? 'bg-foreground text-background'
                                : 'bg-muted text-foreground hover:bg-muted/70'
                            }`}
                          >
                            {isSaved ? 'Saved' : 'Save'}
                          </button>
                          <a
                            href={item.purchaseUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-foreground text-background rounded-lg flex items-center gap-1 text-xs font-medium hover:bg-foreground/90 transition-colors"
                          >
                            Buy
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-background border-t border-border/50">
        <button
          onClick={openAllLinks}
          className="w-full py-4 bg-foreground text-background rounded-2xl font-medium text-sm hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-5 h-5" />
          Open All Purchase Links
        </button>
      </div>
    </div>
  );
}
