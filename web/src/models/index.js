// @ts-check
import { initSchema } from '@aws-amplify/datastore'
import { schema } from './schema'

const { News, StudentProfile } = initSchema(schema)

export { News, StudentProfile }
