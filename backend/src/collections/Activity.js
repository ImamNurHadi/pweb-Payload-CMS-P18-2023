/** @type {import('payload/types').CollectionConfig} */
const Activity = {
    slug: 'activity',
    access: {
      read: () => true,
      create: () => true,
    },
    fields: [
      {
        name: 'priority',
        type: 'relationship',
        relationTo: 'priority',
        required: true,
      },
      {
        name: 'timestamp',
        type: 'date',
        required: true,
      },
    ],
  };
  
  export default Activity;
  
  