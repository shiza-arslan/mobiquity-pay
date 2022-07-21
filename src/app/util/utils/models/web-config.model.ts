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
  };
}
