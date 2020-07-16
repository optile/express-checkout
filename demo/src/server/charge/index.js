import { sendData } from "../network";
import { getAuthorization } from "../../utils";

export const charge = async (url) => {
    const response = await sendData({
        url,
        method: "POST",
        body: {},
        headers: {
            Authorization: getAuthorization(),
        },
    });
    return response;
};
