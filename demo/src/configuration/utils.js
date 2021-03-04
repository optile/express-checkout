/**
 * converts the parameters array into an object with key as name and value as value
 * @param {Array} parameters list of parameters with name and value
 * @returns {Object} json object with key, which is the "name" value from parameters and 
 * its corresponding value is the "value" from the parameters
 */
export const getValuesFromParameters = (parameters) => parameters.reduce((acc, param) => ({ ...acc, [param.name]: param.value }), {});
