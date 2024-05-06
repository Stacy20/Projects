import { Component } from '@angular/core';
import { SearchBoxComponent } from "../../shared/components/search-box/search-box.component";
import { SelectComponent } from "../../shared/components/select/select.component";
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../../shared/components/sidebar/sidebar.component";
import { SpotiappService } from '../../services/spotiapp.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-search-page',
    standalone: true,
    templateUrl: './search-page.component.html',
    styleUrl: './search-page.component.css',
    imports: [SearchBoxComponent, SelectComponent, RouterOutlet, SidebarComponent, CommonModule]
})
export class SearchPageComponent {
  public optionSearch!:number;
  private lastValue: number = 0;
  // public term:string= this.spotiappService.lastTag;
  constructor(
    // private activedRoute: ActivatedRoute, //*Para obtener los parametros
    private router: Router, //*Sirve para redireccionar en caso de que la persona se equivoque para asi poder devolverse
    private spotiappService: SpotiappService //*Llamar al servio igual que al siempre
  ){}

  get term():string{
    var tag = this.spotiappService.lastTag();
    if(tag!== undefined ){
      this.optionSearch = tag.includes('by-artist') ? 0 : 1;
      var cadena = (tag?.split('/').pop() || '');
      tag = cadena.substring(0, 1).toUpperCase() + cadena.substring(1);
    }
    return tag;
  }

  ngOnInit(){
    var tagsHistory = this.spotiappService.tagsHistory;
    if (tagsHistory.length > 0 ){
      var tag = this.spotiappService.lastTag();
      this.router.navigateByUrl(tag);
      if(tag!== undefined ){
        var cadena = (tag?.split('/').pop() || '');
        tag = cadena.substring(0, 1).toUpperCase() + cadena.substring(1);
        this.optionSearch = tag.includes('by-artist') ? 0 : 1;
      }
    }
  }

  //*Regresa 0 o 1
  saveOptionSearch(index:number){
    console.log("index desde saveOptionSearch",index);
    this.optionSearch=index;
    this.lastValue = index;
  }
  searchTerm(term:string):void{
    var search = '';
    if(term.trim().length==0){
      return;
    }
    else{
      if(this.lastValue==0){
        console.log("entre al 0")
        search = `/search/by-artist/${term}`;
        // this.router.navigateByUrl();
      }else{
        console.log("entre al 1")
        search = `/search/by-song/${term}`;
        //this.router.navigateByUrl(`/search/by-song/${term}`);
      }

      this.spotiappService.organizeHistory(search);
      this.router.navigateByUrl(search);
    }
  }
}
