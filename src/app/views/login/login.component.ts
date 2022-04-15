import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../../services/analytics.service';
import { CmxAppStore } from '../../states/app.store';
import { LegalEntityService } from '../../services/legal-entity.service';
import { LocaleStore } from 'src/app/states/locale.store';
import { Router } from '@angular/router';
import { UserStore } from '../../states/user.store';
import { environment } from "src/environments/environment";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {

  constructor(
    private userStore: UserStore,
    private router: Router,
    private appStore: CmxAppStore,
    private legalEntitiesService: LegalEntityService,
    private localeStore: LocaleStore,
    private analytics: AnalyticsService
  ) {}

  ngOnInit(): void {

    this.analytics.trigger();
  }

  public mylogin(evt: any) {
    if (evt.detail.ok === true) {
      evt.detail.body
        .getReader()
        .read()
        .then((stream) => {
          const userAuth = JSON.parse(
            new TextDecoder("utf-8").decode(stream.value)
          );
          this.userStore.setUser(
            userAuth.applications,
            userAuth.customer,
            userAuth.customerId,
            userAuth.profile
          );
          this.localeStore.setActiveLanguage(userAuth.country);
          this.appStore.setTokens(userAuth.jwt, userAuth.oauth2);
          this.legalEntitiesService.getLegalEntities();
          this.router.navigate(["dashboard"]);
        });
    }
  }

  public forgot() {
    window.open(`https://${environment.host}/forgotPassword`);
  }
}
