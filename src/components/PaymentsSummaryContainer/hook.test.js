/*
 * Copyright (c) 2019 Payoneer Germany GmbH. All rights reserved.
 */

import { fetchPresetAccount, onError } from "./hook";

describe("Fetch Preset Account", () => {
    let actions = [];
    const dispatch = action => actions.push(action);
    const functionAttrs = { dispatch, customFunctions: {}, baseURL: "http://baseUrl.com/", longId: "123456789"};
    const dummyData = {
        links: {
            confirm: 'https://api.integration.oscato.com/pci/v1/presets/5e29b899cf5ace17876af869entquahle3bot8eq6bdfj22hq0/confirm',
            self: 'https://api.integration.oscato.com/pci/v1/presets/5e29b899cf5ace17876af869entquahle3bot8eq6bdfj22hq0'
          },
          resultInfo: 'Pending; waiting for customer review and approval of payment details',
          interaction: {
            code: 'PROCEED',
            reason: 'TAKE_ACTION'
          },
          redirect: {
            url: 'http://localhost:3000?env=local&mode=Summary',
            method: 'GET',
            parameters: [
              {
                name: 'shortId',
                value: '09690-11153'
              },
              {
                name: 'interactionReason',
                value: 'TAKE_ACTION'
              },
              {
                name: 'resultCode',
                value: '00007.PAYPAL.000'
              },
              {
                name: 'longId',
                value: '5e29b899cf5ace17876af869entquahle3bot8eq6bdfj22hq0'
              },
              {
                name: 'transactionId',
                value: 'tr-1579792535895'
              },
              {
                name: 'interactionCode',
                value: 'PROCEED'
              },
              {
                name: 'amount',
                value: '2'
              },
              {
                name: 'reference',
                value: 'Payment #1'
              },
              {
                name: 'currency',
                value: 'EUR'
              }
            ],
            type: 'SUMMARY'
          },
          network: 'PAYPAL'
    }
    fetch.resetMocks();
    fetch.mockResponse(JSON.stringify(dummyData), { headers: { "content-type": "application/json" } });
    fetchPresetAccount(functionAttrs);

    it("adds a loading state", () => {
        expect(actions[0].type).toBe("PRESETACCOUNTLOADING");
        expect(actions[0].payload).toBeTruthy();
    });

    it("has added the Preset Account", () => {
        expect(actions[1].type).toBe("PRESETACCOUNT");
        expect(actions[1].payload).toEqual(dummyData);
    });

    it("remove a loading state", () => {
        expect(actions[2].type).toBe("PRESETACCOUNTLOADING");
        expect(actions[2].payload).toBeFalsy();
    });
});

describe("onError", () => {
    
    let actions = [];
    const err = {message: "Error here"}
    const dispatch = action => actions.push(action);
    const functionAttrs = { err, dispatch, customFunctions: {}};
    onError(functionAttrs);

    it("put error", () => {
        expect(actions[0].type).toBe("PRESETACCOUNTERROR");
    });

    it("remove a loading state", () => {
        expect(actions[1].type).toBe("PRESETACCOUNTLOADING");
        expect(actions[1].payload).toBeFalsy();
    });
    
});
