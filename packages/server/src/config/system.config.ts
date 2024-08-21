/**
 * Some default system configurations, such as: login session duration, log cleanup policy, captcha validity period, etc.
 **/
import { SystemConfig } from '../modules/system-config/schemas/system-config.schema';

export const defaultSystemConfig: SystemConfig = {
  loginSessionDuration: 24, // in hours
  captchaValidityPeriod: 300, // in seconds
  systemSenderEmail: 'noreply@example.com', // system email address
};
