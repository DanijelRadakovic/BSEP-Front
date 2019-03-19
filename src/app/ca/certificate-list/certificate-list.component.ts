import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CertificateService } from '../../core/service/certificate.service';
import { ToastrService } from 'ngx-toastr';
import { Certificate } from 'src/model/certificate.model';

@Component({
  selector: 'app-certificate-list',
  templateUrl: './certificate-list.component.html',
  styleUrls: ['./certificate-list.component.css']
})
export class CertificateListComponent implements OnInit, OnDestroy {

  public sub: Subscription;
  public serverName: string;
  public serverAddress: string;
  public serverType: string;

  displayedColumns: string[] = ['distinguishedName', 'serialNumber', 'active', 'revoke']
  private certificates: Certificate[] = [];
  dataSource : any[];

  constructor(private route: ActivatedRoute, private certificateService: CertificateService,
     private toastrService: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.serverName = params['server'] || '';
        this.serverAddress = params['address'] || '';
        this.serverType = params['type'] || '';
      });

      this.certificateService.findAll().subscribe(
        response => {
          this.certificates = response;
          this.certificates.forEach(element => {
            console.log(element);
          });
        },
        err => this.toastrService.error(err));
  
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  revokeCertificate(certificate: Certificate){
    console.log(certificate.id);
    this.certificateService.remove(certificate.id).subscribe(
      response => {
        certificate.active = false;
        // var index = this.certificates.indexOf(certificate);
        // const copiedData =  this.certificates.slice();
        // copiedData.splice(index, 1);
        // this.certificates = copiedData;
        // this.toastr.info("Certificate succesfully revoked!")
      },
      err => this.toastrService.error(err));
  }

}
