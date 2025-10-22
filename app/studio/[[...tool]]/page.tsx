'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity.config';

export default function StudioPage() {
    return <NextStudio config={config} />;
}

// IMPORTANT: must be a number or false
export const revalidate = false;
export const dynamic = 'force-dynamic';
