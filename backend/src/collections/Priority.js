import payload from 'payload';

/** @type {import('payload/types').CollectionConfig} */
const Priority = {
  slug: 'priority',
  admin: {
    useAsTitle: 'name'
  },
  access: {
    read: () => true,
    update: () => true,
    delete: () => true,
    create: () => true,
  },

  hooks: {
    afterOperation: [
      async (args) => {
        console.dir(args.operation);
        if (args.operation === "create") {
          await payload.create({
            collection: "Logs",
            data: {
              name: args.result.name,
              log: args.result.id,
              timestamp: new Date(),
              action: "Created",
            },
          });
        } else if (args.operation === "deleteByID") {
          await payload.create({
            collection: "Logs",
            data: {
              name: args.result.name,
              log: args.result.id,
              timestamp: new Date(),
              action: "Deleted",
            },
          });
        } else if (args.operation === "updateByID") {
          await payload.create({
            collection: "Logs",
            data: {
              name: args.result.name,
              log: args.result.id,
              timestamp: new Date(),
              action: "Edited",
            },
          });
        }
      },
    ],
  },

  fields: [
    {
      name: 'name',
      label: 'Title',
      type: 'text',
      required: true,
    },
  ],
};

export default Priority;
  




  
  
