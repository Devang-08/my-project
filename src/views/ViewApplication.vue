<template>
  <main>
    <NavBar />

    <v-container fluid class="mt-10">
      <v-row justify="center">
        <v-col cols="12">
          <h1 class="text-center">View Application</h1>
          <router-link to="/addapp">
            <v-btn color="light-blue lighten-3" rounded>Add Application</v-btn>
          </router-link>
        </v-col>
      </v-row>
      <v-text-field
            v-model="search"
            label="Search"
            placeholder="Search applications..."
            clearable
            class="mb-4"
          ></v-text-field>
      <v-data-table
        :headers="headers"
        :items="application"
        item-key="application_id"
        class="elevation-1"
        :search="search"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            @click="goToUpdate(item.application_id)"
            color="green accent-4"
            class="mx-2"
            >Update</v-btn
          >
          <v-btn
            @click="deleteApplication(item.application_id)"
            color="red accent-4"
            class="mx-2"
            >Delete</v-btn
          >
        </template>
      </v-data-table>
    </v-container>
  </main>
</template>

<script>
import NavBar from "../components/NavBar.vue";

export default {
  name: "ViewApplication",
  components: {
    NavBar,
  },
  data() {
    return {
      application: [],
      headers: [
        { title: "Application Id", value: "application_id" },
        { title: "Name", value: "name" },
        { title: "Description", value: "description" },
        { title: "Created On", value: "formatted_created_on" },
        { title: "Actions", value: "actions", sortable: false },
      ],
      search: "",
    };
  },
  computed: {
    filteredApplications() {
      return this.applications.filter((item) =>
        Object.values(item).some(
          (value) =>
            value && value.toString().toLowerCase().includes(this.search.toLowerCase())
        )
      );
    },
  },
  beforeMount() {
    this.getApplication();
  },

  methods: {
    getApplication() {
      fetch("http://localhost:8081/application")
        .then((res) => res.json())
        .then((data) => {
            this.application = data.map((item) => ({
            ...item,
            formatted_created_on: new Date(item.created_on).toLocaleDateString("en-US"),
          }));
          //this.application = data;
          console.log(data);
        });
    },
    goToUpdate(applicationId) {
      this.$router.push(`/update/${applicationId}`);
    },
    deleteApplication(application_id) {
      fetch(`http://localhost:8081/application/${application_id}`, {
        method: "DELETE",
      }).then((data) => {
        console.log(data);
        this.getApplication();
      });
    },
  },
};
</script>