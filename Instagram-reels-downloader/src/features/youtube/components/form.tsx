"use client";

import { useState } from "react";

export default function YoutubeForm() {
  const [videoUrl, setVideoUrl] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setDownloadUrl("");
    try {
      const res = await fetch(`/api/youtube?videoUrl=${encodeURIComponent(videoUrl)}`);
      const data = await res.json();
      if (data.download) {
        setDownloadUrl(data.download);
      } else {
        setError(data.error || "Download failed");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: "auto" }}>
      <h2>YouTube Video Downloader</h2>
      <input
        type="text"
        value={videoUrl}
        onChange={e => setVideoUrl(e.target.value)}
        placeholder="Paste YouTube video URL here"
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
        required
      />
      <button type="submit" style={{ padding: "10px 20px" }}>Download</button>
      {downloadUrl && (
        <div style={{ marginTop: 10 }}>
          <a href={downloadUrl} target="_blank" rel="noopener noreferrer">Download Link</a>
        </div>
      )}
      {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
    </form>
  );
}
