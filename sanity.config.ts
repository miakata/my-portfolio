// sanity.config.ts
import { defineConfig } from 'sanity'
import { visionTool } from '@sanity/vision'
import { schema } from './sanity/schemaTypes'

// ❌ no structureTool, no structure import

export default defineConfig({
    basePath: '/studio',
    projectId: '3b01vlau',
    dataset: 'production',
    schema,
    plugins: [visionTool({ defaultApiVersion: '2024-08-01' })],
})
