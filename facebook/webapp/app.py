
import os
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from flask import Flask, render_template, request, send_file, redirect, url_for, flash
import uuid
from facebook_video_downloader import FacebookVideoDownloader
import subprocess

app = Flask(__name__)
app.secret_key = 'your_secret_key'
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DOWNLOAD_FOLDER = os.path.join(BASE_DIR, 'downloads')
MERGED_FOLDER = os.path.join(BASE_DIR, 'merged')

os.makedirs(DOWNLOAD_FOLDER, exist_ok=True)
os.makedirs(MERGED_FOLDER, exist_ok=True)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        url = request.form.get('url')
        if not url:
            flash('Please enter a Facebook video URL.')
            return redirect(url_for('index'))
        try:
            # Download video
            downloader = FacebookVideoDownloader(os.getenv('API_URL', 'https://myapi-2f5b.onrender.com/fbvideo/search'))
            video_url = url
            downloader.download_video(video_url)
            # Find the downloaded video file
            downloads_folder = os.path.abspath(os.path.join(BASE_DIR, '..', 'Downloads'))
            if not os.path.exists(downloads_folder):
                os.makedirs(downloads_folder, exist_ok=True)
            if not os.path.exists(DOWNLOAD_FOLDER):
                os.makedirs(DOWNLOAD_FOLDER, exist_ok=True)
            if not os.path.exists(MERGED_FOLDER):
                os.makedirs(MERGED_FOLDER, exist_ok=True)
            video_files = [f for f in os.listdir(downloads_folder) if f.endswith('.mp4')]
            if not video_files:
                flash('Video download failed.')
                return redirect(url_for('index'))
            video_path = os.path.join(downloads_folder, video_files[-1])
            audio_path = os.path.join(DOWNLOAD_FOLDER, f"{uuid.uuid4()}_audio.mp3")
            merged_path = os.path.join(MERGED_FOLDER, f"{uuid.uuid4()}_merged.mp4")
            # Extract audio from video
            cmd_audio = [
                'ffmpeg', '-y',
                '-i', video_path,
                '-q:a', '0',
                '-map', 'a',
                audio_path
            ]
            subprocess.run(cmd_audio, check=True)
            # Merge video and audio (from same file, but for demonstration)
            cmd_merge = [
                'ffmpeg', '-y',
                '-i', video_path,
                '-i', audio_path,
                '-c:v', 'copy',
                '-c:a', 'aac',
                merged_path
            ]
            subprocess.run(cmd_merge, check=True)
            return send_file(merged_path, as_attachment=True)
        except Exception as e:
            flash(f'Error: {str(e)}')
            return redirect(url_for('index'))
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, port=5001)
