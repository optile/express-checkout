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
export const getAuthorization = () => {
    return `Basic ${btoa(`${window.USER}:${window.TOKEN}`)}`;
};
