import { Component, OnInit, Input } from '@angular/core';
import { VariablesService } from 'src/app/variables.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-casehistory',
  templateUrl: './casehistory.component.html',
  styleUrls: ['./casehistory.component.scss']
})
export class CasehistoryComponent implements OnInit {
  @Input() caseId: string;
  @Input() assignflag: string;
  @Input() data: any;

  public create: boolean = false;
  public update: boolean = false;

  constructor(
    private variablesService: VariablesService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.variablesService.loginData.subscribe((res: any) => {
      if (res) {
        this.setPermissions(res);
      } else {
        let data = this.tokenService.getToken();
        this.setPermissions(data);
      }
    });
  }

  setPermissions(data) {
    if (data) {
      data.roleData.forEach(element => {
        if (element.moduleName === "review_case") {
          if (element.privilege[0] === 1)
            this.create = true;

          if (element.privilege[2] === 1)
            this.update = true;
        }
      });
    }
  }

}
