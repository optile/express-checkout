/**
 * checks for the message which triggers the error overlay
 * and removes that overlay from dom
 */
export const disableErrorOverlay = () => {
    window.addEventListener("message", event => {
        const data = getData(event?.data);
        if (data?.__postRobot__?.data?.name === "onError") {
            const interval = setInterval(() => {
                const element = document.getElementById("react-refresh-overlay");
                if (element) {
                    clearInterval(interval);
                    element.remove();
                }
            }, 0);
        }
    });
}

/**
 * Parse the data into JSON format, if it is in string else
 * it returns the same data
 * @param {String} data the data is supposed to be stringified format
 * of the event.data
 * @returns {Object} JSON format of the data
 */
const getData = (data) => {
    try {
        return JSON.parse(data);
    } catch (error) {
        return data;
    }
}

