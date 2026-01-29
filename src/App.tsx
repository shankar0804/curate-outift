import { Routes, Route, useSearchParams } from 'react-router-dom';

// V5 Components
import { WardrobeHome as V5Home } from '@/components/v5/WardrobeHome';
import { CurationSelection as V5Selection } from '@/components/v5/CurationSelection';
import { StyleBreakdown as V5Breakdown } from '@/components/v5/StyleBreakdown';

// V6 Components
import { WardrobeHome as V6Home } from '@/components/v6/WardrobeHome';
import { CurationSelection as V6Selection } from '@/components/v6/CurationSelection';
import { StyleBreakdown as V6Breakdown } from '@/components/v6/StyleBreakdown';

// V7 Components
import { WardrobeHome as V7Home } from '@/components/v7/WardrobeHome';
import { CurationSelection as V7Selection } from '@/components/v7/CurationSelection';
import { StyleBreakdown as V7Breakdown } from '@/components/v7/StyleBreakdown';

// V8 Components
import { WardrobeHome as V8Home } from '@/components/v8/WardrobeHome';
import { CurationSelection as V8Selection } from '@/components/v8/CurationSelection';
import { StyleBreakdown as V8Breakdown } from '@/components/v8/StyleBreakdown';

// V9 Components
import { WardrobeHome as V9Home } from '@/components/v9/WardrobeHome';
import { CurationSelection as V9Selection } from '@/components/v9/CurationSelection';
import { StyleBreakdown as V9Breakdown } from '@/components/v9/StyleBreakdown';

// V10 Components
import { WardrobeHome as V10Home } from '@/components/v10/WardrobeHome';
import { CurationSelection as V10Selection } from '@/components/v10/CurationSelection';
import { StyleBreakdown as V10Breakdown } from '@/components/v10/StyleBreakdown';

// V11 Components
import { WardrobeHome as V11Home } from '@/components/v11/WardrobeHome';
import { CurationSelection as V11Selection } from '@/components/v11/CurationSelection';
import { StyleBreakdown as V11Breakdown } from '@/components/v11/StyleBreakdown';

export default function App() {
    const [searchParams] = useSearchParams();
    const version = searchParams.get('v') || '11'; // Default to V11 (Desktop)

    const getComponent = (type: 'home' | 'selection' | 'breakdown') => {
        if (version === '5') {
            if (type === 'home') return <V5Home />;
            if (type === 'selection') return <V5Selection />;
            return <V5Breakdown />;
        }
        if (version === '6') {
            if (type === 'home') return <V6Home />;
            if (type === 'selection') return <V6Selection />;
            return <V6Breakdown />;
        }
        if (version === '7') {
            if (type === 'home') return <V7Home />;
            if (type === 'selection') return <V7Selection />;
            return <V7Breakdown />;
        }
        if (version === '8') {
            if (type === 'home') return <V8Home />;
            if (type === 'selection') return <V8Selection />;
            return <V8Breakdown />;
        }
        if (version === '9') {
            if (type === 'home') return <V9Home />;
            if (type === 'selection') return <V9Selection />;
            return <V9Breakdown />;
        }
        if (version === '10') {
            if (type === 'home') return <V10Home />;
            if (type === 'selection') return <V10Selection />;
            return <V10Breakdown />;
        }
        if (version === '11') {
            if (type === 'home') return <V11Home />;
            if (type === 'selection') return <V11Selection />;
            return <V11Breakdown />;
        }
        // Default to V11 (Desktop Optimized) if version is not explicitly matched
        if (type === 'home') return <V11Home />;
        if (type === 'selection') return <V11Selection />;
        return <V11Breakdown />;
    };

    return (
        <div className="bg-background min-h-screen selection:bg-white selection:text-black font-sans antialiased overflow-x-hidden">
            <Routes>
                <Route path="/" element={getComponent('home')} />
                <Route path="/item/:itemId" element={getComponent('selection')} />
                <Route path="/look/:outfitId" element={getComponent('breakdown')} />
            </Routes>
        </div>
    );
}
