import { CognitoUserPool } from 'amazon-cognito-identity-js'

const poolData = {
  UserPoolId: 'eu-west-2_CAY9DUhIn',
  ClientId: '31c6hbesb1udii0umomvo9pn9k',
}

export default new CognitoUserPool(poolData)
