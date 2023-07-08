import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

export default function ApiData() {
    const [apiList, setApiList] = useState('');
    const location = useLocation();
    async function urlList() {
        const res = await axios.get("https://api.ongsho.com/api/testapi" + location.pathname).then(function (res) {
            // console.log(res);
            setApiList(res.data);
            return res.data;
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
        urlList();
    }, []);


    if (apiList != '') {
        return (
            <code>{JSON.parse(apiList)}</code>
        )
    }

}
