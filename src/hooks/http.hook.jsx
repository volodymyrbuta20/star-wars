import { useState } from "react";

const useHttp = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {

        try {
            setLoading(true);
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            return await response.json();

        } catch (e) {
            setError(e.message);
            throw(e)
        } finally {
            setLoading(false)
        }

    }

    return {loading, error, request}

}

export default useHttp;