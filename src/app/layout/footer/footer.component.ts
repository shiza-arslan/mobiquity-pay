import { Component, OnInit } from '@angular/core';
import { UowService } from '../../services/uow.service';

@Component({
  selector: 'mobiquity-pay-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  translation: any = [];
  constructor(private service: UowService) {}

  ngOnInit(): void {
    this.translation = [];
    this.service.translateService.language.subscribe((res: any) => {
      this.service.translateService.get().subscribe((data: any) => {
        this.translation = data.footer;
      });
    });
  }
}
