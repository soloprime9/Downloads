"use client";
import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [filename, setFilename] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        axios.post('http://localhost:4000/search', { url: url })
        .then(response => {
            setTitle(response.data.title);
            setImageUrl(response.data.imageUrl);
            setFilename(response.data.filename);
            setLoading(false);
        })
        .catch(error => {
            console.error(error);
            setLoading(false);
        });
    };

    return (
        <div className='m-20'>
            <h1>Media Downloader</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Enter URL" />
                <button type="submit">Search</button>
            </form>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <h2>{title}</h2>
                    
                    <img src={imageUrl || null} alt={title} className='w-40  h-60 rounded-sm border-2 shadow-md border-black shadow-yellow-900 m-10' />
                   
                    <a href={`http://localhost:4000/download/${filename}`} download={filename}>
                        Download
                    </a>
                </div>
            )}
        </div>
    );
}

export default App;