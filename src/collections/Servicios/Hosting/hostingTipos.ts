import type { CollectionConfig } from 'payload'

export const hostingTipos: CollectionConfig = {
  slug: 'hostingTipos',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Hosting',
    useAsTitle: 'nombre', // <--- Esto define el título en el panel de admin
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        placeholder: 'Nombre de tipo de Hosting',
      },
    },
    {
      name: 'relatedPlans',
      type: 'join',
      collection: 'hostingPlans',
      on: 'tipo',
    },
  ],
}
