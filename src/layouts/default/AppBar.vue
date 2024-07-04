<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-icon icon="mdi-circle-slice-6" />

      Agenda digital
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="logout">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()

function logout(){
  router.push('/')
}

</script>
