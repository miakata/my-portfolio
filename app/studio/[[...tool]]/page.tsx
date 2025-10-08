'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config';

// ⛔️ Tell Next NOT to try to pre-render this page at build time
export const dynamic = 'force-dynamic';      // render at request time
export const revalidate = 0;                 // no ISR
export const fetchCache = 'force-no-store';  // no caching

export default function StudioPage() {
    return <NextStudio config={config} />;
}
