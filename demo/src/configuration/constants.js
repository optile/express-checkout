/**
 * consists of interaction codes of the magic numbers of paypal
 * these are required to handle these cases separately
 * we add result code, interaction reason and interaction
 * code in the query params, so that QA could test the magic numbers
 */ 
export const magicInteractionCodes = ["TRY_OTHER_ACCOUNT", "TRY_OTHER_NETWORK", "RETRY"];
