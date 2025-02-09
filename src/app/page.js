"use client";
// import React, { useState } from 'react';
// import axios from 'axios';
// import { redirect } from 'next/dist/server/api-utils';
// import { URLSearchParams } from 'url';
// import { getURL } from 'next/dist/shared/lib/utils';
// import { useParams } from 'next/navigation';
// import { parseUrl } from 'next/dist/shared/lib/router/utils/parse-url';

// function App() {
//     const [url, setUrl] = useState('');
//     let encoded;
    

    

//     const handleSubmit = (event) => {
//         event.preventDefault();
        
//         try{
//         encoded = btoa(url);
//         console.log("encoded" , encoded);
//         console.log("berader", encoded);
        
            
            
            
//         }

//         catch(error) {
//             console.error(error);
//             setLoading(false);
//         };
//     };
    
    

//     const helloworld = (()=> {
//     const encoded = btoa(url);
//     console.log("encoded" , encoded);
//     window.location.href= "http://localhost:3000/thread/" +encoded;
    
//     })

//     return (
//         <div className='m-20'>
//             <h1>Media Downloader</h1>
//             <form onSubmit={handleSubmit}>
//                 <input type="text" value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Enter URL" />
//                 <button type="submit" onClick={helloworld}>Search</button>
//             </form>
            
            
            
            
            
//         </div>
//     );
// }

// export default App;



// import React, { useState } from 'react';
// import axios from 'axios';

// const DownloadThumbnail = () => {
//   const [videoUrl, setVideoUrl] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [thumbnailUrl, setThumbnailUrl] = useState('');

//   const handleDownload = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`http://localhost:4000/download-thumbnail?videoUrl=${videoUrl}`);
//       setThumbnailUrl(response.data.thumbnailUrl);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleThumbnailDownload = async () => {
//     const response = await axios.get(thumbnailUrl, { responseType: 'blob' });
//     const url = window.URL.createObjectURL(new Blob([response.data]));
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'thumbnail.jpg';
//     a.click();
//     window.URL.revokeObjectURL(url);
//   };

//   return (
//     <div>
//       <input type="text" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="Enter YouTube video URL" />
//       <button onClick={handleDownload} disabled={loading}>{loading ? 'Downloading...' : 'Get Thumbnail'}</button>
//       {thumbnailUrl && (
//         <div>
//           <img src={thumbnailUrl} alt="Thumbnail" />
//           <button onClick={handleThumbnailDownload}>Download Thumbnail</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DownloadThumbnail;

import React, { useState } from 'react';
import axios from 'axios';

const DownloadThumbnail = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [thumbnailUrls, setThumbnailUrls] = useState({});

  const handleDownload = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://you-back-orcin.vercel.app/download-thumbnail?videoUrl=${videoUrl}`);
      setThumbnailUrls(response.data.thumbnailUrls);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleThumbnailDownload = async (thumbnailUrl) => {
    try {
      const response = await axios.get(`https://you-back-orcin.vercel.app/download-thumbnail/image?thumbnailUrl=${thumbnailUrl}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = 'thumbnail.jpg';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1><a href="https://reduceimages-sigma.vercel.app/">YouTube Thumbnail Downloader</a></h1>
      <input type="text" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="Enter YouTube video URL" />
      <button onClick={handleDownload} disabled={loading}>{loading ? 'Downloading...' : 'Get Thumbnail'}</button>
      {Object.keys(thumbnailUrls).length > 0 && (
        <div>
          <h2>Thumbnails:</h2>
          <ul>
            {Object.keys(thumbnailUrls).map((key) => (
              <li key={key}>
                <img src={thumbnailUrls[key]} alt={key} />
                <button onClick={() => handleThumbnailDownload(thumbnailUrls[key])}>Download {key} Thumbnail</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DownloadThumbnail;
