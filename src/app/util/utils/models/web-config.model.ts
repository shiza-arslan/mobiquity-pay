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
  };
}
