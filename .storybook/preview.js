import { setup } from '@storybook/vue3';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

// Configuração do Vuetify
const vuetify = createVuetify({
  components,
  directives,
});

// Adiciona o Vuetify à instância do Vue usada pelo Storybook
setup((app) => {
  app.use(vuetify, VueCal);
  app.use(VueCal);
});

/** @type { import('@storybook/vue3').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
