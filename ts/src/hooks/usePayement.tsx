/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { makePayment } from '../services/talentApiService';
import { makePaymentToBank } from '../services/clientApiService';
import { makePaymentToPlan } from '../services/commonApiService';


const useStripePayment = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const handlePayment = async (id: string,) => {
        try {
            setLoading(true);
            const stripe = await loadStripe("pk_test_51OoPKwSErGknJRsEdI0czOQw3S3KCHWzp9wW1k7DvssxEw14hbO68x19sz1elAeKcpEevg3PEbjlLLsnqPXuEHbA00exB43qKm");
            let result
            makePayment(id)
                .then(async (res) => {
                    result = await stripe?.redirectToCheckout({
                        sessionId: res.data.id
                    });
                })
                console.log(result)
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        const paymentToTalent = async (talentId: string, amount: number) => {
            try {
                setLoading(true);
                    const stripe = await loadStripe("pk_test_51OoPKwSErGknJRsEdI0czOQw3S3KCHWzp9wW1k7DvssxEw14hbO68x19sz1elAeKcpEevg3PEbjlLLsnqPXuEHbA00exB43qKm");
                    let result
                    makePaymentToBank(talentId, amount)
                    .then(async (res) => {
                        result = await stripe?.redirectToCheckout({
                            sessionId: res.data?.data
                        });
                        return "ok"
                    })
                    console.log(result)
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    const subscriptionPayment = async (role: string, planId: string, amount: number) => {
        try {
            setLoading(true);
            const stripe = await loadStripe("pk_test_51OoPKwSErGknJRsEdI0czOQw3S3KCHWzp9wW1k7DvssxEw14hbO68x19sz1elAeKcpEevg3PEbjlLLsnqPXuEHbA00exB43qKm");
            const session = await makePaymentToPlan(role, planId, amount);
            await stripe?.redirectToCheckout({
                sessionId: session.data?.data
            });
        } catch (error: any) {
            setError(error.message as string);
        } finally {
            setLoading(false);
        }
    };
    return { subscriptionPayment, handlePayment, paymentToTalent, loading, error };
};

export default useStripePayment;
