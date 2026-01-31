export type ItemCategory = 'shirt' | 'pants' | 'shoes' | 'outerwear' | 'accessories';

export interface FashionItem {
    id: string;
    stylist_id?: string;
    name: string;
    brand: string;
    price: number;
    category: ItemCategory;
    image_url: string;
    purchase_url?: string;
    platform?: string;
    is_active: boolean;
    created_at?: string;
}

export interface Stylist {
    id: string;
    name: string;
    bio?: string;
    avatar_url?: string;
    specialization?: string;
    created_at?: string;
}

export interface CuratedOutfit {
    id: string;
    stylist_id?: string;
    name: string;
    description?: string;
    model_image_url: string;
    tags: string[];
    status: 'draft' | 'published';
    vibe: string[];
    created_at?: string;
    items?: {
        slot_type: string;
        item: FashionItem;
    }[];
    stylist?: Stylist;
}

export interface OutfitItemLink {
    id: string;
    outfit_id: string;
    item_id: string;
    slot_type: string;
}

export interface DashboardStats {
    items: number;
    outfits: number;
}
