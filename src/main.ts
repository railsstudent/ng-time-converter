import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(() => {
    const color = 'goldenrod';
    const themeChooser = document.getElementsByTagName("time-theme")[0];
    themeChooser.setAttribute("theme", color);

    const converter = document.getElementsByTagName("time-converter")[0];
    converter.setAttribute("theme", color);
  })
  .catch(err => console.log(err));
