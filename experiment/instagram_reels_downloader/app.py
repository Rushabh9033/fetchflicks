from flask import Flask, render_template, request, redirect, url_for, flash, send_file
import os
import tempfile
import logging

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/download', methods=['POST'])
def download_reel():
    link = request.form.get('link')
    if not link:
        flash('Please enter an Instagram Reel link')
        return redirect(url_for('index'))
    try:
        import instaloader
        from urllib.parse import urlparse
        L = instaloader.Instaloader(dirname_pattern=tempfile.gettempdir(), save_metadata=False, download_video_thumbnails=False)
        # Extract shortcode from link
        path = urlparse(link).path
        parts = [p for p in path.split('/') if p]
        shortcode = parts[-1] if parts else None
        if not shortcode:
            flash('Invalid Instagram Reel link')
            return redirect(url_for('index'))
        # Download reel
        try:
            L.download_shortcode(shortcode, target=None)
        except Exception as e:
            logger.error(f"Instaloader error: {str(e)}")
            flash(f'Failed to download reel: {str(e)}')
            return redirect(url_for('index'))
        # Find the downloaded mp4 file in temp dir
        temp_files = os.listdir(tempfile.gettempdir())
        reel_files = [f for f in temp_files if f.startswith(shortcode) and f.endswith('.mp4')]
        if not reel_files:
            flash('Could not find downloaded reel video file.')
            return redirect(url_for('index'))
        reel_path = os.path.join(tempfile.gettempdir(), reel_files[0])
        return send_file(reel_path, as_attachment=True)
    except Exception as e:
        logger.error(f"Error downloading reel: {str(e)}")
        flash(f'Error downloading reel: {str(e)}')
        return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
