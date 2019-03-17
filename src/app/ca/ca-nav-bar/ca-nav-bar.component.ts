import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ca-nav-bar',
  templateUrl: './ca-nav-bar.component.html',
  styleUrls: ['./ca-nav-bar.component.css']
})
export class CaNavBarComponent implements OnInit {

  @Input() serverName: string;
  @Input() serverAddress: string;
  @Input() serverType: string;

  constructor() { }

  ngOnInit() {
  }

}
