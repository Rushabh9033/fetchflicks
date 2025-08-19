import { InstagramVideoForm } from "@/features/instagram/components/form";

export default function HomePage() {
  return (
    <>
      {/* Main Content */}
      <div className="main-content">
        <div className="container">
          <div className="card">
            <h1 className="card-title">Instagram Reel Downloader</h1>
            <p className="card-description">Download Instagram reels and videos in HD quality</p>

            <InstagramVideoForm />

            <div className="notes-section">
              <h3 className="section-title">How to use:</h3>
              <ul className="features-list">
                <li>Copy the Instagram reel or video URL from your browser</li>
                <li>Paste it in the input field above</li>
                <li>Click "Download"</li>
                <li>The video will be downloaded in HD quality</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
