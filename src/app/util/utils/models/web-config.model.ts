export interface WebConfig {
  screenSettings: {
    NavigationConfig: {
      Navigation: {
        icon: string;
        label1: string;
        label2: string;
      }[];
    };
    AuthConfig: {
      refreshTokenBrforeExpiry: number;
    };
    profileDetails: {
      authProfile: string;
      marketingProfile: string;
      regulatoryProfile: string;
      securityProfile: string;
    };
    inActivityPrams: {
      inactivitySpan: number;
      inactivityPopupspan: number;
    };
    validations: {
      maxLengthUser: number;
      maxLengthPIN: number;
    };
    languages: [];
    constants: {
      bearerCode: string;
      language: string;
      workspaceId: string;
      identifierType: string;
      otpServiceCode: string;
      identifierValue: string;
      authenticationValue: string;
      isTokenRequired: string;
      requestedBy: string;
      deviceInfo: {
        appName: string;
        appVersion: string;
        deviceId: string;
        browser: string;
        isPublicDevice: string;
        appIdentifier: string;
        latitude: string;
        longitude: string;
        mac: string;
        model: string;
        networkOperator: string;
        networkType: string;
        os: string;
        providerIpAddress: string;
      };
      workspaceInformation: {
        categoryCode: string;
        workspace: string;
        categoryName: string;
      };
    };
  };
}
