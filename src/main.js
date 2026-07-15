import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

// إعداد Vuetify والمظهر الداكن
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "dark", // سمة سوداء لتشعر بأجواء الرعب والتشويق
    themes: {
      dark: {
        colors: {
          primary: "#E50914", // اللون الأحمر النيتفلكسي المثير
          secondary: "#1A1A1A",
          background: "#0F0F0F",
          surface: "#1E1E1E",
        },
      },
    },
  },
});

const app = createApp(App);
app.use(createPinia());
app.use(vuetify);
app.mount("#app");
