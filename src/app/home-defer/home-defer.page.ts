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
  public selectedOption = '';

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
    if(this.selectedOption === 'breed'){
      this.cats =  this.allCats.filter(cat => 
        cat.breed.toLowerCase()
        .includes(this.searchText.toLowerCase()));
    }else if(this.selectedOption === 'country'){
      this.cats =  this.allCats.filter(cat => 
        cat.country.toLowerCase()
        .includes(this.searchText.toLowerCase()));
    }else if (this.selectedOption === 'origin'){
      this.cats =  this.allCats.filter(cat => 
        cat.origin.toLowerCase()
        .includes(this.searchText.toLowerCase()));
    }else if(this.selectedOption === 'coat'){
      this.cats =  this.allCats.filter(cat => 
        cat.coat.toLowerCase()
        .includes(this.searchText.toLowerCase()));
  }else if(this.selectedOption === 'pattern'){
    this.cats =  this.allCats.filter(cat => 
      cat.pattern.toLowerCase()
      .includes(this.searchText.toLowerCase()));
  }else {
    this.cats =  this.allCats.filter(cat => 
      cat.breed.toLowerCase()
      .includes(this.searchText.toLowerCase()) ||
      cat.country.toLowerCase()
      .includes(this.searchText.toLowerCase()) ||
      cat.origin.toLowerCase()
        .includes(this.searchText.toLowerCase()) ||
      cat.coat.toLowerCase()
      .includes(this.searchText.toLowerCase()) ||
      cat.pattern.toLowerCase()
      .includes(this.searchText.toLowerCase()));  
    }
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
