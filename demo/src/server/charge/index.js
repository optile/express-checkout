import { sendData } from "../network";
import { getAuthorization } from "../../utils";

export const charge = async (url, callback) => {
    const response = await sendData({
        url,
        method: "POST",
        body: {},
        headers: {
            Authorization: getAuthorization(),
        },
    });
    if (response?.data?.status?.code === "charged") {
        callback("CHARGED");
    } else callback("ERROR");
};
