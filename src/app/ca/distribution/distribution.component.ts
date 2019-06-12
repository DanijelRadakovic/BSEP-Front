import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { CertificateService } from 'src/app/core/service/certificate.service';
import { Certificate } from 'src/app/model/cert/certificate.model';
import { DistributionService } from 'src/app/core/service/distribution.service';
import { Distribution } from 'src/app/model/cert/distribution.model';

@Component({
  selector: 'app-distribution',
  templateUrl: './distribution.component.html',
  styleUrls: ['./distribution.component.css']
})
export class DistributionComponent implements OnInit {

  public certificates: Certificate[];

  public formGroup: FormGroup;
  public isValidFormSubmitted: boolean;

  constructor(private toastrService: ToastrService,
    private certificateService: CertificateService,
    private distributionService: DistributionService) { }

  ngOnInit() {

    this.formGroup = new FormGroup({
      certificate: new FormControl('', [Validators.required]),
      hostname: new FormControl('', [Validators.required]),
      destination: new FormControl('', [Validators.required]),
      privateKey: new FormControl(false, []),
      keystore: new FormControl(false, []),
      truststore: new FormControl(false, []),
    });

    this.certificateService.getAllActive().subscribe(
      response => this.certificates = response,
      err => this.toastrService.error(err));
  }

  send() {
    this.isValidFormSubmitted = false;
    if (this.formGroup.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;

    const distribution: Distribution = {
      serialNumber: this.certificate.value,
      hostname: this.hostname.value,
      destination: this.destination.value,
      privateKey: this.privateKey.value,
      keystore: this.keystore.value,
      truststore: this.truststore.value
    };

    this.distributionService.distribute(distribution).subscribe(
      () => this.toastrService.success('Certificate successfully distributed!'),
      err => this.toastrService.error(err));
  }

  get certificate() {
    return this.formGroup.get('certificate');
  }

  get hostname() {
    return this.formGroup.get('hostname');
  }

  get destination() {
    return this.formGroup.get('destination');
  }

  get privateKey() {
    return this.formGroup.get('privateKey');
  }

  get keystore() {
    return this.formGroup.get('keystore');
  }

  get truststore() {
    return this.formGroup.get('truststore');
  }
}
