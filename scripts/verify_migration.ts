import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

async function verify() {
    const { count: sCount } = await supabase.from('stylists').select('*', { count: 'exact', head: true });
    const { count: iCount } = await supabase.from('fashion_items').select('*', { count: 'exact', head: true });
    const { count: oCount } = await supabase.from('curated_outfits').select('*', { count: 'exact', head: true });
    const { count: lCount } = await supabase.from('outfit_items').select('*', { count: 'exact', head: true });

    console.log('--- Migration Verification ---');
    console.log('Stylists:', sCount);
    console.log('Fashion Items:', iCount);
    console.log('Curated Outfits:', oCount);
    console.log('Outfit Links:', lCount);
}

verify();
