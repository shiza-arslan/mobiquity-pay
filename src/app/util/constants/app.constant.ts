import { WebConfig } from '../utils/models/web-config.model';

export const getWebConfig = (): WebConfig => {
  return window['config' as any] as unknown as WebConfig;
};
export const environment = {
  constants: {
    bearerCode: 'WEB',
    language: 'en',
    workspaceId: 'SUBSCRIBER',
    identifierType: 'MSISDN',
    otpServiceCode: 'SUBREG',
    identifierValue: '',
    authenticationValue: '0000',
    isTokenRequired: 'Y',
    requestedBy: 'SELF',
    deviceInfo: {
      appName: 'mobilePay',
      appVersion: 10.2,
      deviceId: '8c9397df59ebe355003cd5729b6e8a20',
      browser: '',
      isPublicDevice: 'N',
      appIdentifier: 'com.comviva.mobiquity-pay.consumer.DEV',
      latitude: '',
      longitude: '',
      mac: '',
      model: '',
      networkOperator: '',
      networkType: '',
      os: '',
      providerIpAddress: '115.99.200.37',
    },
    profileDetails: {
      authProfile: 'SubsDefault',
      marketingProfile: 'SUBSDefaultMP',
      regulatoryProfile: 'FULL_KYC',
      securityProfile: 'SP.100011',
    },
    workspaceInformation: {
      categoryCode: 'SUBS',
      workspace: 'SUBSCRIBER',
      categoryName: 'Subscriber',
    },
  },
};
