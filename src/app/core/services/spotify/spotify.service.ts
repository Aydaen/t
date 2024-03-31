import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private baseUrl: string = 'https://api.spotify.com/v1';
  private authUrl: string = 'https://accounts.spotify.com/api/token';
  private clientId: string = 'bebdb8a848f04231a5ae83826e369c61'; // Inserisci qui il tuo Client ID
  private clientSecret: string = '968cc5e0a85f47229cd734f558d96103'; // Inserisci qui il tuo Client Secret

  constructor(private http: HttpClient) { }

  getAccessToken(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new HttpParams().set('grant_type', 'client_credentials');

    return this.http.post(this.authUrl, body.toString(), { headers: headers });
  }

  getTaylorSwiftAlbums(accessToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + accessToken
    });

    return this.http.get(`${this.baseUrl}/artists/06HL4z0CvFAxyc27GXpf02/albums?limit=10`, { headers: headers });
  }
}
