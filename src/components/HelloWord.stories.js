import HelloWorld from "./HelloWorld.vue";

export default {
    title: 'Example/Hello',
    component: HelloWorld,
  };
  
  const Template = (args) => ({
    components: { HelloWorld },
    setup() {
      return { args };
    },
    template: '<HelloWorld v-bind="args" />',
  });
  
  export const Default = Template.bind({});
  Default.args = {
    
  };