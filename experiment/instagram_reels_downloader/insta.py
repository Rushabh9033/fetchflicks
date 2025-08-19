

from instascrape import Reel
import time

def main():
    print("Instagram Reel Downloader using instascrape")
    reel_url = input("Enter Instagram Reel URL: ").strip()
    session_id = input("Enter your Instagram session ID: ").strip()
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.74 Safari/537.36 Edg/79.0.309.43",
        "cookie": f'sessionid={session_id};'
    }
    try:
        reel = Reel(reel_url)
        reel.scrape(headers=headers)
        filename = f"reel_{int(time.time())}.mp4"
        reel.download(fp=filename)
        print(f"Downloaded Successfully as {filename}.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()