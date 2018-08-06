import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '../../node_modules/@angular/common/http';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}