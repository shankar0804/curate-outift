import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { api, FashionItem, CuratedOutfit, Stylist, DashboardStats } from '@/services/api';
import {
    Plus,
    Trash2,
    ChevronDown,
    ExternalLink,
    Upload,
    Image as ImageIcon,
    LayoutDashboard,
    ShoppingBag
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function AdminPortal() {
    const [activeTab, setActiveTab] = useState<'inventory' | 'outfits' | 'stylists'>('inventory');
    const [items, setItems] = useState<FashionItem[]>([]);
    const [outfits, setOutfits] = useState<CuratedOutfit[]>([]);
    const [stylists, setStylists] = useState<Stylist[]>([]);
    const [stats, setStats] = useState<DashboardStats>({ items: 0, outfits: 0 });
    const [isLoading, setIsLoading] = useState(true);

    // Filter & Search State
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');

    // Item Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState<Partial<FashionItem> | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploadPreview, setUploadPreview] = useState<string | null>(null);

    // Outfit Builder State
    const [isOutfitModalOpen, setIsOutfitModalOpen] = useState(false);
    const [currentOutfit, setCurrentOutfit] = useState<Partial<CuratedOutfit>>({
        name: '',
        status: 'published',
        vibe: [],
        tags: []
    });
    const [outfitLinks, setOutfitLinks] = useState<{ [key: string]: string }>({}); // slotId -> item_id
    const [dynamicSlots, setDynamicSlots] = useState<{ id: string, label: string, category: string }[]>([
        { id: 'top', label: 'Top', category: 'shirt' },
        { id: 'bottom', label: 'Bottom', category: 'pants' },
        { id: 'shoes', label: 'Footwear', category: 'shoes' },
        { id: 'outerwear', label: 'Outerwear', category: 'outerwear' },
        { id: 'accessory_1', label: 'Accessory', category: 'accessories' },
    ]);
    const [outfitModelImage, setOutfitModelImage] = useState<File | null>(null);
    const [outfitPreview, setOutfitPreview] = useState<string | null>(null);

    // Stylist Modal State
    const [isStylistModalOpen, setIsStylistModalOpen] = useState(false);
    const [currentStylist, setCurrentStylist] = useState<Partial<Stylist>>({
        name: '',
        bio: '',
        specialization: '',
        avatar_url: ''
    });

    // Toast State
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    // Derived State: Filters
    const filteredItems = items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.brand.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const filteredOutfits = outfits.filter(outfit => {
        const matchesSearch = outfit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            outfit.vibe.some(v => v.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesSearch;
    });

    const filteredStylists = stylists.filter(stylist => {
        const matchesSearch = stylist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            stylist.specialization?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [itemsData, outfitsData, statsData, stylistsData] = await Promise.all([
                api.getItems(),
                api.getOutfits(),
                api.getStats(),
                api.getStylists()
            ]);
            setItems(itemsData);
            setOutfits(outfitsData);
            setStats(statsData);
            setStylists(stylistsData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveItem = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentItem) return;

        try {
            await api.saveItem(currentItem, imageFile || undefined);
            setIsModalOpen(false);
            setCurrentItem(null);
            setImageFile(null);
            setUploadPreview(null);
            fetchData();
        } catch (error) {
            console.error('Error saving item:', error);
            showToast('Failed to save item', 'error');
        }
    };

    const handleDeleteItem = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        try {
            await api.deleteItem(id);
            fetchData();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setUploadPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleOutfitImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setOutfitModelImage(file);
            const reader = new FileReader();
            reader.onloadend = () => setOutfitPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleSaveOutfit = async (e: React.FormEvent) => {
        e.preventDefault();

        const links = Object.entries(outfitLinks).map(([slotId, item_id]) => {
            const slot = dynamicSlots.find(s => s.id === slotId);
            return {
                slot_type: slot?.category || 'accessories',
                item_id
            };
        });

        if (links.length === 0) {
            showToast('Select at least one item', 'error');
            return;
        }

        try {
            await api.saveOutfit(currentOutfit, outfitModelImage || undefined, links);
            setIsOutfitModalOpen(false);
            setOutfitLinks({});
            setDynamicSlots([
                { id: 'top', label: 'Top', category: 'shirt' },
                { id: 'bottom', label: 'Bottom', category: 'pants' },
                { id: 'shoes', label: 'Footwear', category: 'shoes' },
                { id: 'outerwear', label: 'Outerwear', category: 'outerwear' },
                { id: 'accessory_1', label: 'Accessory', category: 'accessories' },
            ]);
            setOutfitModelImage(null);
            setOutfitPreview(null);
            showToast('Look published', 'success');
            fetchData();
        } catch (error) {
            console.error('Error saving outfit:', error);
            showToast('Failed to save outfit', 'error');
        }
    };

    const handleSaveStylist = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.saveStylist(currentStylist);
            setIsStylistModalOpen(false);
            showToast('Stylist profile sealed', 'success');
            fetchData();
        } catch (error) {
            console.error('Error saving stylist:', error);
            showToast('Failed to save stylist', 'error');
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col md:flex-row font-display">
            {/* Sidebar */}
            <aside className="w-full md:w-80 border-r border-white/5 p-8 flex flex-col gap-12 bg-black/40 backdrop-blur-xl shrink-0">
                <header>
                    <h1 className="text-2xl font-black uppercase tracking-[0.2em] mb-2">Curator Admin</h1>
                    <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Aesthetic Control v1.2</p>
                </header>

                <nav className="flex flex-col gap-3">
                    <TabButton
                        active={activeTab === 'inventory'}
                        onClick={() => setActiveTab('inventory')}
                        icon={<ShoppingBag className="w-4 h-4" />}
                        label="Inventory"
                    />
                    <TabButton
                        active={activeTab === 'outfits'}
                        onClick={() => setActiveTab('outfits')}
                        icon={<LayoutDashboard className="w-4 h-4" />}
                        label="Outfit Edits"
                    />
                    <TabButton
                        active={activeTab === 'stylists'}
                        onClick={() => setActiveTab('stylists')}
                        icon={<Plus className="w-4 h-4" />}
                        label="Stylist Desk"
                    />
                </nav>

                <div className="mt-auto pt-8 border-t border-white/5 flex flex-col gap-4">
                    <div className="flex justify-between items-center px-4">
                        <span className="text-[10px] text-white/20 uppercase font-black">Archive Stat</span>
                        <div className="flex flex-col items-end">
                            <span className="text-xs font-black text-white/60">{stats.items} Pieces</span>
                            <span className="text-xs font-black text-white/40">{stats.outfits} Looks</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Stage */}
            <main className="flex-1 overflow-y-auto p-12 lg:p-20 scrollbar-hide">
                <div className="max-w-6xl mx-auto">
                    <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <div>
                            <h2 className="text-[10px] text-white/20 uppercase font-black tracking-[0.5em] mb-4">Control Plane</h2>
                            <h3 className="text-5xl lg:text-7xl font-black uppercase leading-none tracking-tighter">
                                {activeTab === 'inventory' ? 'Inventory.' : activeTab === 'outfits' ? 'Outfit Edits.' : 'Stylists.'}
                            </h3>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            {/* Search & Filter Bar */}
                            {(activeTab === 'inventory' || activeTab === 'outfits' || activeTab === 'stylists') && (
                                <div className="flex bg-white/5 rounded-2xl p-1 border border-white/5 backdrop-blur-md">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                        className="bg-transparent border-none outline-none px-6 py-3 text-sm font-display uppercase tracking-widest font-black w-48 sm:w-64"
                                    />
                                    {activeTab === 'inventory' && (
                                        <select
                                            value={categoryFilter}
                                            onChange={e => setCategoryFilter(e.target.value)}
                                            className="bg-black/40 border-none outline-none px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest cursor-pointer"
                                        >
                                            <option value="all">All Pieces</option>
                                            <option value="shirt">Tops</option>
                                            <option value="pants">Bottoms</option>
                                            <option value="shoes">Footwear</option>
                                            <option value="outerwear">Outerwear</option>
                                            <option value="accessories">Accs</option>
                                        </select>
                                    )}
                                </div>
                            )}

                            {activeTab === 'inventory' ? (
                                <button
                                    onClick={() => {
                                        setCurrentItem({
                                            name: '',
                                            brand: '',
                                            price: 0,
                                            category: 'shirt',
                                            is_active: true
                                        } as any);
                                        setUploadPreview(null);
                                        setIsModalOpen(true);
                                    }}
                                    className="bg-white text-black px-8 py-4 rounded-[20px] font-black uppercase text-[10px] tracking-[0.2em] flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-2xl hover:shadow-white/10 shrink-0"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add piece
                                </button>
                            ) : activeTab === 'outfits' ? (
                                <button
                                    onClick={() => {
                                        setCurrentOutfit({ name: '', status: 'published', vibe: [], tags: [], stylist_id: stylists[0]?.id || '' });
                                        setOutfitLinks({});
                                        setDynamicSlots([
                                            { id: 'top', label: 'Top', category: 'shirt' },
                                            { id: 'bottom', label: 'Bottom', category: 'pants' },
                                            { id: 'shoes', label: 'Footwear', category: 'shoes' },
                                            { id: 'outerwear', label: 'Outerwear', category: 'outerwear' },
                                            { id: 'accessory_1', label: 'Accessory', category: 'accessories' },
                                        ]);
                                        setOutfitPreview(null);
                                        setIsOutfitModalOpen(true);
                                    }}
                                    className="bg-white text-black px-8 py-4 rounded-[20px] font-black uppercase text-[10px] tracking-[0.2em] flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-2xl hover:shadow-white/10 shrink-0"
                                >
                                    <Plus className="w-4 h-4" />
                                    Curate Look
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        setCurrentStylist({
                                            name: '',
                                            bio: '',
                                            specialization: '',
                                            avatar_url: ''
                                        });
                                        setIsStylistModalOpen(true);
                                    }}
                                    className="bg-white text-black px-8 py-4 rounded-[20px] font-black uppercase text-[10px] tracking-[0.2em] flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-2xl hover:shadow-white/10 shrink-0"
                                >
                                    <Plus className="w-4 h-4" />
                                    Onboard Stylist
                                </button>
                            )}
                        </div>
                    </header>

                    {isLoading ? (
                        <div className="h-64 flex items-center justify-center">
                            <div className="w-12 h-12 border-2 border-white/10 border-t-white rounded-full animate-spin" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {activeTab === 'inventory' ? (
                                filteredItems.map((item) => (
                                    <ItemCard
                                        key={item.id}
                                        item={item}
                                        onEdit={() => {
                                            setCurrentItem(item);
                                            setUploadPreview(item.image_url);
                                            setIsModalOpen(true);
                                        }}
                                        onDelete={() => handleDeleteItem(item.id)}
                                    />
                                ))
                            ) : activeTab === 'outfits' ? (
                                filteredOutfits.map((outfit) => (
                                    <OutfitCard
                                        key={outfit.id}
                                        outfit={outfit}
                                        onEdit={() => {
                                            setCurrentOutfit(outfit);
                                            setOutfitPreview(outfit.model_image_url);

                                            const links: { [key: string]: string } = {};
                                            const slots: { id: string, label: string, category: string }[] = [];

                                            outfit.items?.forEach((link, index) => {
                                                const slotId = `${link.slot_type}_${index}`;
                                                links[slotId] = link.item.id;
                                                slots.push({
                                                    id: slotId,
                                                    label: link.slot_type.charAt(0).toUpperCase() + link.slot_type.slice(1),
                                                    category: link.slot_type
                                                });
                                            });

                                            if (slots.length === 0) {
                                                setDynamicSlots([
                                                    { id: 'top', label: 'Top', category: 'shirt' },
                                                    { id: 'bottom', label: 'Bottom', category: 'pants' },
                                                    { id: 'shoes', label: 'Footwear', category: 'shoes' },
                                                    { id: 'outerwear', label: 'Outerwear', category: 'outerwear' },
                                                    { id: 'accessory_1', label: 'Accessory', category: 'accessories' },
                                                ]);
                                            } else {
                                                setDynamicSlots(slots);
                                            }

                                            setOutfitLinks(links);
                                            setIsOutfitModalOpen(true);
                                        }}
                                    />
                                ))
                            ) : (
                                filteredStylists.map((stylist) => (
                                    <StylistCard
                                        key={stylist.id}
                                        stylist={stylist}
                                        onEdit={() => {
                                            setCurrentStylist(stylist);
                                            setIsStylistModalOpen(true);
                                        }}
                                    />
                                ))
                            )}
                        </div>
                    )}
                </div>
            </main>

            {/* Modals */}
            <AnimatePresence mode="wait">
                {isModalOpen && currentItem && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/5 rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row"
                        >
                            {/* Image Workspace */}
                            <div className="md:w-1/2 p-8 border-r border-white/5 bg-black/20 flex flex-col">
                                <label className="flex-1 rounded-[32px] border-2 border-dashed border-white/5 hover:border-white/20 transition-all flex flex-col items-center justify-center gap-4 cursor-pointer relative group overflow-hidden">
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                    {uploadPreview ? (
                                        <>
                                            <img src={uploadPreview} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" alt="Preview" />
                                            <div className="relative z-10 bg-black/60 px-4 py-2 rounded-xl border border-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all">
                                                <Upload className="w-4 h-4" />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <ImageIcon className="w-12 h-12 text-white/10" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Drop Asset</span>
                                        </>
                                    )}
                                </label>
                            </div>

                            {/* Data Controls */}
                            <form onSubmit={handleSaveItem} className="md:w-1/2 p-10 flex flex-col gap-8">
                                <h4 className="text-xl font-black uppercase tracking-widest">Metadata</h4>

                                <div className="space-y-6">
                                    <ModalInput
                                        label="Display Name"
                                        value={currentItem.name || ''}
                                        onChange={(v: string) => setCurrentItem({ ...currentItem, name: v })}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <ModalInput
                                            label="Brand"
                                            value={currentItem.brand || ''}
                                            onChange={(v: string) => setCurrentItem({ ...currentItem, brand: v })}
                                        />
                                        <ModalInput
                                            label="Price"
                                            value={String(currentItem.price || '')}
                                            onChange={(v: string) => setCurrentItem({ ...currentItem, price: parseFloat(v) })}
                                            type="number"
                                        />
                                    </div>
                                    <ModalSelect
                                        label="Category"
                                        value={currentItem.category || 'shirt'}
                                        options={['shirt', 'pants', 'shoes', 'outerwear', 'accessories']}
                                        onChange={(v: string) => setCurrentItem({ ...currentItem, category: v as any })}
                                    />
                                    <div className="space-y-4 pt-2">
                                        <ModalInput
                                            label="Product Link (URL)"
                                            value={currentItem.purchase_url || ''}
                                            onChange={(v: string) => setCurrentItem({ ...currentItem, purchase_url: v })}
                                            placeholder="https://..."
                                        />
                                        <ModalInput
                                            label="Store Name"
                                            value={currentItem.platform || ''}
                                            onChange={(v: string) => setCurrentItem({ ...currentItem, platform: v })}
                                            placeholder="e.g. Myntra, Zara"
                                        />
                                    </div>
                                </div>

                                <div className="mt-auto flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 py-5 rounded-2xl bg-white/5 text-white/40 uppercase font-black text-[10px] tracking-widest hover:bg-white/10 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-5 rounded-2xl bg-white text-black uppercase font-black text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
                                    >
                                        Seal piece
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}

                {isOutfitModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOutfitModalOpen(false)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-5xl h-[85vh] bg-[#0a0a0a] border border-white/5 rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row"
                        >
                            {/* Left: Metadata & Preview */}
                            <div className="md:w-1/3 p-10 border-r border-white/5 bg-black/20 overflow-y-auto scrollbar-hide flex flex-col gap-10">
                                <h4 className="text-xl font-black uppercase tracking-widest">Look Studio</h4>

                                <label className="aspect-[3/4] rounded-[32px] border-2 border-dashed border-white/5 hover:border-white/20 transition-all flex flex-col items-center justify-center gap-4 cursor-pointer relative group overflow-hidden shrink-0">
                                    <input type="file" className="hidden" accept="image/*" onChange={handleOutfitImageChange} />
                                    {outfitPreview ? (
                                        <img src={outfitPreview} className="absolute inset-0 w-full h-full object-cover" alt="Preview" />
                                    ) : (
                                        <>
                                            <ImageIcon className="w-12 h-12 text-white/10" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-white/30 text-center px-6">Upload Model/Vibe Image</span>
                                        </>
                                    )}
                                </label>

                                <div className="space-y-6">
                                    <ModalInput
                                        label="Look Name"
                                        value={currentOutfit.name || ''}
                                        onChange={(v: string) => setCurrentOutfit({ ...currentOutfit, name: v })}
                                    />

                                    <ModalSelect
                                        label="Stylist"
                                        value={currentOutfit.stylist_id || ''}
                                        options={stylists.map(s => ({ label: s.name, value: s.id }))}
                                        onChange={(v: string) => setCurrentOutfit({ ...currentOutfit, stylist_id: v })}
                                    />

                                    <ModalInput
                                        label="Vibe Tags (comma separated)"
                                        value={currentOutfit.vibe?.join(', ') || ''}
                                        onChange={(v: string) => setCurrentOutfit({ ...currentOutfit, vibe: v.split(',').map(s => s.trim()) })}
                                    />
                                </div>

                                <button
                                    onClick={handleSaveOutfit}
                                    className="w-full py-5 rounded-2xl bg-white text-black uppercase font-black text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl mt-auto"
                                >
                                    Publish Full Look
                                </button>
                            </div>

                            <div className="flex-1 p-10 overflow-y-auto scrollbar-hide">
                                <div className="flex justify-between items-center mb-10">
                                    <h4 className="text-[10px] text-white/20 uppercase font-black tracking-[0.5em]">Slot Assignment</h4>
                                    <div className="flex items-center gap-2">
                                        <select
                                            id="new-slot-category"
                                            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[8px] font-black uppercase tracking-widest outline-none hover:bg-white/10 transition-all cursor-pointer"
                                            defaultValue="accessories"
                                        >
                                            <option value="shirt" className="bg-[#0a0a0a]">Top</option>
                                            <option value="pants" className="bg-[#0a0a0a]">Bottom</option>
                                            <option value="shoes" className="bg-[#0a0a0a]">Shoes</option>
                                            <option value="outerwear" className="bg-[#0a0a0a]">Outer</option>
                                            <option value="accessories" className="bg-[#0a0a0a]">Accs</option>
                                        </select>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const select = document.getElementById('new-slot-category') as HTMLSelectElement;
                                                const cat = select.value;
                                                const labels: { [key: string]: string } = { shirt: 'Extra Top', pants: 'Extra Leg', shoes: 'Extra Foot', outerwear: 'Extra Outer', accessories: 'Accessory' };
                                                const newId = `${cat}_${Date.now()}`;
                                                setDynamicSlots([...dynamicSlots, { id: newId, label: labels[cat], category: cat }]);
                                            }}
                                            className="px-4 py-2 rounded-xl bg-white text-black text-[8px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-lg"
                                        >
                                            <Plus className="w-3 h-3" />
                                            Add Layer
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pb-20">
                                    {dynamicSlots.map((slot) => (
                                        <BuilderSlot
                                            key={slot.id}
                                            label={slot.label}
                                            slot={slot.id}
                                            selectedItem={items.find(i => i.id === outfitLinks[slot.id])}
                                            onSelect={(id: string) => setOutfitLinks({ ...outfitLinks, [slot.id]: id })}
                                            onRemove={() => {
                                                const newSlots = dynamicSlots.filter(s => s.id !== slot.id);
                                                const newLinks = { ...outfitLinks };
                                                delete newLinks[slot.id];
                                                setDynamicSlots(newSlots);
                                                setOutfitLinks(newLinks);
                                            }}
                                            items={items.filter(i => i.category === slot.category)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

                {isStylistModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsStylistModalOpen(false)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-xl bg-[#0a0a0a] border border-white/5 rounded-[40px] overflow-hidden shadow-2xl"
                        >
                            <form onSubmit={handleSaveStylist} className="p-10 flex flex-col gap-8">
                                <h4 className="text-xl font-black uppercase tracking-widest">Stylist Profile</h4>

                                <div className="space-y-6">
                                    <ModalInput
                                        label="Full Name"
                                        value={currentStylist.name || ''}
                                        onChange={(v: string) => setCurrentStylist({ ...currentStylist, name: v })}
                                    />
                                    <ModalInput
                                        label="Specialization"
                                        value={currentStylist.specialization || ''}
                                        onChange={(v: string) => setCurrentStylist({ ...currentStylist, specialization: v })}
                                    />
                                    <div>
                                        <label className="block text-[8px] font-black text-white/20 uppercase tracking-[0.3em] mb-2 px-2">Bio</label>
                                        <textarea
                                            value={currentStylist.bio || ''}
                                            onChange={e => setCurrentStylist({ ...currentStylist, bio: e.target.value })}
                                            className="w-full bg-white/[0.04] border border-white/5 rounded-2xl py-4 px-6 text-sm outline-none focus:border-white/20 transition-all font-display h-32 resize-none"
                                        />
                                    </div>
                                    <ModalInput
                                        label="Avatar URL (Optional)"
                                        value={currentStylist.avatar_url || ''}
                                        onChange={(v: string) => setCurrentStylist({ ...currentStylist, avatar_url: v })}
                                    />
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsStylistModalOpen(false)}
                                        className="flex-1 py-5 rounded-2xl bg-white/5 text-white/40 uppercase font-black text-[10px] tracking-widest hover:bg-white/10 transition-all"
                                    >
                                        Dismiss
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-5 rounded-2xl bg-white text-black uppercase font-black text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
                                    >
                                        Seal Profile
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Toast System */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className={cn(
                            "fixed bottom-12 left-1/2 -translate-x-1/2 z-[200] px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-2xl backdrop-blur-xl border flex items-center gap-4",
                            toast.type === 'success'
                                ? "bg-white text-black border-white/20"
                                : "bg-red-500 text-white border-red-400/20"
                        )}
                    >
                        <div className={cn(
                            "w-2 h-2 rounded-full animate-pulse",
                            toast.type === 'success' ? "bg-green-500" : "bg-white"
                        )} />
                        {toast.message}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function ItemCard({ item, onEdit, onDelete }: { item: FashionItem, onEdit: () => void, onDelete: () => void }) {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="group relative bg-white/[0.02] border border-white/5 rounded-[32px] p-6 hover:bg-white/[0.04] transition-all"
        >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6 bg-black">
                <img src={item.image_url} alt={item.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest">
                        {item.category}
                    </span>
                    {item.purchase_url && (
                        <span className="bg-white text-black px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest shadow-xl">
                            Linked
                        </span>
                    )}
                </div>

                <div className="absolute top-4 right-4 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button onClick={onEdit} className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl">
                        <ImageIcon className="w-4 h-4" />
                    </button>
                    <button onClick={onDelete} className="w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="px-2">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">{item.brand}</p>
                    <span className="text-sm font-black text-white/80">Rs. {Number(item.price).toLocaleString()}</span>
                </div>
                <h4 className="text-lg font-black uppercase tracking-tight leading-none truncate">{item.name}</h4>
            </div>
        </motion.div>
    );
}

function OutfitCard({ outfit, onEdit }: { outfit: CuratedOutfit, onEdit: () => void }) {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="group relative bg-white/[0.02] border border-white/5 rounded-[32px] p-6 hover:bg-white/[0.04] transition-all"
        >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6 bg-black">
                <img src={outfit.model_image_url} alt={outfit.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute top-4 right-4 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button onClick={onEdit} className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl">
                        <ExternalLink className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="px-2">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Curated by {outfit.stylist?.name || 'Unknown'}</p>
                    <span className="px-3 py-1 bg-white/5 rounded-full text-[8px] font-black uppercase tracking-widest text-white/60">
                        {outfit.items?.length || 0} Pieces
                    </span>
                </div>
                <h4 className="text-lg font-black uppercase tracking-tight leading-none truncate">{outfit.name}</h4>
            </div>
        </motion.div>
    );
}

function StylistCard({ stylist, onEdit }: { stylist: Stylist, onEdit: () => void }) {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="group relative bg-white/[0.02] border border-white/5 rounded-[32px] p-8 hover:bg-white/[0.04] transition-all flex flex-col items-center text-center gap-6"
        >
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/5 bg-black">
                {stylist.avatar_url ? (
                    <img src={stylist.avatar_url} alt={stylist.name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-white/5">
                        <span className="text-2xl font-black text-white/20">{stylist.name.charAt(0)}</span>
                    </div>
                )}
            </div>

            <div>
                <h4 className="text-xl font-black uppercase tracking-tight mb-2">{stylist.name}</h4>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">{stylist.specialization || 'Consultant'}</p>
            </div>

            <button
                onClick={onEdit}
                className="mt-2 w-full py-4 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
            >
                Edit Bureau Profile
            </button>
        </motion.div>
    );
}

function TabButton({ active, onClick, icon, label }: any) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center gap-4 px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all",
                active
                    ? "bg-white text-black shadow-2xl scale-105"
                    : "text-white/30 hover:text-white hover:bg-white/5"
            )}
        >
            {icon}
            {label}
        </button>
    );
}

function ModalInput({ label, value, onChange, type = 'text', placeholder = '' }: any) {
    return (
        <div>
            <label className="block text-[8px] font-black text-white/20 uppercase tracking-[0.3em] mb-2 px-2">{label}</label>
            <input
                type={type}
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-white/[0.04] border border-white/5 rounded-2xl py-4 px-6 text-sm outline-none focus:border-white/20 transition-all font-display placeholder:text-white/10"
            />
        </div>
    );
}

function ModalSelect({ label, value, options, onChange }: any) {
    return (
        <div>
            <label className="block text-[8px] font-black text-white/20 uppercase tracking-[0.3em] mb-2 px-2">{label}</label>
            <div className="relative">
                <select
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/5 rounded-2xl py-4 px-6 text-sm outline-none focus-within:border-white/20 transition-all appearance-none font-display uppercase tracking-widest font-black"
                >
                    {options.map((opt: any) => (
                        <option key={typeof opt === 'string' ? opt : opt.value} value={typeof opt === 'string' ? opt : opt.value} className="bg-[#0a0a0a]">
                            {typeof opt === 'string' ? opt : opt.label}
                        </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 pointer-events-none" />
            </div>
        </div>
    );
}

function BuilderSlot({ label, selectedItem, items, onSelect, ...props }: any) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative group">
            <header className="flex justify-between items-center mb-4 px-2">
                <div className="flex items-center gap-2">
                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/20">{label}</span>
                    <button
                        type="button"
                        onClick={props.onRemove}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-[8px] text-red-500/40 hover:text-red-500 uppercase font-black"
                    >
                        Remove
                    </button>
                </div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-[8px] font-black uppercase text-white/40 hover:text-white transition-colors"
                >
                    {selectedItem ? 'Change' : 'Assign'}
                </button>
            </header>

            <div
                className={cn(
                    "aspect-square rounded-[24px] border border-white/5 bg-white/[0.02] flex items-center justify-center overflow-hidden transition-all",
                    !selectedItem && "border-dashed border-white/10"
                )}
            >
                {selectedItem ? (
                    <img src={selectedItem.image_url} className="w-full h-full object-cover" />
                ) : (
                    <Plus className="w-5 h-5 text-white/5" />
                )}
            </div>

            {selectedItem && (
                <div className="mt-3 px-2">
                    <p className="text-[9px] font-black uppercase text-white/60 truncate">{selectedItem.name}</p>
                </div>
            )}

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute inset-0 z-20 bg-black/95 backdrop-blur-xl rounded-[24px] border border-white/20 p-4 overflow-y-auto scrollbar-hide flex flex-col gap-3"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[8px] font-black uppercase text-white/40">Select {label}</span>
                            <button onClick={() => setIsOpen(false)} className="text-[8px] uppercase font-black text-white/20 hover:text-white">Close</button>
                        </div>
                        {items.length > 0 ? (
                            <div className="grid grid-cols-2 gap-2">
                                {items.map((item: any) => (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            onSelect(item.id);
                                            setIsOpen(false);
                                        }}
                                        className="aspect-square rounded-xl overflow-hidden border border-white/10 hover:border-white/40 transition-all relative group/item"
                                    >
                                        <img src={item.image_url} className="w-full h-full object-cover grayscale opacity-60 group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all" />
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-[10px] text-white/20 uppercase font-black text-center px-4">
                                No items found in this category
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
