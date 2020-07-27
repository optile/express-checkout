import { fetchData } from "../network";
import { getLongId, getAuthorization } from "../../utils";
import getAttributes from "../../configuration";

const getPresetLink = (longId) => {
    const baseURL = getAttributes()?.configuration?.baseURL;
    return `${baseURL?.replace("pci/v1/express", "api/presets")}/${longId}`;
};

export const getExpressPreset = async (callback, onlyGetExpressPreset) => {
    const longId = getLongId();
	const baseURL = getPresetLink(longId);
	const Authorization = getAuthorization();
	const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization,
        },
    };
    const { response, data } = await fetchData(baseURL, options);
    if (onlyGetExpressPreset) {
        callback({
            address: data?.customerCollectedDetails?.addresses?.shipping,
            network: data?.network,
        });
        return;
    }
	if (response?.ok && data?.links?.charge) {
        callback(data.links.charge);
    } else callback("ERROR");
};
