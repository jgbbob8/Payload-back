import type { CollectionConfig } from 'payload'

export const hostingCaract: CollectionConfig = {
  slug: 'hostingCaract',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Hosting',
    useAsTitle: 'nombre',
    defaultColumns: ['nombre', 'tipo', 'updatedAt'],
  },
  fields: [
    {
      type: 'row',
      unique: true,
      fields: [
        {
          name: 'nombre',
          type: 'text',
          required: true,
          unique: true,
          admin: {
            placeholder: 'Nombre de la característica',
            width: '65%',
          },
        },
        {
          name: 'tipo',
          type: 'relationship',
          relationTo: 'hostingTipos',
          label: 'Tipo de Hosting',
          required: true,
          hasMany: false,
          admin: {
            description: 'Selecciona un tipo para habilitar la asignación de planes',
            width: '35%',
          },
        },
      ],
    },

    {
      name: 'planesConfig',
      type: 'array',
      label: 'Configuración por Plan',
      admin: {
        condition: (data) => !!data?.tipo,
        description: 'Asigna valores específicos para cada plan',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'planRelacionado',
              type: 'relationship',
              relationTo: 'hostingPlans',
              required: true,
              hasMany: false,

              admin: {
                width: '50%',
              },
              filterOptions: ({ data }) => ({
                tipo: { equals: data?.tipo },
              }),
            },
            {
              name: 'valor',
              type: 'text',
              required: true,

              admin: {
                placeholder: 'Ej: 20GB, 100GB, Ilimitado',
                width: '50%',
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data }) => {
        if (data?.planesConfig) {
          const planesAsignados = data.planesConfig.map((item: any) => item.planRelacionado)
          const planesUnicos = [...new Set(planesAsignados)]

          if (planesAsignados.length !== planesUnicos.length) {
            throw new Error('Cada plan solo puede configurarse una vez')
          }
        }
        return data
      },
    ],
  },
}
