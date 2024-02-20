import { Component, OnInit, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CatsService } from '../services/cats.service';
import { Cat, Link } from '../services/interfaces';

@Component({
  selector: 'app-home-defer',
  templateUrl: './home-defer.page.html',
  styleUrls: ['./home-defer.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})

export class HomeDeferPage implements OnInit {
  private catsService = inject(CatsService)
  private currentPage = 1;
  public cats:Cat[] = [];
  public link:Link[] = [];
  public allCats:Cat[] = []; 
  public searchText = '';

  constructor() {}

  loadCats(page: number){
    this.catsService.getCats(this.currentPage).subscribe((data) => {
      this.cats = data.data;
      this.currentPage = data.current_page;
      this.link = data.links;
    })

    this.catsService.getAllCats().subscribe((data) => {
      this.allCats = data.data;
    })
  }

  searchCats(){
    this.cats = this.allCats.filter(cat => cat.breed.toLowerCase().includes(this.searchText.toLowerCase()))
  }

  handleClick(label:string) {
    if (label === 'Next'){
      this.currentPage++;
    } else if (label === 'Previous'){
      this.currentPage--;
    } else {
      this.currentPage = parseInt(label);
    }
    this.loadCats(this.currentPage);
  }

  ngOnInit() {
    this.loadCats(this.currentPage);
  }

}
