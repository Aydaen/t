import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../../../core/services/spotify/spotify.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent implements OnInit {
  albums: any = []

  constructor(private spotifyService: SpotifyService) {
  }

  ngOnInit(): void {
    this.spotifyService.getAccessToken().subscribe(response => {
      this.spotifyService.getTaylorSwiftAlbums(response.access_token).subscribe(albums => {
        this.albums = albums.items;
        console.log('Album ricevuti:', this.albums);
      });
    });
  }
}
