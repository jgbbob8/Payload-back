import type { CollectionConfig } from 'payload'

export const hostingPlans: CollectionConfig = {
  slug: 'hostingPlans',

  access: {
    read: () => true,
  },
  admin: {
    group: 'Hosting',
    useAsTitle: 'plan', // <--- Esto define el título en el panel de admin
    defaultColumns: ['tipo', 'plan', 'precio'], // Columnas visibles por defecto
    description: 'Planes de hosting disponibles',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'tipo',
          type: 'relationship',
          relationTo: 'hostingTipos',
          required: true,
          hasMany: false,
          admin: {
            width: '25%',
          },
        },
        {
          name: 'plan',
          type: 'text',
          required: true,
          unique: true,
          admin: {
            width: '50%',
            placeholder: 'Nombre de plan',
          },
        },
        {
          name: 'precio',
          type: 'number',
          required: true,
          defaultValue: 0, // Valor por defecto (puedes cambiarlo)
          min: 0,
          admin: {
            width: '25%',
            placeholder: 'Precio mensual del plan',
          },
        },
      ],
    },
  ],
}
