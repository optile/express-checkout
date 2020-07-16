import queryString from "query-string";

/**
 * Fetch Data using fetch and format the response
 * @param {String} url
 * @param {Object} options
 * @returns {Promise}
 */
export const fetchData = async (url, options) => {
    try {
        const fetchResult = await fetch(url, options);
        const data = await handleResponse(fetchResult);
        return {
            response: {
                ok: true,
            },
            data,
        };
    } catch (error) {
        return {
            response: {
                ok: false,
            },
            error: {
                message: error.message,
                status: error.status,
                statusText: error.statusText,
            },
        };
    }
};

/**
 * Handle JSON Response
 * @param {Object} response
 * @returns {Promise.reject} includes message as json
 */
async function handleJSONResponse(response) {
    return response.json().then((json) => {
        if (response.ok) {
            return json;
        }
        return Promise.reject({
            message: json,
            status: response.status,
            statusText: response.statusText,
        });
    });
}

/**
 * Handle Text Response
 * @param {Object} response
 * @returns {Promise.reject} includes message as text
 */
function handleTextResponse(response) {
    return response.text().then((text) => {
        if (response.ok) {
            return text;
        }
        return Promise.reject({
            message: text,
            status: response.status,
            statusText: response.statusText,
        });
    });
}

/**
 * Handle Response
 * @param {Object} response
 * @returns {Promise.reject} includes message by type OR {Error}
 */
function handleResponse(response) {
    const contentType = response.headers.get("content-type");
    if (
        contentType?.includes("application/json") ||
        contentType?.includes("application/vnd.optile.payment.enterprise-v1-extensible+json;charset=UTF-8")
    ) {
        return handleJSONResponse(response);
    }
    if (contentType?.includes("text/plain") || contentType?.includes("text/html")) {
        return handleTextResponse(response);
    }
    throw new Error(`Sorry, content-type ${contentType} not supported`);
}

/**
 * Send Data
 * @param {Object} params
 * @param {String} params.url
 * @param {String} params.method
 * @param {Object} params.body
 * @returns {Promise}
 */
export const sendData = ({ url, method, body, headers }) =>
    fetchData(url, {
        method,
        mode: "cors",
        cache: "default",
        redirect: "follow",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...headers,
        },
        body: body ? JSON.stringify(body) : null,
    });

/**
 * Send Data With Params
 * pass querystring to url for fetch
 * @param {Object} params
 * @param {String} params.baseURL
 * @param {String} params.method
 * @param {Object} params.params
 * @param {Object} params.body
 * @returns {Promise}
 */
export const sendDataWithParams = ({ baseURL, method, params, body }) => {
    const { url, query } = queryString.parseUrl(baseURL);
    const newQueryString = queryString.stringify({ ...query, ...params });
    const newURL = newQueryString ? `${url}?${newQueryString}` : url;
    return fetchData(newURL, {
        method,
        mode: "cors",
        cache: "default",
        redirect: "follow",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: body ? JSON.stringify(body) : null,
    });
};
