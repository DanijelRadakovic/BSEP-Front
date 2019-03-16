import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Server } from 'selenium-webdriver/safari';
import { ServerType } from 'src/model/enums/server-type.model';


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
  private server: Server;

  constructor() { }

  ngOnInit() {
    this.server = { id: this.id, name: this.name, address: this.address, type: this.type };
  }

  connect(id: number) {
  }

  delete(id: number) {
    this.deleteEvent.emit(id);
  }
}
