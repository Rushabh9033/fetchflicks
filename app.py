from pytubefix import YouTube
import os

def Download(link):
    try:
        print("Fetching video information...")
        youtube_video = YouTube(link)
        print(f"Title: {youtube_video.title}")
        print(f"Views: {youtube_video.views}")
        
        # Get all streams and present options to user
        streams = youtube_video.streams.filter(progressive=False, file_extension='mp4').order_by('resolution').desc()
        if not streams:
            # Fallback to progressive streams if adaptive streams aren't available
            streams = youtube_video.streams.filter(progressive=True, file_extension='mp4').order_by('resolution').desc()
        
        # Create a list of available resolutions
        available_streams = list(streams)
        resolutions = [stream.resolution for stream in available_streams]
        
        print(f"Available resolutions: {resolutions}")
        
        # Ask user to select resolution
        print("\nSelect resolution by entering the number (or press Enter for highest quality):")
        for i, res in enumerate(resolutions, 1):
            print(f"{i}. {res}")
        
        choice = input(">>> ").strip()
        
        if choice == "":
            # Default to highest quality
            video_stream = available_streams[0]
            print(f"Selected resolution: {video_stream.resolution}")
        else:
            try:
                index = int(choice) - 1
                if 0 <= index < len(available_streams):
                    video_stream = available_streams[index]
                    print(f"Selected resolution: {video_stream.resolution}")
                else:
                    print("Invalid choice. Using highest quality.")
                    video_stream = available_streams[0]
            except ValueError:
                print("Invalid input. Using highest quality.")
                video_stream = available_streams[0]
        
        print("Downloading video...")
        video_stream.download()
        print("YouTube video has been successfully downloaded!")
        
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        print("Please check the link or try again later.")

if __name__ == "__main__":
    print("YouTube Video Downloader")
    print("=========================")
    
    link = input("Enter the video link you want to download: ")
    
    if link.strip():
        Download(link)
    else:
        print("No link provided. Exiting.")