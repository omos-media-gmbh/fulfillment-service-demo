curl -d '{"fulfillment_service":{"name":"{name}","callback_url":"{url}","inventory_management":false,"tracking_support":true,"requires_shipping_method":true,"format":"json","permits_sku_sharing":true}}' \
-X POST "https://{my-shopify-store}.myshopify.com/admin/api/2024-07/fulfillment_services.json" \
-H "X-Shopify-Access-Token: {access_token}" \
-H "Content-Type: application/json"