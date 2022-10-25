# nuxt3-international-routes
Simple module for creating international routes in Nuxt3

Tested on all nuxt3 release candidate. Rerun application after each routes config change.

# Using
Add files into you project ;)

# Configure

1) Add needed locales in app/config/locales.ts

2) Create routes in app/config/routes.ts

3) Use <LocaleLink> component for links creating

4) Add DOMAIN constatnt in nuxt public runtime config

```
....

runtimeConfig: {
    public: {
        DOMAIN: "https://my.site", //used in "plugins/routes/path" helper function with absolute parameter
    }
}

...
```