import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function ApiList() {
    const [apiList, setApiList] = useState('');

    async function urlList() {
        const res = await axios.get("https://api.ongsho.com/api/testapi/url-list").then(function (res) {
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
        const list = apiList.map(item => <li key={item.id}><a href={item.url}>{item.url}</a></li>)
        return (
            <ul>
                {list}
            </ul>
        )
    }

}
