<template>
  <main>
    <NavBar />

    <v-container fluid class="my-5">
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card>
            <v-card-title class="text-center">
              <h1>Add User</h1>
            </v-card-title>
            <v-card-text>
              <v-form @submit.prevent="addUser">
                <v-text-field
                  v-model="user.u_name"
                  label="Name"
                  required
                ></v-text-field>
                <!-- <v-text-field
                  v-model="user.dob"
                  label="Date of Birth"
                  type="date"
                  required
                ></v-text-field> -->
                <v-date-picker
                  v-model="user.dob"
                  label="Date of Birth"
                  required
                  color="black"
                
                ></v-date-picker>
                <v-select
                  v-model="applicationName"
                  :items="applicationList"
                  item-title="name"
                  item-value="application_id"
                  label="Application Name"
                  return-object
                  required
                ></v-select>

                <v-btn type="submit" color="light-blue lighten-3" rounded block>
                  Submit
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import moment from "moment";
export default {
  name: "AddUser",
  components: {
    NavBar,
  },
  data() {
    return {
      user: {
        u_name: "",
        dob: null,
        created_on: "",
      },
      applicationList: [],
      applicationName: "",
    };
  },
  created() {
    this.fetchApplicationList();
  },
  methods: {
    fetchApplicationList() {
      fetch("http://localhost:8081/application")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.applicationList = data;
        });
    },
    addUser() {
      debugger;
  //     const dobISO = new Date(this.user.dob).toISOString().split('T')[0];
  // this.user.dob = dobISO;
      // console.log("Date of birth", this.user);
      // // const date = new Date(value);
      // console.log(new Date(this.user.dob).toLocaleDateString("en-US"))
      // this.user.dob = new Date(this.user.dob).toLocaleDateString("en-US")
      // // this.user.dob = new Date(this.user.dob)
      console.log("dob", this.user.dob);
      this.user.a = this.applicationName;
      console.log("User", this.user);
      fetch("http://localhost:8081/adduser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.user),
      }).then((data) => {
        console.log(data);
        this.$router.push("/viewuser");
      });
    },
// updateDob(value) {
//   // const date = moment(value, "YYYY-MM-DD");
//   // const formattedDate = date.format("MM/DD/YYYY"); 
//   // this.user.dob = formattedDate;
// },

  },
};
</script>