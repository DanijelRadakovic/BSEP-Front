import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CertificateService } from 'src/app/core/service/certificate.service';
import { Certificate } from 'src/model/certificate.model';
import { CertificateRequest, SubjectDN } from 'src/model/generator.model';

const countries: String[] = [
  'Afghanistan AF', 'Albania AL', 'Algeria DZ', 'American Samoa AS', 'Andorra AD', 'Angola AO', 'Anguilla AI',
  'Antarctica AQ', 'Antigua And Barbuda AG', 'Argentina AR', 'Armenia AM', 'Aruba AW', 'Ascension Island AC',
  'Australia AU', 'Austria AT', 'Azerbaijan AZ', 'Bahamas BS', 'Bahrain BH', 'Bangladesh BD', 'Barbados BB',
  'Belarus BY', 'Belgium BE', 'Belize BZ', 'Benin BJ', 'Bermuda BM', 'Bhutan BT', 'Bosnia & Herzegovina BA',
  'Botswana BW', 'Bouvet Island BV', 'Brazil BR', 'British Indian Ocean Territory IO', 'Brunei Darussalam BN',
  'Bulgaria BG', 'Burkina Faso BF', 'Burundi BI', 'Cabo Verde CV', 'Cambodia KH', 'Cameroon CM', 'Canada CA',
  'Canary Islands IC', 'Cayman Islands KY', 'Central African Republic CF', 'Chad TD', 'Chile CL', 'China CN',
  'Christmas Island CX', 'Clipperton Island CP', 'Cocos (Keeling) Islands CC', 'Colombia CO', 'Comoros KM',
  'Cook Islands CK', 'Costa Rica CR', 'Croatia HR', 'Cuba CU', 'Curacao CW', 'Cyprus CY', 'Czech Republic CZ',
  'Côte dIvoire CI', 'Democratic Republic Of Congo CD', 'Denmark DK', 'Diego Garcia DG', 'Djibouti DJ',
  'Dominica DM', 'Dominican Republic DO', 'Ecuador EC', 'Egypt EG', 'El Salvador SV', 'Equatorial Guinea GQ',
  'Eritrea ER', 'Estonia EE', 'Ethiopia ET', 'European Union EU', 'Falkland Islands FK', 'Faroe Islands FO',
  'Fiji FJ', 'Finland FI', 'France FR', 'French Guiana GF', 'French Polynesia PF', 'French Southern Territories TF',
  'Gabon GA', 'Gambia GM', 'Georgia GE', 'Germany DE', 'Ghana GH', 'Gibraltar GI', 'Greece GR', 'Greenland GL',
  'Grenada GD', 'Guadeloupe GP', 'Guam GU', 'Guatemala GT', 'Guernsey GG', 'Guinea GN', 'Guinea-bissau GW',
  'Guyana GY', 'Haiti HT', 'Heard Island And McDonald Islands HM', 'Honduras HN', 'Hong Kong HK', 'Hungary HU',
  'Iceland IS', 'India IN', 'Indonesia ID', 'Iraq IQ', 'Ireland IE', 'Isle Of Man IM', 'Israel IL', 'Italy IT',
  'Jamaica JM', 'Japan JP', 'Jersey JE', 'Jordan JO', 'Kazakhstan KZ', 'Kenya KE', 'Kiribati KI', 'Kosovo XK',
  'Kuwait KW', 'Kyrgyzstan KG', 'Lao People Democratic Republic LA', 'Latvia LV', 'Lebanon LB', 'Lesotho LS',
  'Liberia LR', 'Libya LY', 'Liechtenstein LI', 'Lithuania LT', 'Luxembourg LU', 'Macao MO', 'Madagascar MG',
  'Malawi MW', 'Malaysia MY', 'Maldives MV', 'Mali ML', 'Malta MT', 'Marshall Islands MH', 'Martinique MQ',
  'Mauritania MR', 'Mauritius MU', 'Mayotte YT', 'Mexico MX', 'Moldova MD', 'Monaco MC', 'Mongolia MN',
  'Montenegro ME', 'Montserrat MS', 'Morocco MA', 'Mozambique MZ', 'Myanmar MM', 'Namibia NA', 'Nauru NR', 'Nepal NP',
  'Netherlands NL', 'New Caledonia NC', 'New Zealand NZ', 'Nicaragua NI', 'Niger NE', 'Nigeria NG', 'Niue NU',
  'Norfolk Island NF', 'Northern Mariana Islands MP', 'Norway NO', 'Oman OM', 'Pakistan PK', 'Palau PW', 'Panama PA',
  'Papua New Guinea PG', 'Paraguay PY', 'Peru PE', 'Philippines PH', 'Pitcairn PN', 'Poland PL', 'Portugal PT', 'Puerto Rico PR',
  'Qatar QA', 'Republic Of Congo CG', 'Reunion RE', 'Romania RO', 'Russian Federation RU', 'Rwanda RW', 'Saint Barthélemy BL',
  'Saint Kitts And Nevis KN', 'Saint Lucia LC', 'Saint Martin MF', 'Saint Pierre And Miquelon PM', 'Saint Vincent And The Grenadines VC',
  'Samoa WS', 'San Marino SM', 'Sao Tome and Principe ST', 'Saudi Arabia SA', 'Senegal SN', 'Serbia RS', 'Seychelles SC',
  'Sierra Leone SL', 'Singapore SG', 'Sint Maarten SX', 'Slovakia SK', 'Slovenia SI', 'Solomon Islands SB', 'Somalia SO',
  'South Africa ZA', 'South Georgia And The South Sandwich Islands GS', 'South Sudan SS', 'Spain ES', 'Sri Lanka LK',
  'Sudan SD', 'Suriname SR', 'Svalbard And Jan Mayen SJ', 'Swaziland SZ', 'Sweden SE', 'Switzerland CH', 'Syrian Arab Republic SY',
  'Taiwan TW', 'Tajikistan TJ', 'Thailand TH', 'Togo TG', 'Tokelau TK', 'Tonga TO', 'Trinidad And Tobago TT', 'Tristan de Cunha TA',
  'Tunisia TN', 'Turkey TR', 'Turkmenistan TM', 'Turks And Caicos Islands TC', 'Tuvalu TV', 'Uganda UG', 'Ukraine UA',
  'United Arab Emirates AE', 'United Kingdom GB', 'United Kingdom UK', 'United States US', 'United States Minor Outlying Islands UM',
  'Uruguay UY', 'USSR SU', 'Uzbekistan UZ', 'Vanuatu VU', 'Vatican City State VA', 'Viet Nam VN', 'Virgin Islands (British) VG',
  'Virgin Islands (US) VI', 'Wallis And Futuna WF', 'Western Sahara EH', 'Yemen YE', 'Zambia ZM', 'Zimbabwe ZW', 'Åland Islands AX',
];

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit, OnDestroy {

  public countries: String[];
  public sub: Subscription;
  public serverName: String;
  public serverAddress: String;
  public serverType: String;
  public showIssuer: boolean;

  private certificates: Certificate[];

  public formGroup: FormGroup;
  public isValidFormSubmitted: boolean;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private certificateService: CertificateService) {
    this.countries = countries;
    this.showIssuer = true;
  }

  ngOnInit() {

    this.formGroup = new FormGroup({
      commonName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]),
      organization: new FormControl('', [Validators.minLength(1), Validators.maxLength(64)]),
      country: new FormControl('', []),
      organizationUnit: new FormControl('', [Validators.minLength(1), Validators.maxLength(64)]),
      surname: new FormControl('', [Validators.minLength(1), Validators.maxLength(64)]),
      givenName: new FormControl('', [Validators.minLength(1), Validators.maxLength(64)]),
      gender: new FormControl('', []),
      email: new FormControl('', [Validators.minLength(1), Validators.maxLength(64), Validators.email]),
      placeOfBirth: new FormControl('', [Validators.minLength(1), Validators.maxLength(128)]),
      street: new FormControl('', [Validators.minLength(1), Validators.maxLength(64)]),
      localityName: new FormControl('', [Validators.minLength(1), Validators.maxLength(64)]),
      postalCode: new FormControl('', [Validators.minLength(1), Validators.maxLength(40)]),
      countryOfCitizenship: new FormControl('', []),
      countryOfResidence: new FormControl('', []),
      type: new FormControl('', [Validators.required]),
      issuer: new FormControl('', [Validators.required]),
    });

    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.serverName = params['server'] || '';
        this.serverAddress = params['address'] || '';
        this.serverType = params['type'] || '';
      });

    this.certificateService.getAllActiveCA().subscribe(
      response => this.certificates = response,
      err => this.toastrService.error(err));
  }

  generate() {
    this.isValidFormSubmitted = false;
    if (this.formGroup.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;

    const issuerSN = (this.issuer.value as String).split(' ')[0];
    const countryTokens = (this.country.value as String).split(' ');
    const countryOfCitizenshipTokens = (this.countryOfCitizenship.value as String).split(' ');
    const countryOfResidenceTokens = (this.countryOfResidence.value as String).split(' ');

    const subjectDN: SubjectDN = {
      commonName: this.commonName.value,
      organization: this.organization.value,
      country: countryTokens[countryTokens.length - 1],
      organizationUnit: this.organizationUnit.value,
      surname: this.surname.value,
      givenName: this.givenName.value,
      gender: this.gender.value,
      email: this.email.value,
      placeOfBirth: this.placeOfBirth.value,
      street: this.street.value,
      localityName: this.localityName.value,
      postalCode: this.postalCode.value,
      countryOfCitizenship: countryOfCitizenshipTokens[countryOfCitizenshipTokens.length - 1],
      countryOfResidence: countryOfResidenceTokens[countryOfResidenceTokens.length - 1],
    };

    const request: CertificateRequest = { issuerSN: issuerSN, subjectDN: subjectDN, type: this.type.value };

    this.certificateService.create(request).subscribe(
      () => this.toastrService.success('Certificate successfully created!'),
      err => this.toastrService.error(err));
  }

  changeType(event) {
    if (event.target.value === 'ROOT') {
      this.issuer.setValue(' ');
      this.showIssuer = false;
    } else {
      this.showIssuer = true;
    }
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

  private get surname() {
    return this.formGroup.get('surname');
  }

  private get givenName() {
    return this.formGroup.get('givenName');
  }

  private get gender() {
    return this.formGroup.get('gender');
  }

  private get email() {
    return this.formGroup.get('email');
  }

  private get placeOfBirth() {
    return this.formGroup.get('placeOfBirth');
  }

  private get street() {
    return this.formGroup.get('street');
  }

  private get localityName() {
    return this.formGroup.get('localityName');
  }

  private get postalCode() {
    return this.formGroup.get('postalCode');
  }

  private get countryOfCitizenship() {
    return this.formGroup.get('countryOfCitizenship');
  }

  private get countryOfResidence() {
    return this.formGroup.get('countryOfResidence');
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
}
