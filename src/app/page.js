"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { redirect } from 'next/dist/server/api-utils';
import { URLSearchParams } from 'url';
import { getURL } from 'next/dist/shared/lib/utils';
import { useParams } from 'next/navigation';
import { parseUrl } from 'next/dist/shared/lib/router/utils/parse-url';

function App() {
    const [url, setUrl] = useState('');
    let encoded;
    

    

    const handleSubmit = (event) => {
        event.preventDefault();
        
        try{
        encoded = btoa(url);
        console.log("encoded" , encoded);
        console.log("berader", encoded);
        
            
            
            
        }

        catch(error) {
            console.error(error);
            setLoading(false);
        };
    };
    
    

    const helloworld = (()=> {
    const encoded = btoa(url);
    console.log("encoded" , encoded);
    window.location.href= "http://localhost:3000/thread/" +encoded;
    
    })

    return (
        <div className='m-20'>
            <h1>Media Downloader</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Enter URL" />
                <button type="submit" onClick={helloworld}>Search</button>
            </form>
            
            
            
            
            
        </div>
    );
}

export default App;