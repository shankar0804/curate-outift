import { supabase } from '@/lib/supabase';
import { ApiService } from './interface';
import { FashionItem, CuratedOutfit, Stylist, DashboardStats } from './types';

export class SupabaseService implements ApiService {
    async getItems(): Promise<FashionItem[]> {
        const { data, error } = await supabase
            .from('fashion_items')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    }

    async saveItem(item: Partial<FashionItem>, imageFile?: File): Promise<FashionItem> {
        let imageUrl = item.image_url;

        if (imageFile) {
            const fileExt = imageFile.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `items/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('fashion')
                .upload(filePath, imageFile);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('fashion')
                .getPublicUrl(filePath);

            imageUrl = publicUrl;
        }

        const payload = {
            ...item,
            image_url: imageUrl,
            price: typeof item.price === 'string' ? parseFloat(item.price) : item.price
        };

        if (item.id) {
            const { data, error } = await supabase
                .from('fashion_items')
                .update(payload)
                .eq('id', item.id)
                .select()
                .single();
            if (error) throw error;
            return data;
        } else {
            const { data, error } = await supabase
                .from('fashion_items')
                .insert(payload)
                .select()
                .single();
            if (error) throw error;
            return data;
        }
    }

    async deleteItem(id: string): Promise<void> {
        const { error } = await supabase
            .from('fashion_items')
            .delete()
            .eq('id', id);
        if (error) throw error;
    }

    async getOutfits(): Promise<CuratedOutfit[]> {
        const { data, error } = await supabase
            .from('curated_outfits')
            .select(`
                *,
                stylist:stylists(*),
                items:outfit_items(
                    slot_type,
                    item:fashion_items(*)
                )
            `)
            .eq('status', 'published')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    }

    async getOutfitById(id: string): Promise<CuratedOutfit | null> {
        const { data, error } = await supabase
            .from('curated_outfits')
            .select(`
                *,
                stylist:stylists(*),
                items:outfit_items(
                    slot_type,
                    item:fashion_items(*)
                )
            `)
            .eq('id', id)
            .single();

        if (error) return null;
        return data;
    }

    async getOutfitsByItem(itemId: string): Promise<CuratedOutfit[]> {
        const { data, error } = await supabase
            .from('outfit_items')
            .select(`
                outfit:curated_outfits(
                    *,
                    stylist:stylists(*),
                    items:outfit_items(
                        slot_type,
                        item:fashion_items(*)
                    )
                )
            `)
            .eq('item_id', itemId);

        if (error) throw error;

        // Flatten the Supabase response to match CuratedOutfit[]
        return (data || [])
            .map(row => row.outfit as unknown as CuratedOutfit)
            .filter(o => o !== null);
    }

    async saveOutfit(
        outfit: Partial<CuratedOutfit>,
        imageFile?: File,
        itemLinks?: { item_id: string; slot_type: string }[]
    ): Promise<CuratedOutfit> {
        let imageUrl = outfit.model_image_url;

        if (imageFile) {
            const fileExt = imageFile.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `outfits/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('fashion')
                .upload(filePath, imageFile);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('fashion')
                .getPublicUrl(filePath);

            imageUrl = publicUrl;
        }

        const payload = {
            ...outfit,
            model_image_url: imageUrl,
            status: outfit.status || 'published'
        };

        // Clean payload for DB insert/update
        const dbPayload = { ...payload };
        delete (dbPayload as any).items;
        delete (dbPayload as any).stylist;

        let savedRecord: any;

        if (outfit.id) {
            const { data, error } = await supabase
                .from('curated_outfits')
                .update(dbPayload)
                .eq('id', outfit.id)
                .select()
                .single();
            if (error) throw error;
            savedRecord = data;
        } else {
            const { data, error } = await supabase
                .from('curated_outfits')
                .insert(dbPayload)
                .select()
                .single();
            if (error) throw error;
            savedRecord = data;
        }

        // Handle item links if provided
        if (itemLinks && itemLinks.length > 0) {
            // First clear existing links if updating
            if (outfit.id) {
                await supabase
                    .from('outfit_items')
                    .delete()
                    .eq('outfit_id', savedRecord.id);
            }

            const linksToInsert = itemLinks.map(link => ({
                outfit_id: savedRecord.id,
                item_id: link.item_id,
                slot_type: link.slot_type
            }));

            const { error: linkError } = await supabase
                .from('outfit_items')
                .insert(linksToInsert);

            if (linkError) throw linkError;
        }

        // Return the full outfit with links
        const finalOutfit = await this.getOutfitById(savedRecord.id);
        if (!finalOutfit) throw new Error('Failed to retrieve saved outfit');
        return finalOutfit;
    }

    async getStylists(): Promise<Stylist[]> {
        const { data, error } = await supabase
            .from('stylists')
            .select('*');
        if (error) throw error;
        return data || [];
    }

    async saveStylist(stylist: Partial<Stylist>): Promise<Stylist> {
        if (stylist.id) {
            const { data, error } = await supabase
                .from('stylists')
                .update(stylist)
                .eq('id', stylist.id)
                .select()
                .single();
            if (error) throw error;
            return data;
        } else {
            const { data, error } = await supabase
                .from('stylists')
                .insert(stylist)
                .select()
                .single();
            if (error) throw error;
            return data;
        }
    }

    async getStats(): Promise<DashboardStats> {
        const [itemsCount, outfitsCount] = await Promise.all([
            supabase.from('fashion_items').select('*', { count: 'exact', head: true }),
            supabase.from('curated_outfits').select('*', { count: 'exact', head: true })
        ]);

        return {
            items: itemsCount.count || 0,
            outfits: outfitsCount.count || 0
        };
    }
}

export const supabaseService = new SupabaseService();
