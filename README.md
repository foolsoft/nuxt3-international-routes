# nuxt3-international-routes
Simple module for creating international routes in Nuxt3. Use module if you wanna routing like:

```
/en/page1     |
/es/pagina1   |=> /pages/page.vue   
/ru/page1     |
```

Tested on all nuxt3 release candidate. Rerun application after each routes config change.

# Using
Add files into you project ;)

# Configure

1) Add needed locales in app/config/locales.ts

2) Create routes in app/config/routes.ts

3) Use "LocaleLink" component for links creating by route name

```
<LocaleLink :route-name="$RouteNames.SomeRoute"
            :route-params="{ param1: 'foo' }">Link to same locale</LocaleLink>
            
<LocaleLink :locale="ru"
            :route-name="$RouteNames.SomeRoute"
            :route-params="{ param1: 'foo' }">Link to RU locale</LocaleLink>
```

or by url string

```
<LocaleLink :route-string="/en/">Main page on EN</LocaleLink>
```

4) Add "DOMAIN" constant in nuxt public runtime config

```
....

runtimeConfig: {
    public: {
        DOMAIN: "https://my.site", //used in "plugins/routes/path" helper function with absolute parameter
    }
}

...
```