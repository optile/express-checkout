/*
 * Copyright (c) 2019 Payoneer Germany GmbH. All rights reserved.
 */

import { getLongIdFromRedirectUrl, getNetworkList, getPaypalList, getOperationLink, getUpdateLink } from "./actions.redux";

describe("test util function getLongIdFromRedirectUrl", () => {
	it("should return the longId from the url", () => {
		expect(getLongIdFromRedirectUrl("http://baseurl.com/123456789")).toBe("123456789");
	});
});

describe("test util function getNetworkList", () => {
  	it("should return the list from the state", () => {
		const getState = () => ({
			list: {
				data: []
			}
		})
      	expect(getNetworkList(getState).length).toBe(0);
	});
	it("should return null from the state", () => {
		const getState = () => {
			list: {}
		}
    	expect(getNetworkList(getState)).toBe(null);
	});
});

describe("test util function getPaypalList", () => {
	it("should return the element from the state", () => {
		const getState = () => ({
			list: {
				data: [{
					code: 'PAYPAL'
				}]
			}
		})
		const element = getPaypalList(getState);
		expect(element.code).toBe('PAYPAL');
	});
	it("should return null from the state", () => {
		const getState = () => ({
			list: {
				data: [{code: 'GOOGLEPAY'}]
			}
		})
		expect(getPaypalList(getState)).toBe(undefined);
	});
});

describe("test util function getOperationLink", () => {
	it("should return the element from the state", () => {
		const operationLink = "https://www.resources.oscato.com/operation/charge";
		const getState = () => ({
			list: {
				data: [{
					code: 'PAYPAL',
					links: { operation: operationLink }
				}]
			}
		})
		const operation = getOperationLink(getState);
		expect(operation).toBe(operationLink);
	});
	it("should return null from the state", () => {
		const getState = () => ({
			list: {
				data: [{code: 'GOOGLEPAY'}]
			}
		})
		const operation = getOperationLink(getState);
		expect(operation).toBe('');
	});
});

describe("test util function getUpdateLink", () => {
	it("should return the element from the state", () => {
		const selfLink = "https://www.resources.oscato.com/links/self";
		const getState = () => ({
			list: {
				data: [{
					code: 'PAYPAL',
				}]
			},
			paypal: {
				preset: {
					links: { self: selfLink }
				}
			}
		})
		const self = getUpdateLink(getState);
		expect(self).toBe(selfLink);
	});
	it("should return null from the state", () => {
		const getState = () => ({
			list: {
				data: [{code: 'GOOGLEPAY'}]
			}
		})
		const self = getUpdateLink(getState);
		expect(self).toBe('');
	});
});
