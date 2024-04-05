import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { makePayment } from '../services/talentApiService';
import { makePaymentToBank } from '../services/clientApiService';
import { makePaymentToPlan } from '../services/commonApiService';

const useStripePayment = () => {
    console.log()
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const handlePayment = async (id: string,) => {
        try {
            setLoading(true);
            const stripe = await loadStripe("pk_test_51OoPKwSErGknJRsEdI0czOQw3S3KCHWzp9wW1k7DvssxEw14hbO68x19sz1elAeKcpEevg3PEbjlLLsnqPXuEHbA00exB43qKm");
            const session = await makePayment(id);
            const result = await stripe?.redirectToCheckout({
                sessionId: session.data.id
            });
            if (result) {
                localStorage.setItem("payemnt", result)
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    const paymentToTalent = async (talentId: string, amount: number) => {
        try {
            setLoading(true);
            const stripe = await loadStripe("pk_test_51OoPKwSErGknJRsEdI0czOQw3S3KCHWzp9wW1k7DvssxEw14hbO68x19sz1elAeKcpEevg3PEbjlLLsnqPXuEHbA00exB43qKm");
            const session = await makePaymentToBank(talentId, amount);
            const result = await stripe?.redirectToCheckout({
                sessionId: session.data?.data
            });
            if(result){
                localStorage.setItem("payemnt", result)
            }
        } catch (error: { message: string }) {
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
            localStorage.setItem("payemnt", JSON.stringify(session))
            const result = await stripe?.redirectToCheckout({
                sessionId: session.data?.data
            });
            console.log(result)
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    return { subscriptionPayment, handlePayment, paymentToTalent, loading, error };
};

export default useStripePayment;
