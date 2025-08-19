import subprocess
import sys
import os
import time
import socket
from pathlib import Path

def is_port_available(port):
    """Check if a port is available"""
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        try:
            s.bind(('localhost', port))
            return True
        except socket.error:
            return False

def check_node_installed():
    """Check if Node.js is installed"""
    try:
        subprocess.run(['node', '--version'], capture_output=True, check=True)
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        return False

def start_main_server():
    """Start the main Flask server (YouTube, Facebook, Instagram)"""
    print("� Starting Video Downloader Pro (Main Server)...")
    
    # Check if virtual environment exists
    venv_python = Path(".venv/Scripts/python.exe")
    if venv_python.exists():
        python_executable = str(venv_python)
        print("✅ Using virtual environment")
    else:
        python_executable = sys.executable
        print("⚠️  Using system Python (virtual environment not found)")
    
    try:
        main_server = subprocess.Popen([
            python_executable, 'yt_downloader_app.py'
        ], cwd=os.path.dirname(os.path.abspath(__file__)))
        
        print("✅ Main server started successfully!")
        print("📺 YouTube downloader: http://localhost:5000")
        print("📘 Facebook downloader: http://localhost:5000/facebook")
        print("📱 Instagram downloader: http://localhost:5000/instagram")
        
        return main_server
    except Exception as e:
        print(f"❌ Error starting main server: {e}")
        return None

def start_nextjs_server():
    """Start the Next.js Instagram Reel downloader (optional)"""
    nextjs_path = Path("Instagram-reels-downloader")
    
    if not nextjs_path.exists():
        print("ℹ️  Next.js Instagram downloader not found (optional)")
        return None
    
    if not check_node_installed():
        print("⚠️  Node.js not installed - skipping Next.js server")
        return None
    
    if not is_port_available(3000):
        print("⚠️  Port 3000 is busy - skipping Next.js server")
        return None
    
    print("🌐 Starting Next.js Instagram Reel downloader...")
    
    try:
        node_server = subprocess.Popen([
            'cmd', '/c', 'npm', 'run', 'dev'
        ], cwd=nextjs_path, shell=True)
        
        print("✅ Next.js server started!")
        print("🔗 Advanced Instagram downloader: http://localhost:3000")
        
        return node_server
    except Exception as e:
        print(f"⚠️  Could not start Next.js server: {e}")
        return None

def main():
    """Main function to start all servers"""
    print("=" * 60)
    print("   🎬 VIDEO DOWNLOADER PRO - MULTI-SERVER STARTUP")
    print("=" * 60)
    print()
    
    servers = []
    
    # Start main Flask server (required)
    main_server = start_main_server()
    if main_server:
        servers.append(('Main Server', main_server))
        time.sleep(3)  # Wait for Flask to fully start
    else:
        print("❌ Failed to start main server. Exiting.")
        return
    
    # Start Next.js server (optional)
    nextjs_server = start_nextjs_server()
    if nextjs_server:
        servers.append(('Next.js Server', nextjs_server))
        time.sleep(2)  # Wait for Next.js to start
    
    print()
    print("=" * 60)
    print("🎉 SERVER STARTUP COMPLETE!")
    print("=" * 60)
    print()
    print("� AVAILABLE SERVICES:")
    print("  🎯 Main Application: http://localhost:5000")
    print("    ├── 📺 YouTube Downloader")
    print("    ├── 📘 Facebook Downloader") 
    print("    └── 📱 Instagram Downloader")
    
    if len(servers) > 1:
        print("  🌟 Advanced Instagram: http://localhost:3000")
    
    print()
    print("🌐 Network Access: http://192.168.29.26:5000")
    print()
    print("💡 All video downloading features are available in the main app!")
    print("⏹️  Press Ctrl+C to stop all servers")
    print("=" * 60)
    
    try:
        # Wait for all servers
        for name, server in servers:
            server.wait()
    except KeyboardInterrupt:
        print("\n")
        print("🛑 Stopping all servers...")
        
        for name, server in servers:
            try:
                server.terminate()
                print(f"✅ {name} stopped")
            except Exception as e:
                print(f"⚠️  Error stopping {name}: {e}")
        
        print("✅ All servers stopped successfully!")

if __name__ == "__main__":
    main()
