<template>
  <main>
    <NavBar />

    <v-container fluid class="my-5">
      <v-row justify="center">
        <v-col cols="12" sm="6" md="4">
          <v-card>
            <v-card-title class="text-center">
              <h1>Add Application</h1>
            </v-card-title>
            <v-form @submit.prevent="addApplication">
              <v-text-field
                v-model="application.name"
                label="Name"
                required
              ></v-text-field>
              <v-text-field
                v-model="application.description"
                label="Description"
                required
              ></v-text-field>
              <v-btn type="submit" color="light-blue lighten-3" rounded block
                >Submit</v-btn
              >
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>
import NavBar from "../components/NavBar.vue";

export default {
  name: "AddApplication",
  components: {
    NavBar,
  },
  data() {
    return {
      application: {
        name: "",
        description: "",
        created_on: "",
      },
    };
  },
  methods: {
    addApplication() {
      fetch("http://localhost:8081/addapp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.application),
      }).then((data) => {
        console.log(data);
        this.$router.push("/view");
      });
    },
  },
};
</script>