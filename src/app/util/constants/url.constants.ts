export const apiEndPoints = {
  //login end points
  login: {
    loginUrl: 'mobiquitypay/ums/v3/user/auth/web/login',
    verifyOTPUrl: 'mobiquitypay/v1/otp/validate',
    validateOTPVIAFPUrl: 'mobiquitypay/v2/ums/user/auth/self-set-auth/validate-otp',
    loginConfirmUrl: 'mobiquitypay/ums/v3/user/auth/web/login-confirm',
    generateOtp: 'mobiquitypay/v2/otp/generate',
    authorizationProfileUrl: 'mobiquitypay/v1/authorization-profile',
    securityProfileUrl: 'mobiquitypay/v1/security-profile',
    selfAccountUrl: 'mobiquitypay/v1/user/self/account',
    walletBallanceUrl: 'mobiquitypay/ums/v1/user/wallet/balance',
    changePinUrl: 'mobiquitypay/ums/v2/user/auth/change-credential',
    resetPinUrl: 'mobiquitypay/v2/ums/user/auth/self-set-auth/confirm',
    forgotPinUrl: 'mobiquitypay/v2/ums/user/auth/self-set-auth/initiate',
    generateBearerUrl: 'mobiquitypay/oauth/token',
    resendOTPUrl: 'mobiquitypay/v1/otp/resend',
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
