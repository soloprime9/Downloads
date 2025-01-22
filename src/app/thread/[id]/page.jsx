
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [decodedUrl, setDecodedUrl] = useState("");

  // Decode the URL from the path
  useEffect(() => {
    const pathid = window.location.pathname;
    const urlid = pathid.split("/").pop();
    const decoded = atob(urlid); // Decode the URL
    setDecodedUrl(decoded);
    console.log("Decoded URL:", decoded);
  }, []);

  const handleDownload = async () => {
    if (!decodedUrl) {
      setError("No URL to process");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:4000/search", 
        { url: decodedUrl },
        { responseType: "blob" } // Important for downloading files
      );

      // Create a downloadable link for the file
      const blob = new Blob([response.data], { type: response.headers["content-type"] });
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = response.headers["content-disposition"]?.split("filename=")[1] || "download.jpg";
      link.click();

      // Clean up
      URL.revokeObjectURL(downloadUrl);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to download the media. Please check the URL and try again.");
      setLoading(false);
    }
  };

  return (
    <div className="m-20">
      <h1>Media Downloader</h1>
      <div>
        <p className="text-gray-500">URL to download:</p>
        <p className="font-bold">{decodedUrl || "Loading..."}</p>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <button
        onClick={handleDownload}
        disabled={loading}
        className={`p-2 mt-4 bg-blue-500 text-white rounded shadow-md hover:bg-blue-700 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Downloading..." : "Download Media"}
      </button>
    </div>
  );
}

export default App;
