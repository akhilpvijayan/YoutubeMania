import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  private apiUrl = 'https://youtubemania.vercel.app/video/download';

  constructor(private http: HttpClient) { }

  downloadVideo(url: string, format: string): Observable<Blob> {
    return this.http.post(`${this.apiUrl}`, { url, format }, { responseType: 'blob' });
  }
}
