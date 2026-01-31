import { FashionItem, CuratedOutfit, Stylist, DashboardStats } from './types';

export interface ApiService {
    // Inventory
    getItems(): Promise<FashionItem[]>;
    saveItem(item: Partial<FashionItem>, imageFile?: File): Promise<FashionItem>;
    deleteItem(id: string): Promise<void>;

    // Outfits
    getOutfits(): Promise<CuratedOutfit[]>;
    getOutfitById(id: string): Promise<CuratedOutfit | null>;
    getOutfitsByItem(itemId: string): Promise<CuratedOutfit[]>;
    saveOutfit(
        outfit: Partial<CuratedOutfit>,
        imageFile?: File,
        itemLinks?: { item_id: string; slot_type: string }[]
    ): Promise<CuratedOutfit>;

    // Stylists
    getStylists(): Promise<Stylist[]>;
    saveStylist(stylist: Partial<Stylist>): Promise<Stylist>;

    // Dashboard
    getStats(): Promise<DashboardStats>;
}
