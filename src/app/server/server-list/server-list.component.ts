import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  public servers: Server[];

  constructor(private modalService: NgbModal,
    private serverService: ServerService,
    private toastrService: ToastrService) {
    this.servers = [];
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
    this.serverService.remove(id).subscribe(
      (response: string) => {
        this.toastrService.success(response);
        this.servers = this.servers.filter(server => server.id !== id);
      }, (error: string) => this.toastrService.error(error));
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
