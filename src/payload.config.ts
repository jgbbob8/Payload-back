// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { es } from '@payloadcms/translations/languages/es'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { hostingPlans } from './collections/Servicios/Hosting/hostingPlans'
import { hostingTipos } from './collections/Servicios/Hosting/hostingTipos'
import { precios } from './collections/Servicios/Backups/precios'
import { hostingCaract } from './collections/Servicios/Hosting/hostingCaracteristicas'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    dateFormat: 'dd/MM/yyyy',
  },

  collections: [Users, precios, hostingTipos, hostingPlans, hostingCaract],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  i18n: {
    fallbackLanguage: 'es',
    supportedLanguages: { es },
  },
  // localization: {
  //   locales: ['en', 'es'],
  //   defaultLocale: 'es',
  // },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),

  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
