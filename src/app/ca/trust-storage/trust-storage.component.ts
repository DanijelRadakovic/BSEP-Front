import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TrustService } from 'src/app/core/service/trust.service';
import { CertificateService } from 'src/app/core/service/certificate.service';
import { ToastrService } from 'ngx-toastr';
import { Certificate } from 'src/app/model/cert/certificate.model';
import { TrustStorage } from 'src/app/model/cert/trust-storage.model';

@Component({
  selector: 'app-trust-storage',
  templateUrl: './trust-storage.component.html',
  styleUrls: ['./trust-storage.component.css']
})
export class TrustStorageComponent implements OnInit {

  public clientCertificates: Certificate[];
  public certificates: Certificate[];
  public trustStorage: Certificate[];
  public availableCerts: Certificate[];

  private target: string;

  public formGroup: FormGroup;
  public isValidFormSubmitted: boolean;

  constructor(private trustStoreService: TrustService,
    private certificateService: CertificateService,
    private toastrService: ToastrService) {
  }

  ngOnInit() {

    this.formGroup = new FormGroup({
      cert: new FormControl('', [Validators.required]),
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
        for (let index = 0; index < this.availableCerts.length; index++) {
          const element = this.availableCerts[index];
          if (serialNumber === element.serialNumber) {
            this.availableCerts.splice(index, 1);
            break;
          }
        }
      },
      () => {
        this.trustStorage = [];
        this.availableCerts = this.certificates;
        for (let index = 0; index < this.availableCerts.length; index++) {
          const element = this.availableCerts[index];
          if (serialNumber === element.serialNumber) {
            this.availableCerts.splice(index, 1);
            break;
          }
        }
      });
  }

  removeItem(serialNumber: string) {
    this.availableCerts.push(this.trustStorage.find(c => c.serialNumber === serialNumber));
    for (let index = 0; index < this.trustStorage.length; index++) {
      const element = this.trustStorage[index];
      if (serialNumber === element.serialNumber) {
        this.trustStorage.splice(index, 1);
        break;
      }
    }
    // this.trustStorage = this.trustStorage.filter(s => s.serialNumber !== serialNumber);
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

  get cert() {
    return this.formGroup.get('cert');
  }

}
