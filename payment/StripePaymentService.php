<?php

namespace App\Services\System;

use App\Models\MShop;
use App\Models\TStripeCustomer;
use Exception;
use Illuminate\Support\Facades\Log;
use Stripe\Customer;
use Stripe\Invoice;
use Stripe\InvoiceItem;
use Stripe\PaymentIntent;
use Stripe\PaymentMethod;
use Stripe\Price;
use Stripe\Product;

class PaymentService
{
    public function createBilling(MShop $shop, TStripeCustomer $tStripeCustomer, array $bill, array $billingDetails)
    {
        if ($tStripeCustomer->payment_method === TStripeCustomer::CARD_PAYMENT_METHOD) {
            return $this->createCardBilling($shop, $tStripeCustomer, $bill);
        }

        if ($tStripeCustomer->payment_method === TStripeCustomer::INVOICE_PAYMENT_METHOD) {
            return $this->createInvoiceBilling($shop, $tStripeCustomer, $billingDetails);
        }
    }

    protected function createCardBilling(
        MShop $shop,
        TStripeCustomer $tStripeCustomer,
        array $bill
    ) {
        try {
            $customer = Customer::retrieve($tStripeCustomer->stripe_customer_id, []);
            $paymentMethodRes = PaymentMethod::all([
                'customer' => $tStripeCustomer->stripe_customer_id,
                'type' => config('stripe.paymentMethods.card'),
            ]);
            if ($paymentMethodRes && $paymentMethodRes['data'] && count($paymentMethodRes['data'][0])) {
                $paymentMethodId = $paymentMethodRes['data'][0]->id;

                $paymentIntent = PaymentIntent::create([
                    'amount' => $bill['price'],
                    'currency' => config('stripe.currency'),
                    'customer' => $customer->id,
                    'payment_method' => $paymentMethodId,
                    'off_session' => true,
                    'confirm' => true,
                    'metadata' => [
                        'email' => $shop->email,
                        'm_shop_hash_id' => $shop->hash_id,
                        'shop_id' => $shop->id,
                    ],
                ], []);
                Log::info('[Payment][Calculate shop usage cost]Create payment intent for shopId: ' . $shop->id);

                return $paymentIntent;
            }

            return false;
        } catch (Exception $exception) {
            Log::info('[Payment][Calculate shop usage cost][Payment Intent][Error]' . $exception->getMessage());

            return false;
        }
    }

    protected function createInvoiceBilling(
        MShop $shop,
        TStripeCustomer $tStripeCustomer,
        array $billingDetails
    ) {
        try {
            $customer = Customer::retrieve($tStripeCustomer->stripe_customer_id, []);

            // Create invoice items
            foreach ($billingDetails as $billingDetail) {
                $stripeProduct = Product::create([
                    'name' => $billingDetail['name'],
                    'description' => $billingDetail['description'],
                ]);
                $stripePrice = Price::create([
                    'product' => $stripeProduct->id,
                    'unit_amount' => (int) $billingDetail['price'],
                    'currency' => config('stripe.currency'),
                ]);
                InvoiceItem::create([
                    'customer' => $customer->id,
                    'price' => $stripePrice->id,
                ]);
            }

            $stripeInvoice = Invoice::create([
                'customer' => $customer->id,
                'collection_method' => config('stripe.invoice.collection_method'),
                'days_until_due' => config('stripe.invoice.days_until_due'),
                'metadata' => [
                    'email' => $shop->email,
                    'm_shop_hash_id' => $shop->hash_id,
                    'shop_id' => $shop->id,
                ]
            ]);
            $stripeInvoice->finalizeInvoice();
            $stripeInvoice->sendInvoice();
            Log::info('[Payment][Calculate shop usage cost]Create invoice for shopId: ' . $shop->id);

            return $stripeInvoice;
        } catch (Exception $exception) {
            Log::info('[Payment][Calculate shop usage cost][Invoice][Error]' . $exception->getMessage());

            return false;
        }
    }
}