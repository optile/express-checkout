import testHook from "../../test.utils/testHook";
import { useList, fetchList, handleError } from "./hook";

//TODO: Test useList
// jest.mock("react-redux", () => ({
//     useSelector: jest.fn(fn => fn()),
//     useDispatch: () => jest.fn()
//   }));
//   const setup = ({ state }) => {
//     jest.spyOn(state, "totalCost").mockReturnValue(totalCost);
//     jest.spyOn(Actions, "reset");
//   };
// testHook(() => useList({ }));

describe("fetchData", () => {
    let actions = [];
    const dispatch = action => actions.push(action);
    const functionAttrs = { dispatch, customFunctions: {}, baseURL: "http://baseUrl.com/", clientId: 1, country: "DE" };
    const dummyDataApplicable = [
        {
            code: "PAYPAL",
            label: "PayPal",
        },
        {
            code: "AMAZONPAY",
            label: "Amazon Payments",
        },
    ];
    const dummyData = {
        resultInfo: "2 applicable networks are found",
        interaction: { code: "PROCEED", reason: "OK" },
        networks: {
            applicable: dummyDataApplicable,
        },
    };
    fetch.resetMocks();
    fetch.mockResponse(JSON.stringify(dummyData), { headers: { "content-type": "application/json" } });
    fetchList(functionAttrs);

    it("adds a loading state", () => {
        expect(actions[0].type).toBe("LISTLOADING");
        expect(actions[0].payload).toBeTruthy();
    });

    it("has added the list", () => {
        expect(actions[1].type).toBe("STORELIST");
        expect(actions[1].payload).toEqual(dummyDataApplicable);
    });

    it("remove a loading state", () => {
        expect(actions[2].type).toBe("LISTLOADING");
        expect(actions[2].payload).toBeFalsy();
    });
});

describe("handleError", () => {
    
    let actions = [];
    const error = {message: "Error here"}
    const dispatch = action => actions.push(action);
    const functionAttrs = { error, dispatch, customFunctions: {}};
    handleError(functionAttrs);

    it("put error", () => {
        expect(actions[0].type).toBe("LISTERROR");
    });

    it("remove a loading state", () => {
        expect(actions[1].type).toBe("LISTLOADING");
        expect(actions[1].payload).toBeFalsy();
    });
    
});
