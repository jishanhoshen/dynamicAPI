import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

export default function ApiData() {
    const [api, setApi] = useState('');
    const location = useLocation();
    async function dataApi() {
        const res = await axios.get("https://api.ongsho.com/api/testapi" + location.pathname).then(function (res) {
            console.log(res.data);
            setApi(res.data);
            // return res.data;
        })
            .catch(function (error) {
                console.log(error);
                console.log(error.response.data.error.url);
                if (error.response.data.error.url) {
                    setUrlError(true);
                }
            });
    }

    useEffect(() => {
        dataApi();
    }, []);


    if (api != '') {
        return (
            <>
                <a href="/">Home 🏠</a>
                <br />
                <a href={"/edit" + location.pathname}>Edit ✏️</a>
                <br />
                <h2>{location.pathname.slice(1)}</h2>
                <div className='right-side'>
                    <pre><code>{JSON.stringify(api)}</code></pre>
                </div>

            </>
        )
    }

}
