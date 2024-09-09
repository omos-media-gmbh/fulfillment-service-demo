import express from 'express';
import '@shopify/shopify-api/adapters/node';
import 'dotenv/config';

// example how to use a fulfillment service

// first you would need to run the addFulfillmentService.sh script to push a new fulfillment service

const app = express();

// for the registered fulfillment service we need to create a webhook
// for the route where Shopify pushes the fulfillment order information
// DOCS: https://shopify.dev/docs/apps/build/orders-fulfillment/fulfillment-service-apps/build-for-fulfillment-services#step-2-receive-fulfillment-requests-and-cancellations
app.get('/fulfillment_order_notification', async (req, res) => {
    // get information about the kind of request
    // like fulfillment_request
    const kind = req.body.kind;
    console.log(kind);

    // get fulfillment orders for a specific location
    //  id of the registered fulfillment service
    // DOCS: https://shopify.dev/docs/apps/build/orders-fulfillment/fulfillment-service-apps/build-for-fulfillment-services#step-3-act-on-fulfillment-requests
    const fulfillmentOrdersRes = await fetch('https://{my-shopify-store}.myshopify.com/admin/api/2024-07/assigned_fulfillment_orders.json?assignment_status=fulfillment_requested&location_ids[]={locationId}', {
        method: 'GET',
        headers: {
            'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN,
        },
    })
    const fulfillmentOrders = await fulfillmentOrdersRes.json();

    console.log(fulfillmentOrders);
});

app.listen(3000);