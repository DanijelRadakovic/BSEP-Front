import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CertificateService } from 'src/app/core/service/certificate.service';
import { Certificate } from 'src/model/certificate.model';
import { Generator } from 'src/model/generator.model';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit, OnDestroy {

  public sub: Subscription;
  public serverName: string;
  public serverAddress: string;
  public serverType: string;

  private certificates: Certificate[];

  public formGroup: FormGroup;
  public isValidFormSubmitted: boolean;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private certificateService: CertificateService) { }

  ngOnInit() {

    this.formGroup = new FormGroup({
      commonName: new FormControl('', [Validators.required]),
      organization: new FormControl('', [Validators.required]),
      organizationUnit: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      uid: new FormControl('', []),
      type: new FormControl('', [Validators.required]),
      issuer: new FormControl('', [Validators.required]),
      destination: new FormControl('', []),
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

  generate() {
    this.isValidFormSubmitted = false;
    if (this.formGroup.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;

    const issuerSN = this.issuer.value;
    let issuerDN = '';
    this.certificates.forEach(cer => {
      if (cer.serialNumber === issuerSN) {
        issuerDN = cer.distinguishedName;
      }
    });

    let dn = 'CN=' + this.commonName.value + ', OU=' + this.organizationUnit.value +
    ', O=' + this.organization.value + ', C=' + this.country.value;
    if (this.uid.value && this.uid.value !== '') {
      dn += ', UID=' + this.uid.value;
    }

    const request: Generator = {
      destination: this.destination.value || '',
      issuer: {x500Name: issuerDN, serialNumber: issuerSN},
      type: this.type.value,
      server: this.serverName,
      x500Name: dn
    };

    this.certificateService.create(request).subscribe(
      response => this.toastrService.success('Successfully updated storage'),
      err => this.toastrService.success('Successfully updated storage'));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private get commonName() {
    return this.formGroup.get('commonName');
  }

  private get organization() {
    return this.formGroup.get('organization');
  }

  private get organizationUnit() {
    return this.formGroup.get('organizationUnit');
  }

  private get country() {
    return this.formGroup.get('country');
  }

  private get uid() {
    return this.formGroup.get('uid');
  }

  private get type() {
    return this.formGroup.get('type');
  }

  private get issuer() {
    return this.formGroup.get('issuer');
  }

  private get destination() {
    return this.formGroup.get('destination');
  }

}
