import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Map of mock IDs to valid UUIDs
const idMap: Record<string, string> = {
    'stylist-1': '550e8400-e29b-41d4-a716-446655440001',
    'stylist-2': '550e8400-e29b-41d4-a716-446655440002',
    'item-1': '11111111-1111-4111-a111-111111111111',
    'item-2': '22222222-2222-4222-a222-222222222222',
    'item-3': '33333333-3333-4333-a333-333333333333',
    'item-4': '44444444-4444-4444-a444-444444444444',
    'item-5': '55555555-5555-4555-a555-555555555555',
    'item-6': '66666666-6666-4666-a666-666666666666',
    'item-7': '77777777-7777-4777-a777-777777777777',
    'item-8': '88888888-8888-4888-a888-888888888888',
    'item-9': '99999999-9999-4999-a999-999999999999',
    'item-10': 'aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa',
    'item-11': 'bbbbbbbb-bbbb-4bbb-bbbb-bbbbbbbbbbbb',
    'item-12': 'cccccccc-cccc-4ccc-cccc-cccccccccccc',
    'item-13': 'dddddddd-dddd-4ddd-dddd-dddddddddddd',
    'outfit-1': '00000000-0000-4000-8000-000000000001',
    'outfit-2': '00000000-0000-4000-8000-000000000002',
    'outfit-3': '00000000-0000-4000-8000-000000000003',
    'outfit-4': '00000000-0000-4000-8000-000000000004'
};

const stylists = [
    {
        id: idMap['stylist-1'],
        name: 'Emma Rodriguez',
        bio: 'Minimalist styling expert with 12 years in luxury fashion',
        avatar_url: 'https://images.unsplash.com/photo-1722108990072-ce5a88312f53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc3R5bGlzdCUyMGRlc2lnbmVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY5NTQxMjY4fDA&ixlib=rb-4.1.0&q=80&w=400',
        specialization: 'Minimalist & Contemporary'
    },
    {
        id: idMap['stylist-2'],
        name: 'Marcus Chen',
        bio: 'Street-luxury fusion specialist, featured in GQ',
        avatar_url: 'https://images.unsplash.com/photo-1628876521188-58ac53e31bf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwbW9kZWwlMjBmYXNoaW9uJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY5NTQxMjY2fDA&ixlib=rb-4.1.0&q=80&w=400',
        specialization: 'Streetwear & Urban'
    }
];

