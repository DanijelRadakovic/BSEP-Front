import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ServerType } from 'src/model/enums/server-type.model';
import { Router } from '@angular/router';
import { Server } from 'src/model/server.model';


@Component({
  selector: 'app-server-card',
  templateUrl: './server-card.component.html',
  styleUrls: ['./server-card.component.css'],
})
export class ServerCardComponent implements OnInit {

  public image = 'assets/server.jpg';
  @Input() id: number;
  @Input() name: string;
  @Input() address: string;
  @Input() type: ServerType;
  @Output() deleteEvent = new EventEmitter<number>();
  public server: Server;

  constructor(private router: Router) { }

  ngOnInit() {
    this.server = { id: this.id, name: this.name, address: this.address, type: this.type };
  }

  connect() {
    this.router.navigate(['ca', this.name, 'conf'], { queryParams:
      { server: this.name, address: this.address, type: this.type } });
  }

  delete(id: number) {
    this.deleteEvent.emit(id);
  }
}
