import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})

export class UserInfoComponent implements OnInit {

  constructor() { }
  title = 'User ';
  ngOnInit(): void {
  }

}
