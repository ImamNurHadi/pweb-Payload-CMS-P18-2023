/** @type {import('payload/types').CollectionConfig} */
const Priority = {
    slug: 'priority',
    admin: {
      useAsTitle: 'name',
    },
    access: {
      read: () => true,
    },
    fields: [
      {
        name: 'name',
        type: 'text',
        required: true,
      },
    ],
  };
  
  export default Priority;
  




  
  
