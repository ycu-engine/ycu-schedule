import Amplify from 'aws-amplify'
import AWSConfig from './aws-exports'

export { AWSConfig }

export const configure = () => Amplify.configure(AWSConfig)
