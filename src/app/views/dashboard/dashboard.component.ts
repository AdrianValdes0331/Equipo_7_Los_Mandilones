import * as _ from 'lodash';
import { Image } from 'src/app/models/image.model';
import * as moment from 'moment';

import { Component } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent{
  icono: string;
  state: number;
  constructor() { 
    this.icono = 'favorite_border';
    this.state = 1;
  }

  ngOnInit(): void {
  }

  onClick(){
    console.log('click');
    if(this.state === 1){
        this.icono = 'favorite';
        this.state = 2;
    }
    else if (this.state === 2){
        this.icono = 'favorite_border';
        this.state = 1;
    }
  }
}

