<template>
    <main>
      <NavBar />
  
      <div class="my-5">
        <div class="mx-auto w-25" style="max-width: 100%">
          <h1 class="text-center mb-3">Update Application</h1>
          <form @submit.prevent="updateApplication">
            <div class="row">
              <div class="col-md-12 form-group mb-3">
                <label for="name" class="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  class="form-control"
                  placeholder="Name"
                  required
                  v-model="application.name"
                />
              </div>
            </div>
  
            <div class="row">
              <div class="col-md-12 form-group mb-3">
                <label for="description" class="form-label">Description</label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  class="form-control"
                  placeholder="Description"
                  required
                  v-model="application.description"
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
                  v-model="application.created_on"
                />
              </div>
            </div> -->
  
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
  import NavBar from '../components/NavBar.vue'
  
  export default {
    name: 'UpdateApplication',
    components: {
      NavBar
    },
    data() {
      return {
        application: {
          name: '',
          description: '',
          created_on: ''
        }
      };
    },
    created() {
      this.fetchApplicationDetails();
    },
    methods: {
      fetchApplicationDetails() {
        const id = this.$route.params.id;
        fetch(`http://localhost:8081/application/${id}`)
          .then(res => res.json())
          .then(data => {
            this.application = data;
          })
          .catch(error => {
            console.error('Error fetching application details:', error);
          });
      },
      updateApplication() {
        const id = this.$route.params.id;
        fetch(`http://localhost:8081/application/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.application)
        })
        .then(response => response.json())
        this.$router.push('/view');
      }
    }
  };
  </script>
  