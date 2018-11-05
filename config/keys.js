import config from 'config';

export const dbURI = config.get('dbURI');

export const stripeKey = config.get('stripeKey');

export const jwtSecret = config.get('jwtSecret');

export const twilioSID = config.get('twilioSID');

export const twilioToken = config.get('twilioToken');

export const twilioNumber = +config.get('twilioNumber');

export const mailjetKey = config.get('mailjetKey');

export const mailjetSecret = config.get('mailjetSecret');
