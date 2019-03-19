import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TrustService } from 'src/app/core/service/trust.service';
import { CertificateService } from 'src/app/core/service/certificate.service';
import { Certificate } from 'src/model/certificate.model';
import { ToastrService } from 'ngx-toastr';
import { TrustStorage } from 'src/model/trust-storage.model';

@Component({
  selector: 'app-trust-storage',
  templateUrl: './trust-storage.component.html',
  styleUrls: ['./trust-storage.component.css']
})
export class TrustStorageComponent implements OnInit, OnDestroy {

  public sub: Subscription;
  public serverName: string;
  public serverAddress: string;
  public serverType: string;

  private certificates: Certificate[];
  private trustStorage: Certificate[];

  private target: string;

  public formGroup: FormGroup;
  public isValidFormSubmitted: boolean;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private trustStoreService: TrustService,
    private certificateService: CertificateService,
    private toastrService: ToastrService) {

  }

  ngOnInit() {

    this.formGroup = new FormGroup({
      serialNumber: new FormControl('', [Validators.required]),
    });

    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.serverName = params['server'] || '';
        this.serverAddress = params['address'] || '';
        this.serverType = params['type'] || '';
      });

    this.certificateService.findAll().subscribe(
      response => this.certificates = response,
      err => this.toastrService.error(err));
  }

  getTrustStorage(serialNumber: string) {
    this.target = serialNumber;
    this.trustStoreService.findTrustStorage(serialNumber).subscribe(
      response => this.trustStorage = response,
      err => this.trustStorage = []);
  }

  removeItem(serialNumber: string) {
    this.trustStorage = this.trustStorage.filter(s => s.serialNumber !== serialNumber);
  }

  addItem() {
    this.isValidFormSubmitted = false;
    if (this.formGroup.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    this.certificates.forEach(c => {
      if (c.serialNumber === this.serialNumber.value) {
        this.trustStorage.push(c);
      }
    });
  }

  update() {
    const sn = [];
    this.trustStorage.forEach(cer => { sn.push(cer.serialNumber); });
    const request: TrustStorage = { target: this.target, serialNumbers: sn };
    this.trustStoreService.updateStorage(request).subscribe(
      response => this.toastrService.success('Successfully updated storage'),
      err => this.toastrService.success('Successfully updated storage'));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private get serialNumber() {
    return this.formGroup.get('serialNumber');
  }

}
