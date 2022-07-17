export const apiEndPoints = {
  //login end points
  login: {
    loginUrl: 'mobiquity-pay/ums/v3/user/auth/web/login',
    verifyOTPUrl: 'mobiquity-pay/v1/otp/validate',
    validateOTPVIAFPUrl: 'mobiquity-pay/v2/ums/user/auth/self-set-auth/validate-otp',
    loginConfirmUrl: 'mobiquity-pay/ums/v3/user/auth/web/login-confirm',
    generateOtp: 'mobiquity-pay/v2/otp/generate',
    authorizationProfileUrl: 'mobiquity-pay/v1/authorization-profile',
    securityProfileUrl: 'mobiquity-pay/v1/security-profile',
    selfAccountUrl: 'mobiquity-pay/v1/user/self/account',
    walletBallanceUrl: 'mobiquity-pay/ums/v1/user/wallet/balance',
    changePinUrl: 'mobiquity-pay/ums/v2/user/auth/change-credential',
    resetPinUrl: 'mobiquity-pay/v2/ums/user/auth/self-set-auth/confirm',
    forgotPinUrl: 'mobiquity-pay/v2/ums/user/auth/self-set-auth/initiate',
    generateBearerUrl: 'mobiquity-pay/oauth/token',
    resendOTPUrl: 'mobiquity-pay/v1/otp/resend',
  },
  //Pre Login
  preLogin: {
    preLoginUrl: '/preLogin/',
  },
  //Signup
  Signup: {
    getsignupformData :'categoryProfile/',
    selfRegistration   : 'mobiquitypay/self-registration/data/',
    generateBearer:'mobiquitypay/oauth/token',
    validateReferralCode:`/mobiquitypay/v1/referral/referrer-user`,
    registerUser: `mobiquitypay/v1/ums/user/self`

  },
};
