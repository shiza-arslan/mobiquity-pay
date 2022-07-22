import { WebConfig } from '../utils/models/web-config.model';

export const getWebConfig = (): WebConfig => {
  return window['config' as any] as unknown as WebConfig;
};
export const environment = {};
