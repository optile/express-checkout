import Products from "./Products";
import Summary from "./Summary";
import Thankyou from "./Thankyou";

window.addEventListener("message", event => {
    if (JSON.parse(event?.data)?.__postRobot__?.data?.name === "onError") {
        const interval = setInterval(() => {
            const element = document.getElementById("react-refresh-overlay");
            if (element) {
                clearInterval(interval);
                element.remove();
            }
        }, 0);
    }
});

export { Products, Summary, Thankyou };
