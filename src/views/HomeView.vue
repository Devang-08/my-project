<template>
  <v-container fluid class="home text-center">
    <v-row justify="center">
      <v-col cols="12">
        <v-card color="indigo" dark>
          <v-card-title class="white--text" size="large"
            >QASolve.ai</v-card-title
          >
        </v-card>
      </v-col>
    </v-row>
    <v-divider class="my-6"></v-divider>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="2">
        <router-link to="/addapp">
          <v-btn color="light-blue-lighten-3" size="large" class="my-4" block
            >Application Form</v-btn
          >
        </router-link>
        <v-divider class="my-2"></v-divider>
        <router-link to="/adduser">
          <v-btn color="light-blue-lighten-3" size="large" class="my-4" block
            >User Form</v-btn
          >
        </router-link>
        <v-divider class="my-2"></v-divider>
        <router-link to="/view">
          <v-btn color="light-blue-lighten-3" size="large" class="my-4" block
            >View all Applications</v-btn
          >
        </router-link>
        <v-divider class="my-2"></v-divider>
        <router-link to="/viewuser">
          <v-btn color="light-blue-lighten-3" size="x-large" class="my-4" block
            >View all Users</v-btn
          >
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HomeView",
};
</script>