const fashionItems = [
    { id: idMap['item-1'], name: 'Oxford White Shirt', brand: 'Brooks Brothers', price: 89, category: 'shirt', image_url: 'https://images.unsplash.com/photo-1556630184-066f7ac4e15f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400', purchase_url: 'https://brooksbrothers.com', platform: 'Brooks Brothers', is_active: true },
    { id: idMap['item-2'], name: 'Slim Fit Black Denim', brand: 'Levi\'s', price: 98, category: 'pants', image_url: 'https://images.unsplash.com/photo-1744383390068-abfc7bc7fd07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400', purchase_url: 'https://levi.com', platform: 'Levi\'s', is_active: true },
    { id: idMap['item-3'], name: 'Classic White Sneakers', brand: 'Common Projects', price: 425, category: 'shoes', image_url: 'https://images.unsplash.com/photo-1573875133340-0b589f59a8c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400', purchase_url: 'https://mrporter.com', platform: 'Mr Porter', is_active: true },
    { id: idMap['item-4'], name: 'Leather Biker Jacket', brand: 'AllSaints', price: 529, category: 'outerwear', image_url: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400', purchase_url: 'https://allsaints.com', platform: 'AllSaints', is_active: true },
    { id: idMap['item-5'], name: 'Aviator Sunglasses', brand: 'Ray-Ban', price: 168, category: 'accessories', image_url: 'https://images.unsplash.com/photo-1764333327297-0ebfd9fda541?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400', purchase_url: 'https://ray-ban.com', platform: 'Ray-Ban', is_active: true },
    { id: idMap['item-6'], name: 'Minimalist Watch', brand: 'Daniel Wellington', price: 199, category: 'accessories', image_url: 'https://images.unsplash.com/photo-1760532466984-39c3eb7f1254?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400', purchase_url: 'https://danielwellington.com', platform: 'Daniel Wellington', is_active: true },
    { id: idMap['item-7'], name: 'Casual Dress Shirt', brand: 'J.Crew', price: 79, category: 'shirt', image_url: 'https://images.unsplash.com/photo-1657878337883-b568265e5bc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400', purchase_url: 'https://jcrew.com', platform: 'J.Crew', is_active: true },
    { id: idMap['item-8'], name: 'Slim Chino Pants', brand: 'Banana Republic', price: 89, category: 'pants', image_url: 'https://images.unsplash.com/photo-1696889450800-e94ec7a32206?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400', purchase_url: 'https://bananarepublic.com', platform: 'Banana Republic', is_active: true },
    { id: idMap['item-9'], name: 'Chelsea Boots', brand: 'Thursday Boot Co.', price: 199, category: 'shoes', image_url: 'https://images.unsplash.com/photo-1761052720710-32349209f6b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400', purchase_url: 'https://thursdayboots.com', platform: 'Thursday Boots', is_active: true },
    { id: idMap['item-10'], name: 'Premium White Tee', brand: 'Everlane', price: 35, category: 'shirt', image_url: 'https://images.unsplash.com/photo-1485920784995-d65789b1c3af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400', purchase_url: 'https://everlane.com', platform: 'Everlane', is_active: true },
    { id: idMap['item-11'], name: 'Leather Backpack', brand: 'Fossil', price: 248, category: 'accessories', image_url: 'https://images.unsplash.com/photo-1597708724657-6b294dc5a3af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400', purchase_url: 'https://fossil.com', platform: 'Fossil', is_active: true },
    { id: idMap['item-12'], name: 'Navy Blazer', brand: 'Hugo Boss', price: 595, category: 'outerwear', image_url: 'https://images.unsplash.com/photo-1598915850252-fb07ad1e6768?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400', purchase_url: 'https://hugoboss.com', platform: 'Hugo Boss', is_active: true },
    { id: idMap['item-13'], name: 'Mauve Linen Relaxed Shirt', brand: 'Zara India', price: 2990, category: 'shirt', image_url: 'https://pub-8b5d3869279b4a4fa8003f56ea4589d3.r2.dev/items/mauve-shirt.png', purchase_url: 'https://www.zara.com/in/', platform: 'Zara India', is_active: true }
];

const outfits = [
    {
        id: idMap['outfit-1'],
        name: 'Clean Minimalist',
        description: 'Effortlessly sophisticated. Perfect for coffee meetings or creative studio visits.',
        stylist_id: idMap['stylist-1'],
        model_image_url: 'https://images.unsplash.com/photo-1628876521188-58ac53e31bf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        tags: ['Minimalist', 'Professional', 'Timeless'],
        vibe: ['Minimalist', 'Professional', 'Timeless'],
        status: 'published',
        items: { shirt: 'item-1', pants: 'item-2', shoes: 'item-3', accessories: ['item-6'] }
    },
    {
        id: idMap['outfit-2'],
        name: 'Urban Edge',
        description: 'Street-smart styling with a rebellious touch. Ideal for evening events.',
        stylist_id: idMap['stylist-2'],
        model_image_url: 'https://images.unsplash.com/photo-1620818655725-d388f51eb29f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        tags: ['Edgy', 'Urban', 'Cool'],
        vibe: ['Edgy', 'Urban', 'Cool'],
        status: 'published',
        items: { shirt: 'item-10', pants: 'item-2', shoes: 'item-9', outerwear: 'item-4', accessories: ['item-5'] }
    },
    {
        id: idMap['outfit-3'],
        name: 'Smart Casual',
        description: 'Polished but relaxed. Works from brunch to business casual.',
        stylist_id: idMap['stylist-1'],
        model_image_url: 'https://images.unsplash.com/photo-1628876521188-58ac53e31bf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        tags: ['Smart', 'Casual', 'Versatile'],
        vibe: ['Smart', 'Casual', 'Versatile'],
        status: 'published',
        items: { shirt: 'item-7', pants: 'item-8', shoes: 'item-9', accessories: ['item-6', 'item-11'] }
    },
    {
        id: idMap['outfit-4'],
        name: 'Business Refined',
        description: 'Executive presence with contemporary flair. Board meetings to dinner.',
        stylist_id: idMap['stylist-1'],
        model_image_url: 'https://images.unsplash.com/photo-1620818655725-d388f51eb29f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        tags: ['Professional', 'Refined', 'Modern'],
        vibe: ['Professional', 'Refined', 'Modern'],
        status: 'published',
        items: { shirt: 'item-1', pants: 'item-8', shoes: 'item-9', outerwear: 'item-12', accessories: ['item-6'] }
    }
];

async function migrate() {
    console.log('🚀 Starting migration...');

    // 1. Stylists
    console.log('Inserting stylists...');
    const { error: sError } = await supabase.from('stylists').upsert(stylists);
    if (sError) {
        console.error('Stylists error:', sError);
        return;
    }

    // 2. Fashion Items
    console.log('Inserting fashion items...');
    const { error: iError } = await supabase.from('fashion_items').upsert(fashionItems);
    if (iError) {
        console.error('Items error:', iError);
        return;
    }

    // 3. Outfits & Relationships
    console.log('Inserting outfits...');
    for (const outfit of outfits) {
        const { id, items, ...outfitData } = outfit;
        const { error: oError } = await supabase.from('curated_outfits').upsert({ id, ...outfitData });

        if (oError) {
            console.error(`Outfit ${id} error:`, oError);
            continue;
        }

        // Junction table
        console.log(`Linking items for ${id}...`);
        const itemLinks: any[] = [];
        if (items.shirt) itemLinks.push({ outfit_id: id, item_id: idMap[items.shirt], slot_type: 'shirt' });
        if (items.pants) itemLinks.push({ outfit_id: id, item_id: idMap[items.pants], slot_type: 'pants' });
        if (items.shoes) itemLinks.push({ outfit_id: id, item_id: idMap[items.shoes], slot_type: 'shoes' });
        if (items.outerwear) itemLinks.push({ outfit_id: id, item_id: idMap[items.outerwear], slot_type: 'outerwear' });
        if (items.accessories) {
            (items.accessories as string[]).forEach(accId => {
                if (idMap[accId]) {
                    itemLinks.push({ outfit_id: id, item_id: idMap[accId], slot_type: 'accessories' });
                }
            });
        }

        if (itemLinks.length > 0) {
            const { error: lError } = await supabase.from('outfit_items').insert(itemLinks);
            if (lError) console.error(`Links for ${id} error:`, lError);
        }
    }

    console.log('✅ Migration complete!');
}

migrate();
