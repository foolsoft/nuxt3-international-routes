import { Locales } from "./locales";

type Route = {
  pageFile: string; //vue page file path
  all?: string; //url path for all locales
  defaults?: Record<string, string | number | boolean>; //default values for route params
  locales?: Partial<Record<Locales, string>>; //unique url path for each locale
};

export const defaultRouteLocale = Locales.EN;

export enum RouteNames {
  Main = "main",
  SomeRoute = "route-with-params"
}

//Format details: https://router.vuejs.org/guide/essentials/route-matching-syntax.html#custom-regex-in-params
export const routes: Record<RouteNames, Route> = {
  // FEW SAMPLE ROUTES
  [RouteNames.Main]: {
    all: '/',
    pageFile: "index", //real path in project /pages/index.vue
  },

  [RouteNames.SomeRoute]: {
    locales: {
      [Locales.EN]: "/prefix-for-en/:param1",
      [Locales.ES]: "/prefix-for-es/:param1",
      [Locales.RU]: "/:param1/suffix",
    },
    pageFile: "folder/test", //real path in project /pages/folder/test.vue
    defaults: { param1: "today" }, //default value for param1 
  },

};

