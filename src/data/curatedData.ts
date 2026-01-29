export type ItemCategory = 'shirt' | 'pants' | 'shoes' | 'outerwear' | 'accessories';

export interface FashionItem {
    id: string;
    name: string;
    brand: string;
    price: number;
    category: ItemCategory;
    image: string;
    purchaseUrl: string;
    platform: string;
}

export interface Stylist {
    id: string;
    name: string;
    bio: string;
    avatar: string;
    specialization: string;
}

export interface CuratedOutfit {
    id: string;
    name: string;
    description: string;
    stylistId: string;
    items: {
        shirt?: string;
        pants?: string;
        shoes?: string;
        outerwear?: string;
        accessories?: string[];
    };
    modelImage: string;
    vibe: string[];
}

export const stylists: Stylist[] = [
    {
        id: 'stylist-1',
        name: 'Emma Rodriguez',
        bio: 'Minimalist styling expert with 12 years in luxury fashion',
        avatar: 'https://images.unsplash.com/photo-1722108990072-ce5a88312f53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc3R5bGlzdCUyMGRlc2lnbmVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY5NTQxMjY4fDA&ixlib=rb-4.1.0&q=80&w=400',
        specialization: 'Minimalist & Contemporary'
    },
    {
        id: 'stylist-2',
        name: 'Marcus Chen',
        bio: 'Street-luxury fusion specialist, featured in GQ',
        avatar: 'https://images.unsplash.com/photo-1628876521188-58ac53e31bf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwbW9kZWwlMjBmYXNoaW9uJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY5NTQxMjY2fDA&ixlib=rb-4.1.0&q=80&w=400',
        specialization: 'Streetwear & Urban'
    }
];

export const fashionItems: Record<string, FashionItem> = {
    'item-1': {
        id: 'item-1',
        name: 'Oxford White Shirt',
        brand: 'Brooks Brothers',
        price: 89,
        category: 'shirt',
        image: 'https://images.unsplash.com/photo-1556630184-066f7ac4e15f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwd2hpdGUlMjBzaGlydCUyMG1pbmltYWx8ZW58MXx8fHwxNzY5NTQxMjYyfDA&ixlib=rb-4.1.0&q=80&w=400',
        purchaseUrl: 'https://brooksbrothers.com',
        platform: 'Brooks Brothers'
    },
    'item-2': {
        id: 'item-2',
        name: 'Slim Fit Black Denim',
        brand: 'Levi\'s',
        price: 98,
        category: 'pants',
        image: 'https://images.unsplash.com/photo-1744383390068-abfc7bc7fd07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGRlbmltJTIwamVhbnMlMjBmYXNoaW9ufGVufDF8fHx8MTc2OTUxNjU0MXww&ixlib=rb-4.1.0&q=80&w=400',
        purchaseUrl: 'https://levi.com',
        platform: 'Levi\'s'
    },
    'item-3': {
        id: 'item-3',
        name: 'Classic White Sneakers',
        brand: 'Common Projects',
        price: 425,
        category: 'shoes',
        image: 'https://images.unsplash.com/photo-1573875133340-0b589f59a8c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHNuZWFrZXJzJTIwbWluaW1hbHxlbnwxfHx8fDE3Njk0OTU5NTN8MA&ixlib=rb-4.1.0&q=80&w=400',
        purchaseUrl: 'https://mrporter.com',
        platform: 'Mr Porter'
    },
    'item-4': {
        id: 'item-4',
        name: 'Leather Biker Jacket',
        brand: 'AllSaints',
        price: 529,
        category: 'outerwear',
        image: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwamFja2V0JTIwZmFzaGlvbnxlbnwxfHx8fDE3Njk0NzQxNjh8MA&ixlib=rb-4.1.0&q=80&w=400',
        purchaseUrl: 'https://allsaints.com',
        platform: 'AllSaints'
    },
    'item-5': {
        id: 'item-5',
        name: 'Aviator Sunglasses',
        brand: 'Ray-Ban',
        price: 168,
        category: 'accessories',
        image: 'https://images.unsplash.com/photo-1764333327297-0ebfd9fda541?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5nbGFzc2VzJTIwYWNjZXNzb3J5JTIwZmFzaGlvbnxlbnwxfHx8fDE3Njk1MTQzNzl8MA&ixlib=rb-4.1.0&q=80&w=400',
        purchaseUrl: 'https://ray-ban.com',
        platform: 'Ray-Ban'
    },
    'item-6': {
        id: 'item-6',
        name: 'Minimalist Watch',
        brand: 'Daniel Wellington',
        price: 199,
        category: 'accessories',
        image: 'https://images.unsplash.com/photo-1760532466984-39c3eb7f1254?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3cmlzdHdhdGNoJTIwbHV4dXJ5JTIwbWluaW1hbHxlbnwxfHx8fDE3Njk1NDEyNjV8MA&ixlib=rb-4.1.0&q=80&w=400',
        purchaseUrl: 'https://danielwellington.com',
        platform: 'Daniel Wellington'
    },
    'item-7': {
        id: 'item-7',
        name: 'Casual Dress Shirt',
        brand: 'J.Crew',
        price: 79,
        category: 'shirt',
        image: 'https://images.unsplash.com/photo-1657878337883-b568265e5bc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBkcmVzcyUyMHNoaXJ0fGVufDF8fHx8MTc2OTU0MTI2NHww&ixlib=rb-4.1.0&q=80&w=400',
        purchaseUrl: 'https://jcrew.com',
        platform: 'J.Crew'
    },
    'item-8': {
        id: 'item-8',
        name: 'Slim Chino Pants',
        brand: 'Banana Republic',
        price: 89,
        category: 'pants',
        image: 'https://images.unsplash.com/photo-1696889450800-e94ec7a32206?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlubyUyMHBhbnRzJTIwYmVpZ2V8ZW58MXx8fHwxNzY5NTQxMjY1fDA&ixlib=rb-4.1.0&q=80&w=400',
        purchaseUrl: 'https://bananarepublic.com',
        platform: 'Banana Republic'
    },
    'item-9': {
        id: 'item-9',
        name: 'Chelsea Boots',
        brand: 'Thursday Boot Co.',
        price: 199,
        category: 'shoes',
        image: 'https://images.unsplash.com/photo-1761052720710-32349209f6b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBib290cyUyMGJyb3dufGVufDF8fHx8MTc2OTU0MTI2N3ww&ixlib=rb-4.1.0&q=80&w=400',
        purchaseUrl: 'https://thursdayboots.com',
        platform: 'Thursday Boots'
    },
    'item-10': {
        id: 'item-10',
        name: 'Premium White Tee',
        brand: 'Everlane',
        price: 35,
        category: 'shirt',
        image: 'https://images.unsplash.com/photo-1485920784995-d65789b1c3af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0c2hpcnQlMjBtaW5pbWFsJTIwd2hpdGV8ZW58MXx8fHwxNzY5NTQxMjY3fDA&ixlib=rb-4.1.0&q=80&w=400',
        purchaseUrl: 'https://everlane.com',
        platform: 'Everlane'
    },
    'item-11': {
        id: 'item-11',
        name: 'Leather Backpack',
        brand: 'Fossil',
        price: 248,
        category: 'accessories',
        image: 'https://images.unsplash.com/photo-1597708724657-6b294dc5a3af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNrcGFjayUyMGxlYXRoZXIlMjBmYXNoaW9ufGVufDF8fHx8MTc2OTUyODQyMnww&ixlib=rb-4.1.0&q=80&w=400',
        purchaseUrl: 'https://fossil.com',
        platform: 'Fossil'
    },
    'item-12': {
        id: 'item-12',
        name: 'Navy Blazer',
        brand: 'Hugo Boss',
        price: 595,
        category: 'outerwear',
        image: 'https://images.unsplash.com/photo-1598915850252-fb07ad1e6768?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGF6ZXIlMjBzdWl0JTIwamFja2V0fGVufDF8fHx8MTc2OTU0MTI2OHww&ixlib=rb-4.1.0&q=80&w=400',
        purchaseUrl: 'https://hugoboss.com',
        platform: 'Hugo Boss'
    }
};

