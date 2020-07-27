import { MERCHANT } from "../server/constants";

/**
 * This function returns longId from query params
 * @returns {String} longId
 */
export const getLongId = () => {
    let params = new URLSearchParams(window.location.search);
    return params.get("longId");
};

/**
 * This function returns encrypted authorization token
 * @returns {String} authorization
 */
export const getAuthorization = () => `Basic ${btoa(`${MERCHANT.USER}:${MERCHANT.TOKEN}`)}`;