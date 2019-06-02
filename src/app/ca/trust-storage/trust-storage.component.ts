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

  private clientCertificates: Certificate[];
  private certificates: Certificate[];
  private trustStorage: Certificate[];
  private availableCerts: Certificate[];

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
      cert: new FormControl('', [Validators.required]),
    });

    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.serverName = params['server'] || '';
        this.serverAddress = params['address'] || '';
        this.serverType = params['type'] || '';
      });

    this.certificateService.getAllActiveClients().subscribe(
      response => this.clientCertificates = response,
      err => this.toastrService.error(err));

    this.certificateService.getAllActive().subscribe(
      response => this.certificates = response,
      err => this.toastrService.error(err));
  }

  getTrustStorage(serialNumber: string) {
    this.target = serialNumber;
    this.trustStoreService.findTrustStorage(serialNumber).subscribe(
      response => {
        this.trustStorage = response;
        if (this.trustStorage.length === 0) {
          this.availableCerts = this.certificates;
        } else {
          this.availableCerts = this.certificates.filter(c => !this.trustStorage.includes(c));
        }
        this.availableCerts.splice(this.availableCerts.findIndex(c => c.serialNumber === serialNumber), 1);
      },
      () => {
        this.trustStorage = [];
        this.availableCerts = this.certificates;
        this.availableCerts.splice(this.availableCerts.findIndex(c => c.serialNumber === serialNumber), 1);
      });
  }

  removeItem(serialNumber: string) {
    this.availableCerts.push(this.trustStorage.find(c => c.serialNumber === serialNumber));
    this.trustStorage = this.trustStorage.filter(s => s.serialNumber !== serialNumber);
  }

  addItem() {
    for (let index = 0; index < this.availableCerts.length; index++) {
      const c = this.availableCerts[index];
      if (c.serialNumber === this.cert.value) {
        this.trustStorage.push(c);
        this.availableCerts.splice(index, 1);
        if (this.availableCerts.length === 0) {
          this.cert.setValue('');
        } else {
          this.cert.setValue(this.availableCerts[0].serialNumber);
        }
        break;
      }
    }
  }

  update() {
    const sn = [];
    this.trustStorage.forEach(cer => { sn.push(cer.serialNumber); });
    const request: TrustStorage = { target: this.target, serialNumbers: sn };
    this.trustStoreService.updateStorage(request).subscribe(
      () => this.toastrService.success('Successfully updated storage'),
      err => this.toastrService.error(err));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private get cert() {
    return this.formGroup.get('cert');
  }

}
