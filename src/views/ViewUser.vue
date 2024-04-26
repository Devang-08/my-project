<template>
  <main>
    <NavBar />

    <v-container fluid class="mt-10">
      <v-row justify="center">
        <v-col cols="12">
          <h1 class="text-center">View User</h1>
          <router-link to="/adduser">
            <v-btn color="light-blue lighten-3" rounded>Add User</v-btn>
          </router-link>
          <v-text-field
            v-model="search"
            label="Search"
            placeholder="Search users..."
            clearable
            class="mb-4"
          ></v-text-field>
          <v-data-table
            :headers="headers"
            :items="user"
            item-key="user_id"
            class="elevation-1"
            :search="search"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn
                color="green accent-4"
                class="mx-2"
                @click="goToUpdateUser(item.user_id)"
                >Update</v-btn
              >
              <v-btn
                color="red accent-4"
                class="mx-2"
                @click="deleteUser(item.user_id)"
                >Delete</v-btn
              >
              <!-- <h1>hell0</h1> -->
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import moment from "moment";
export default {
  name: "ViewUser",
  components: {
    NavBar,
  },
  data() {
    return {
      user: [],
      headers: [
        { title: "User Id", align: "start", value: "user_id" },
        { title: "Name", value: "u_name" },
        { title: "Date of Birth", value: "formatted_dob" },
        { title: "Created On", value: "formatted_created_on" },
        { title: "Application Name", value: "a.name" },
        { title: "Actions", value: "actions", sortable: false },
      ],
      search: "",
    };
  },
  computed: {
    filteredUsers() {
      return this.user.filter((item) =>
        Object.values(item).some(
          (value) =>
            value &&
            value.toString().toLowerCase().includes(this.search.toLowerCase())
        )
      );
    },
  },
  beforeMount() {
    this.getUser();
  },

  methods: {
    getUser() {
      fetch("http://localhost:8081/user")
        .then((res) => res.json())
        .then((data) => {
          this.user = data.map((item) => ({
            ...item,
            formatted_created_on: new Date(item.created_on).toLocaleDateString(
              "en-US"
            ),
            formatted_dob: new Date(item.dob).toISOString().split('T')[0],
          }));
          // this.user = data;
          console.log(data);
        });
    },
    goToUpdateUser(userId) {
      this.$router.push(`/updateuser/${userId}`);
    },
    deleteUser(user_id) {
      fetch(`http://localhost:8081/user/${user_id}`, {
        method: "DELETE",
      }).then((data) => {
        console.log(data);
        this.getUser();
      });
    },
  },
};
</script>