/** @type {import('payload/types').CollectionConfig} */
const Todo = {
  slug: 'todo',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'priority',
      type: 'relationship',
      relationTo: 'priority',
      required: true,
    },
  ],
};

export default Todo;







