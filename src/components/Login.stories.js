
import Calendario from "./Calendario.vue";

export default {
    title: 'Example/Login',
    component: Calendario,
  };
  
  const Template = (args) => ({
    components: { Calendario },
    setup() {
      return { args };
    },
    template: '<Calendario v-bind="args" />',
  });
  
  export const Default = Template.bind({});
  Default.args = {
    
  };