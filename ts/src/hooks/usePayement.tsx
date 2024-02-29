import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { makePayment } from '../services/talentApiService';

const useStripePayment = () => {
    console.log()
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handlePayment = async (id:string,) => {
        try {
            setLoading(true);
            const stripe = await loadStripe("pk_test_51OoPKwSErGknJRsEdI0czOQw3S3KCHWzp9wW1k7DvssxEw14hbO68x19sz1elAeKcpEevg3PEbjlLLsnqPXuEHbA00exB43qKm");
            const session = await makePayment(id);
            const result = await stripe?.redirectToCheckout({
                sessionId: session.data.id
            });
            localStorage.setItem("payemnt",result)
            console.log(result,"payment success result ++++")
        } catch (error) {
            console.log(error)
            setError(error.message);
            console.log(error)
        } finally {
            setLoading(false);
        }
    };
    return { handlePayment, loading, error };
};

export default useStripePayment;
