//TODO: refactor this code, it is taken from old project
// import { codes } from '../config/const';
// import { onAbort, onReload, onRetry } from './customFunctions';

const objectToParams = data => Object.entries(data).map(([name, value]) => ({ name, value }));

export const toRequestData = (providerCode, data) => ({ providerCode, parameters: objectToParams(data) });

export const getRedirectUrl = (url, parameters) => {
  const queryString = parameters.reduce((acc, current) =>
    `${acc}${encodeURIComponent(current.name)}=${encodeURIComponent(current.value)}&`, '');
  return `${url}${url.includes('?') ? '&' : '?'}${queryString.slice(0, -1)}`;
};

// export const interactionCodeHandler = (code, preset, step, dispatch) => {
//   switch (code) {
//     case codes.ABORT:
//       onAbort(preset, step, dispatch);
//       break;

//     case codes.TRY_OTHER_NETWORK:
//       onReload(preset, step, dispatch);
//       break;

//     case codes.TRY_OTHER_ACCOUNT:
//       onRetry(preset, step, dispatch);
//       break;

//     case codes.RETRY:
//       onRetry(preset, step, dispatch);
//       break;

//     case codes.RELOAD:
//       onReload(preset, step, dispatch);
//       break;

//     default:
//       throw new Error(`Unknown interaction code: ${code}`);
//   }
// };

export const errorPreset = (err, network) => {
  const message = err.message ? err.message : 'Payment canceled';
  const preset = {
    'resultInfo': message,
    'interaction': {
      'reason': 'CLIENTSIDE_EXCEPTION',
    },
    'error': err,
    'network': network,
  };
  return preset;
};
