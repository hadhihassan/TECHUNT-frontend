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
            if (!process.env.STRIP_PUBLISHABLE_KEY) {
                throw new Error('STRIP_PUBLISHABLE_KEY is not defined in the environment variables.');
            }
            const stripe = await loadStripe(process.env.STRIP_PUBLISHABLE_KEY);
            const session = await makePayment(id);
            const result = await stripe?.redirectToCheckout({
                sessionId: session.data.id
            });
            if (result) {
                localStorage.setItem("payemnt", JSON.stringify(result))
            }
        } catch (error:any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    const paymentToTalent = async (talentId: string, amount: number) => {
        try {
            setLoading(true);
            if (!process.env.STRIP_PUBLISHABLE_KEY) {
                throw new Error('STRIP_PUBLISHABLE_KEY is not defined in the environment variables.');
            }
            const stripe = await loadStripe(process.env.STRIP_PUBLISHABLE_KEY);
            const session = await makePaymentToBank(talentId, amount);
            const result = await stripe?.redirectToCheckout({
                sessionId: session.data?.data
            });
            if (result) {
                localStorage.setItem("payemnt", JSON.stringify(result))
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    const subscriptionPayment = async (role: string, planId: string, amount: number) => {
        try {
            setLoading(true);
            if (!process.env.STRIP_PUBLISHABLE_KEY) {
                throw new Error('STRIP_PUBLISHABLE_KEY is not defined in the environment variables.');
            }
            const stripe = await loadStripe(process.env.STRIP_PUBLISHABLE_KEY);
            const session = await makePaymentToPlan(role, planId, amount);
            localStorage.setItem("payemnt", JSON.stringify(session))
            await stripe?.redirectToCheckout({
                sessionId: session.data?.data
            });
        } catch (error:any) {
            setError(error.message as string);
        } finally {
            setLoading(false);
        }
    };
    return { subscriptionPayment, handlePayment, paymentToTalent, loading, error };
};

export default useStripePayment;
