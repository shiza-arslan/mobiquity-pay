export class EpConfig {
  public static getControllerUrl(controllerName: string, actionName?: string) {
    return this.getApiUrl() + '/' + controllerName + (actionName ? '/' + actionName : '');
  }
  public static getApiUrl() {
    return this.getServerUrl() + '/api';
  }
  public static getServerUrl() {
    return 'http://125.16.139.20:8076/';
    //return  'http://mobiquity-payconsumer.unosolindia.mockable.io/';
  }

  public static getMockUrl() {
    return 'http://mobiquityconsumer.unosolindia.mockable.io/';
  }

  public static getDemoServerUrl() {
    //return  'http://125.16.139.20:8076/';
    return 'https://demo9362630.mockable.io/';
  }
}