export const curatedOutfits: CuratedOutfit[] = [
    {
        id: 'outfit-1',
        name: 'Clean Minimalist',
        description: 'Effortlessly sophisticated. Perfect for coffee meetings or creative studio visits.',
        stylistId: 'stylist-1',
        items: {
            shirt: 'item-1',
            pants: 'item-2',
            shoes: 'item-3',
            accessories: ['item-6']
        },
        modelImage: 'https://images.unsplash.com/photo-1628876521188-58ac53e31bf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwbW9kZWwlMjBmYXNoaW9uJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY5NTQxMjY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
        vibe: ['Minimalist', 'Professional', 'Timeless']
    },
    {
        id: 'outfit-2',
        name: 'Urban Edge',
        description: 'Street-smart styling with a rebellious touch. Ideal for evening events.',
        stylistId: 'stylist-2',
        items: {
            shirt: 'item-10',
            pants: 'item-2',
            shoes: 'item-9',
            outerwear: 'item-4',
            accessories: ['item-5']
        },
        modelImage: 'https://images.unsplash.com/photo-1620818655725-d388f51eb29f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBtb2RlbCUyMGZhc2hpb24lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njk1NDEyNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        vibe: ['Edgy', 'Urban', 'Cool']
    },
    {
        id: 'outfit-3',
        name: 'Smart Casual',
        description: 'Polished but relaxed. Works from brunch to business casual.',
        stylistId: 'stylist-1',
        items: {
            shirt: 'item-7',
            pants: 'item-8',
            shoes: 'item-9',
            accessories: ['item-6', 'item-11']
        },
        modelImage: 'https://images.unsplash.com/photo-1628876521188-58ac53e31bf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwbW9kZWwlMjBmYXNoaW9uJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY5NTQxMjY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
        vibe: ['Smart', 'Casual', 'Versatile']
    },
    {
        id: 'outfit-4',
        name: 'Business Refined',
        description: 'Executive presence with contemporary flair. Board meetings to dinner.',
        stylistId: 'stylist-1',
        items: {
            shirt: 'item-1',
            pants: 'item-8',
            shoes: 'item-9',
            outerwear: 'item-12',
            accessories: ['item-6']
        },
        modelImage: 'https://images.unsplash.com/photo-1620818655725-d388f51eb29f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBtb2RlbCUyMGZhc2hpb24lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njk1NDEyNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        vibe: ['Professional', 'Refined', 'Modern']
    }
];

// Helper function to get outfits by item
export function getOutfitsByItem(itemId: string): CuratedOutfit[] {
    return curatedOutfits.filter(outfit => {
        return Object.values(outfit.items).some(value => {
            if (Array.isArray(value)) {
                return value.includes(itemId);
            }
            return value === itemId;
        });
    });
}

// Get featured items for homepage
export function getFeaturedItems(): FashionItem[] {
    return [
        fashionItems['item-1'],
        fashionItems['item-2'],
        fashionItems['item-4'],
        fashionItems['item-10'],
        fashionItems['item-7'],
        fashionItems['item-8']
    ];
}
