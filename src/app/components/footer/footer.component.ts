import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  // TODO links
  items = [
    {
      text: 'Ajutor',
      value: '#'
    },
    {
      text: 'Termeni si conditii',
      value: '#'
    },
    {
      text: 'Confidentialitate',
      value: '#'
    },
    {
      text: 'ANPC',
      value: '#'
    },
    {
      text: 'GDPR',
      value: '#'
    }
  ]

  ngOnInit() {
  }

  onNavigate(link: string) {
    window.open(link, "_blank");
  }

}
