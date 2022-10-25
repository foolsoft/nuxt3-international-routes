import { routes, defaultRouteLocale } from "../app/config/routes";
import { Locales } from "../app/config/locales";
import { resolve } from "path";
import { defineNuxtModule } from "@nuxt/kit";

/**
 Extending nuxt3 routing /app/config/routes.ts
 */
export default defineNuxtModule({
  async setup(moduleOptions, nuxt) {
    nuxt.hook("pages:extend", (pages: Array<any>) => {
      pages.splice(0, pages.length); //Clear all nuxt default routes
      const localesList = Object.values(Locales) as Array<string>;

      for (const routeName in routes) {
        const route = routes[routeName];
        if (
          !route.all &&
          (!route.locales || Object.keys(route.locales).length == 0)
        ) {
          console.error('Route must have "all" or "locales" property');
          continue;
        }
        if (!route.pageFile) {
          console.error('Route must have "pageFile" property');
          continue;
        }
        (route.all
          ? localesList
          : (Object.keys(route.locales) as Array<string>)
        ).forEach((locale) => {
          const routePath = route.all ?? route.locales[locale],
            routeFullPath =
              //uncomment if you want hide locale in url path for defaultLocale
              //(locale != defaultRouteLocale ? `/:locale(${locale})` : "") +
              `/:locale(${locale})` + `${routePath}`;

          // console.log(
          //   `\nAdd route: "${routeFullPath}" with name "${locale}-${routeName}" for "${resolve(
          //     __dirname,
          //     `pages/${route.pageFile}.vue"`
          //   )}`
          // );

          pages.push({
            name: `${locale}-${routeName}`,
            path: routeFullPath,
            file: resolve(__dirname, `../pages/${route.pageFile}.vue`),
            children: [],
          });
        });
      }
    });
  },
});
