export const environment = {
  production: true,
  endpoint: "app/api/endpoint",
  cognito: {
    poolId: "aws-identity-pool-id",
    accountId: "aws-account-id",
    clientId: "aws-client-id",
    region: "aws-region",
    url: "hosted-cognito-url/login",
    api: "cognito-oauth-url/oauth2",
  }
};