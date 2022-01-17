Points: What is needed to be checked for simple migration

-   Check that Client-id is passed in contract data in list response for express (check with back end) . bug to be fixed in mmo team to expose attributes that can be exposed ( like client-id for paypal )
-   Use getReturnUrl and getCancelUrl similar to in opg-resource https://github.com/optile/opg-resource/blob/develop/com.oscato.opp.forms/src/main/resources/form/paypal/resources/standard_js.html#L456
-   Use enable funding to specify which button to show (hw to know if pay later or pay now?) . for direct payment (ppv3) pay later is a different payment method ( the decision was driven by ScrewFix KF preference) https://optile.atlassian.net/wiki/spaces/ODS/pages/3094478889/PayPal+Pay+Later But for express checkout we need multi team discussion to decide the best way/architecture for that

What is needed to be done to cover later needed features of paypal smart buttons (paypal v2)

-   Check the need to preset first = false (no summary page) for express checkout as Paypal best practice for services sale is without summary page as no delivery needed. . business level investigation if it is needed
-   Check the need/possibility to use shipping options provided as a feature in Paypal smart buttons . It is in the process of investigation (exposed attribute) https://developer.paypal.com/docs/business/checkout/configure-payments/shipping-options/
-   when payment fail in summary page after confirm button we should find a way to take user back to shop page where they can use different payment method ( like amazon pay ) for example with a solution for single page app and redirect . cancelUrl can lead to try again page, so it plays the role as retry page at the moment, it is in the merchant responsibility to make sure that it si handled correctly. Provide merchant with needed docs of what they need to do and how? auto retry in paypal: Alex needs to explain how we already handle with paypal ( send link to paypal in the flow, try other funding)
