import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ServerType } from 'src/model/enums/server-type.model';
import { Server } from 'src/model/server.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ServerService } from 'src/app/core/service/server.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-server-list',
  templateUrl: './server-list.component.html',
  styleUrls: ['./server-list.component.css']
})
export class ServerListComponent implements OnInit {

  private modalForm: NgbModalRef;
  public isValidFormSubmitted: boolean;
  public headerName: string;
  public formGroup: FormGroup;

  public addImage = 'assets/addServer.jpg';
  public servers: Server[] = [
    { id: 5, name: 'Root CA', address: 'https:example.com/slkdj', type: ServerType.CA },
    { id: 5, name: 'London CA', address: 'https:example.com', type: ServerType.CA },
    { id: 5, name: 'London CA', address: 'https:example.com', type: ServerType.CA },
    { id: 5, name: 'London CA', address: 'https:example.com', type: ServerType.CA },
    { id: 5, name: 'London CA', address: 'https:example.com', type: ServerType.CA },
    { id: 5, name: 'London CA', address: 'https:example.com', type: ServerType.CA }
  ];

  constructor(private modalService: NgbModal,
    private serverService: ServerService,
    private toastrService: ToastrService) {
    this.isValidFormSubmitted = null;
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required,
      Validators.minLength(1), Validators.maxLength(30)]),
      type: new FormControl(null, [Validators.required]),
      address: new FormControl('', [
        Validators.pattern('[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}')]),
    });
    this.headerName = 'Create Server';
  }

  ngOnInit() {
    this.serverService.findAll().subscribe(
      response => this.servers = response,
      err => this.toastrService.error(err));
  }

  delete(id: number) {
    console.log('obrisi' + id);
  }

  open(content: any): void {
    this.modalForm = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  onFormSubmit(): void {
    this.isValidFormSubmitted = false;
    if (this.formGroup.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;

    this.serverService.create(
      { id: null, name: this.name.value, type: this.type.value, address: this.address.value })
      .subscribe((server: Server) => {
        this.servers.push(server);
        this.modalForm.close();
        this.toastrService.success('Server is successfully created!');
      }, (error: string) => this.toastrService.error(error));
  }

  private get name() {
    return this.formGroup.get('name');
  }

  private get type() {
    return this.formGroup.get('type');
  }

  private get address() {
    return this.formGroup.get('address');
  }

}
