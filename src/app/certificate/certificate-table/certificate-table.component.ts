import { Component, OnInit } from '@angular/core';
import { Certificate } from 'src/model/certificate.model';
import { CertificateService } from 'src/app/core/service/certificate.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-certificate-table',
  templateUrl: './certificate-table.component.html',
  styleUrls: ['./certificate-table.component.css']
})
export class CertificateTableComponent implements OnInit {

  private certificates: Certificate[];

  constructor( private certificateService: CertificateService, private toastrService: ToastrService) { 
    
  }

  ngOnInit() {  

    
  }

}
