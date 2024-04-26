<template>
    <main>
      <NavBar />
  
      <div class="my-5">
        <div class="mx-auto w-25" style="max-width: 100%">
          <h1 class="text-center mb-3">Update User</h1>
          <form @submit.prevent="updateUser">
            <!-- Your form inputs -->
            <div class="row">
              <div class="col-md-12 form-group mb-3">
                <label for="u_name" class="form-label">Name</label>
                <input
                  type="text"
                  name="u_name"
                  id="name"
                  class="form-control"
                  placeholder="Name"
                  required
                  v-model="user.u_name"
                />
              </div>
            </div>
  
            <div class="row">
              <div class="col-md-12 form-group mb-3">
                <label for="dob" class="form-label">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  class="form-control"
                  placeholder="Date of Birth"
                  required
                  v-model="user.dob"
                />
              </div>
            </div>
  
            <!-- <div class="row">
              <div class="col-md-12 form-group mb-3">
                <label for="created_on" class="form-label">Created_on</label>
                <input
                  type="date"
                  name="created_on"
                  id="created_on"
                  class="form-control"
                  placeholder="Created_on"
                  required
                  v-model="user.created_on"
                />
              </div>
            </div> -->
            <!-- Application select dropdown -->
            <div class="row">
              <div class="col-md-12 form-group mb-3">
                <label for="application_name" class="form-label">Application Name</label>
                <select required v-model="applicationName">
                  <option disabled value="">Please select name of the application</option>
                  <option v-for="application in applicationList" :key="application.application_id" :value="application.name">{{ application.name }}</option>
                </select>
              </div>
            </div>
  
            <!-- Submit button -->
            <div class="row">
              <div class="col-md-12 form-group">
                <input
                  type="submit"
                  value="Update"
                  class="btn btn-primary w-100"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  </template>
  
  <script>
  import NavBar from "../components/NavBar.vue";
  
  export default {
    name: "UpdateUser",
    components: {
      NavBar,
    },
    data() {
      return {
        user: {
          u_name: "",
          dob: "",
          created_on: "",
          application_id: "",
          name: "",
        },
        applicationList: [],
        applicationName: "",
      };
    },
    created() {
      this.fetchUserData();
      this.fetchApplicationList();
    },
    methods: {
      fetchUserData() {
        const userId = this.$route.params.id; // Assuming you have the user ID in the route
        fetch(`http://localhost:8081/user/${userId}`)
          .then((response) => response.json())
          .then((data) => {
            this.user = data;
            this.applicationName = data.a.name; // Assuming user data includes application information
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      },
      fetchApplicationList() {
        fetch("http://localhost:8081/application")
          .then((response) => response.json())
          .then((data) => {
            this.applicationList = data;
          })
          .catch((error) => {
            console.error("Error fetching application list:", error);
          });
      },
      updateUser() {
        const userId = this.$route.params.id; // Assuming you have the user ID in the route
        const selectedApp = this.applicationList.find((app) => app.name === this.applicationName);
        if (!selectedApp) {
          console.error("Selected application not found in the list.");
          return;
        }
  
        this.user.a = selectedApp;
  
        fetch(`http://localhost:8081/user/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.user),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("User updated successfully:", data);
            this.$router.push("/viewuser");
          })
          .catch((error) => {
            console.error("Error updating user:", error);
          });
      },
    },
  };
  </script>
  