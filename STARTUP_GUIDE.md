# 🚀 Video Downloader Pro - Startup Guide

## Quick Start Options

### 🎯 Method 1: Quick Start (Recommended)
**Double-click:** `QUICK_START.bat`
- Starts all servers automatically
- Beautiful ASCII art interface
- Comprehensive error checking

### 🎯 Method 2: Batch File
**Double-click:** `start_server.bat`
- Windows batch file
- Starts all available servers
- Automatic virtual environment detection

### 🎯 Method 3: PowerShell Script
**Run:** `start_server.ps1`
- PowerShell version with enhanced error handling
- Color-coded output
- Detailed status information

### 🎯 Method 4: Python Script (Advanced)
**Command:** `python start_servers.py`
- Direct Python execution
- Most flexible option
- Best for debugging

### 🎯 Method 5: Individual Server (Single App)
**Command:** `python yt_downloader_app.py`
- Starts only the main Flask server
- All features in one application
- Minimal resource usage

---

## 🌟 What Gets Started

### 📱 Main Application (Port 5000) - **REQUIRED**
- **YouTube Downloader** - Download videos in multiple qualities
- **Facebook Downloader** - Download Facebook videos in HD
- **Instagram Downloader** - Download Instagram reels and posts
- **Unified Interface** - All features in one beautiful web app

### 🚀 Advanced Instagram App (Port 3000) - **OPTIONAL**
- **Next.js Application** - Modern React-based interface
- **Advanced Features** - Enhanced Instagram downloading
- **Only starts if Node.js is installed**

---

## 🔗 Access URLs

### Main Application
- **Local:** http://localhost:5000
- **Network:** http://192.168.29.26:5000
- **Features:** YouTube + Facebook + Instagram

### Advanced Instagram (if available)
- **Local:** http://localhost:3000
- **Enhanced Instagram downloading interface**

---

## 💡 Recommended Usage

1. **Start with:** `QUICK_START.bat` (double-click)
2. **Use:** Main Application at http://localhost:5000
3. **All features** are available in the main app
4. **Advanced Instagram** is optional bonus

---

## 🛠️ Troubleshooting

### If startup fails:
1. **Check Python environment:** `.venv` folder should exist
2. **Install dependencies:** `pip install -r requirements.txt`
3. **Check ports:** 5000 and 3000 should be available
4. **Node.js:** Only needed for advanced Instagram app

### Common solutions:
- **Restart VS Code** if ports are busy
- **Close other Python processes** in Task Manager
- **Run as Administrator** if permission errors occur

---

## 🎉 Success Indicators

You'll see:
```
✅ Main server started successfully!
📺 YouTube downloader: http://localhost:5000
📘 Facebook downloader: http://localhost:5000/facebook
📱 Instagram downloader: http://localhost:5000/instagram
```

**Ready to download videos!** 🎬
