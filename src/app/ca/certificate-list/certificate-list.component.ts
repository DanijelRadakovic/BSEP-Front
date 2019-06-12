import { Component, OnInit } from '@angular/core';
import { CertificateService } from '../../core/service/certificate.service';
import { ToastrService } from 'ngx-toastr';
import { Certificate } from 'src/app/model/cert/certificate.model';


@Component({
  selector: 'app-certificate-list',
  templateUrl: './certificate-list.component.html',
  styleUrls: ['./certificate-list.component.css']
})
export class CertificateListComponent implements OnInit {

  displayedColumns: string[] = ['distinguishedName', 'serialNumber', 'active', 'revoke'];
  public certificates: Certificate[] = [];
  dataSource: any[];

  constructor(private certificateService: CertificateService,
    private toastrService: ToastrService) { }

  ngOnInit() {
    this.certificateService.getAll().subscribe(
      response => this.certificates = response,
      err => this.toastrService.error(err));
  }

  revokeCertificate(certificate: Certificate) {
    this.certificateService.remove(certificate.id).subscribe(
      () => {
        certificate.active = false;
        this.toastrService.success('Certificate successfully revoked');
      }, err => this.toastrService.error(err));
  }

}
