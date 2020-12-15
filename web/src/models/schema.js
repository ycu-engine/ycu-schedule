export const schema = {
  models: {
    News: {
      name: 'News',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: []
        },
        title: {
          name: 'title',
          isArray: false,
          type: 'String',
          isRequired: true,
          attributes: []
        },
        content: {
          name: 'content',
          isArray: false,
          type: 'String',
          isRequired: true,
          attributes: []
        },
        createdAt: {
          name: 'createdAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: true,
          attributes: []
        },
        updatedAt: {
          name: 'updatedAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: true,
          attributes: []
        }
      },
      syncable: true,
      pluralName: 'News',
      attributes: [
        {
          type: 'model',
          properties: {}
        },
        {
          type: 'auth',
          properties: {
            rules: [
              {
                groupClaim: 'cognito:groups',
                provider: 'userPools',
                allow: 'groups',
                groups: ['staff'],
                operations: ['read', 'create', 'update', 'delete']
              },
              {
                allow: 'private',
                operations: ['read']
              },
              {
                allow: 'public',
                operations: ['read']
              }
            ]
          }
        }
      ]
    },
    StudentProfile: {
      name: 'StudentProfile',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: []
        },
        owner: {
          name: 'owner',
          isArray: false,
          type: 'String',
          isRequired: true,
          attributes: []
        },
        weeks: {
          name: 'weeks',
          isArray: true,
          type: 'Int',
          isRequired: false,
          attributes: [],
          isArrayNullable: false
        },
        periods: {
          name: 'periods',
          isArray: true,
          type: 'Int',
          isRequired: false,
          attributes: [],
          isArrayNullable: false
        }
      },
      syncable: true,
      pluralName: 'StudentProfiles',
      attributes: [
        {
          type: 'model',
          properties: {}
        },
        {
          type: 'key',
          properties: {
            fields: ['owner']
          }
        },
        {
          type: 'auth',
          properties: {
            rules: [
              {
                provider: 'userPools',
                ownerField: 'owner',
                allow: 'owner',
                operations: ['read', 'create', 'update'],
                identityClaim: 'cognito:username'
              }
            ]
          }
        }
      ]
    }
  },
  enums: {},
  nonModels: {},
  version: 'c6a07001edcc81d5a836e61f46c39127'
}
