import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway'
import { formatJSONResponse } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'
import { getMicrosoftId } from '@libs/microsoftGraph'
import 'source-map-support/register'
import schema from './schema'

const hello: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async event => {
  return formatJSONResponse({
    message: `Hi, your id is: ${await getMicrosoftId(event.body.token)}`,
    event
  })
}

export const main = middyfy(hello)
