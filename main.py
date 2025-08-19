from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from pytubefix import YouTube
import os

app = FastAPI()
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request, "message": "Enter a YouTube video link to download"})

@app.post("/download", response_class=HTMLResponse)
async def download_video(request: Request, link: str = Form(...)):
    try:
        yt = YouTube(link)
        stream = yt.streams.get_highest_resolution()
        if stream:
            # Define a directory for downloads, ensure it exists
            download_dir = "downloads"
            os.makedirs(download_dir, exist_ok=True)
            file_path = stream.download(output_path=download_dir)
            message = f"Successfully downloaded: {os.path.basename(file_path)}"
        else:
            message = "Could not find a downloadable stream."
    except Exception as e:
        message = f"An error occurred: {str(e)}"
    return templates.TemplateResponse("index.html", {"request": request, "message": message})
