import '@shopify/shopify-api/adapters/node';
import FULFILLMENT_RESPONSE from './fulfillment-order-response.json' with {type: 'json'};
import 'dotenv/config';

// data from webhook
// fulfillment order id in URL
const fulfillmentData = FULFILLMENT_RESPONSE;
// split fulfillment order id
const fulfillmentOrderId = fulfillmentData.fulfillment_order.id.split('/').pop();

// to get fulfillment order information for a specific ID
// DOCS: https://shopify.dev/docs/api/admin-rest/2024-07/resources/fulfillmentorder#get-fulfillment-orders-fulfillment-order-id
const response = await fetch('https://{my-shopify-store}.myshopify.com/admin/api/2024-07/fulfillment_orders/' + fulfillmentOrderId + '.json', {
    method: 'GET',
    headers: {
        'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN,
    },
})
const fulfillmentOrder = await response.json();

// here you should have the destination information for shipping
console.log(fulfillmentOrder);

// create a fulfillment for a fulfillment order
// DOCS: https://shopify.dev/docs/api/admin-rest/2024-07/resources/fulfillment#post-fulfillments
const response2 = await fetch('https://dev-free-item-function.myshopify.com/admin/api/2024-07/fulfillments.json', {
    method: 'POST',
    headers: {
        'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        "fulfillment": {
            "line_items_by_fulfillment_order": [
                {
                    "fulfillment_order_id": fulfillmentOrderId,
                }
            ],
            "tracking_info": {
                "number": process.env.TEST_TRACKING_NUMBER
            },
        },
    }),
})

// it's also possible to create a fulfillment for specific items
// in the fulfillment order
// DOCS: https://shopify.dev/docs/apps/build/orders-fulfillment/fulfillment-service-apps/build-for-fulfillment-services#step-4-create-fulfillments



const fulfillment = await response2.json();
console.log(fulfillment);
