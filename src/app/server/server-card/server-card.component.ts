import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Server } from 'src/app/model/server/server.model';
import { ServerType } from 'src/app/model/enums/server-type.model';


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
  @Input() current: boolean;
  @Output() deleteEvent = new EventEmitter<number>();
  public server: Server;

  constructor() { }

  ngOnInit() {
    this.server = { id: this.id, name: this.name, address: this.address, type: this.type };
  }

  connect() {
    window.open(this.address, '_blank');
  }

  delete(id: number) {
    this.deleteEvent.emit(id);
  }
}
