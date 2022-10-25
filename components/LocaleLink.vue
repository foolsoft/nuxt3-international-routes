<template>
  <NuxtLink :target="target" :to="url"><slot /></NuxtLink>
</template>

<script>
import { Locales } from "~/app/config/locales";

export default {
  props: {
    routeString: {
      type: String,
      default: "",
    },
    routeName: {
      type: String,
      default: "",
    },
    routeParams: {
      type: Object,
      default: {},
    },
    target: {
      type: String,
      default: "_self",
      validator: function (value) {
        return ["_self", "_blank"].indexOf(value) >= 0;
      },
    },
    locale: {
      type: String,
      required: false,
      validator: function (value) {
        return Object.values(Locales).indexOf(value) >= 0;
      },
    },
    useLocaleSuffix: {
      type: Boolean,
      default: undefined,
      required: false,
    },
  },
  computed: {
    linkLocale() {
      return typeof this.locale == "undefined"
        ? this.$routeLocale()
        : this.locale;
    },
    url() {
      return this.routeString !== ""
        ? this.routeString
        : this.$path(
            {
              name: this.routeName,
              locale: this.linkLocale,
            },
            this.routeParams
          );
    },
  },
};
</script>
