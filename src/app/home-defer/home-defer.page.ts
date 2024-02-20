import { Component, OnInit, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CatsService } from '../services/cats.service';
import { Cat  } from '../services/interfaces';

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
  private error = null;
  public cats:Cat[] = [];

  constructor() { 
    
  }

  loadCats(page: number){
    this.catsService.getCats(this.currentPage).subscribe((data) => {
      this.cats = data.data;
      this.currentPage = data.current_page;
    })
  }

  ngOnInit() {
    this.loadCats(this.currentPage);
  }

}
