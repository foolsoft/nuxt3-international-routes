import { Locales } from "~/app/config/locales";
import { routes, RouteNames, defaultRouteLocale } from "~/app/config/routes";
import { useRoute, defineNuxtPlugin, useRuntimeConfig } from "#app";

/*
Define helper functions
*/

export default defineNuxtPlugin((nuxt) => {
  return {
    provide: {
      RouteNames,
      routeLocale: (): string => {
        return (
          (useRoute().params.locale?.toString() as Locales) ??
          defaultRouteLocale
        );
      },
      path: (
        route: {
          name: RouteNames | string;
          locale: Locales;
        },
        params?: Record<string, string | number | boolean>
      ): string => {
        if (
          !routes[route.name] ||
          (!routes[route.name].all && !routes[route.name].locales[route.locale])
        ) {
          return "";
        }

        let url =
          //uncomment if you want hide locale in url path for defaultLocale
          //(route.locale != defaultRouteLocale ? "/" + route.locale : "") +
          "/" +
          route.locale +
          (routes[route.name].all ?? routes[route.name].locales[route.locale]);

        if (params) {
          for (const name in params) {
            if (params[name]) {
              url = url.replace(
                new RegExp(":" + name + ".*?(\\/|$)"),
                params[name].toString() + "$1"
              );
            }
          }
        }

        url = url.replace(/:.+?(\/|$)/gi, "").replace(/\/$/, "");
        if (url[url.length - 1] != "/") {
          url += "/";
        }
        return (params.absolute ? useRuntimeConfig().public.DOMAIN : "") + url;
      },
    },
  };
});

declare module "#app" {
  interface NuxtApp {
    $routeLocale(): Locales;
    $RouteNames: RouteNames;
    $path: string;
  }
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $routeLocale(): Locales;
    $RouteNames: RouteNames;
    $path: string;
  }
}
