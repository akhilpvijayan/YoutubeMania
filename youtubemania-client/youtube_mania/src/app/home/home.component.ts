import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { DownloadService } from '../services/download.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  youtubeUrl!: string;
  darkMode: boolean =  false;
  isDownloading: boolean = false;
  progress: number = 0;
  selectedFormat = "MP4";
  videoUrl: string | null = null;

  constructor(private downloadService: DownloadService) {}

  ngOnInit(): void {
    const storedValue = localStorage.getItem("yt-mania-dark-mode");
    this.darkMode = storedValue ? JSON.parse(storedValue) : false;    
  }

  onDownload() {
    if (this.youtubeUrl) {
      this.isDownloading = true;
      this.progress = 0;
      this.videoUrl = null;
      this.downloadService.downloadVideo(this.youtubeUrl, this.selectedFormat).subscribe(response => {
        this.downloadFile(response);
        this.isDownloading = false;
      }, error => {
        console.error('Download failed', error);
        this.isDownloading = false;
      });
      const interval = setInterval(() => {
        if (this.progress >= 100) {
          clearInterval(interval);
        } else {
          this.progress += 10;
        }
      }, 500);
    }
  }

  toggleDarkMode() {
    localStorage.setItem("yt-mania-dark-mode", JSON.stringify(!this.darkMode));
    this.darkMode = !this.darkMode;
  }

  private downloadFile(data: Blob) {
    const blob = new Blob([data], { type: 'video/mp4' });
    const url = window.URL.createObjectURL(blob);
    this.videoUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = this.videoUrl;
    a.href = url;
    a.download = `video.${this.selectedFormat.toLowerCase()}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url); // Clean up the URL object
  }
}
