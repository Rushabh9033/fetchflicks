import requests
import time

def main():
    print("Instagram Reel Downloader using insta-reel-api")
    reel_url = input("Enter Instagram Reel URL: ").strip()
    # Replace with your deployed insta-reel-api endpoint if self-hosted
    api_url = "https://insta-reel-api.vercel.app/api/download"
    params = {"url": reel_url}
    try:
        response = requests.get(api_url, params=params)
        response.raise_for_status()
        data = response.json()
        video_url = data.get("video")
        if not video_url:
            print("Could not fetch video link. Response:", data)
            return
        filename = f"reel_{int(time.time())}.mp4"
        print(f"Downloading: {video_url}")
        video_resp = requests.get(video_url, stream=True)
        with open(filename, "wb") as f:
            for chunk in video_resp.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)
        print(f"Downloaded Successfully as {filename}.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
