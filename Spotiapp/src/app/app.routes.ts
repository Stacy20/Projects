import { BySearchSongComponent } from './pages/searchChildren/by-search-song/by-search-song.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { BySearchArtistComponent } from './pages/searchChildren/by-search-artist/by-search-artist.component';
import { TopArtistPageComponent } from './pages/top-artist-page/top-artist-page.component';
import { AlbumPageComponent } from './pages/album-page/album-page.component';

export const routes: Routes = [
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:"search",
    component:SearchPageComponent,
    children:[
      {
        path:'by-artist',
        component:BySearchArtistComponent
      },
      {
        path:'by-song',
        component:BySearchSongComponent
      },
      {
        path:'by-artist/:name',
        component:BySearchArtistComponent
      },
      {
        path:'by-song/:name',
        component:BySearchSongComponent
      },
      {
        path:'**',
        redirectTo:'search'
      }
    ]
  }
  ,{
    path:'topArtist/:idPage/:idArtist',
    component: TopArtistPageComponent
  },{
    path:'albumArtist/:idPage/:idAlbum',
    component: AlbumPageComponent
  }
  ,{
    path:'**',
    redirectTo:'home'
  }
];
