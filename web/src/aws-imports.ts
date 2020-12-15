import Amplify from 'aws-amplify'
import config from './aws-exports'

export const AWSConfig = {
  ...config
}

export const configure = () => Amplify.configure(AWSConfig)
