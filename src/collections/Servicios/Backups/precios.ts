import type { CollectionConfig } from 'payload'

export const precios: CollectionConfig = {
  slug: 'Precios',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Copias Cloud',
    useAsTitle: 'Capacidad', // <--- Esto define el título en el panel de admin
  },
  fields: [
    {
      name: 'Capacidad',
      type: 'text',
      required: true,
    },
    {
      name: 'Precio',
      type: 'group',

      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'mensual',
              type: 'number',
              required: true,
              admin: {
                width: '20%',
              },
            },
            {
              name: 'anual',
              type: 'number',
              required: true,
              admin: {
                width: '20%',
              },
            },
          ],
        },
      ],
    },
  ],
}
