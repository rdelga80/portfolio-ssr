<template>
  <v-layout
    column
    justify-center>
    <v-form @submit.prevent="submitUser">
      <v-container>
        <v-row
          flex
          align-content-center>
          <v-col
            cols="4"
            md="8">
            <v-card
              class="pa-2"
              tile
              outlined>
              <v-text-field
                v-model="user.email"
                label="Email"/>

              <v-text-field
                v-model="user.password"
                label="Password"/>

              <v-btn type="submit">
                Submit
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-layout>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    user: {
      email: undefined,
      password: undefined
    }
  }),
  methods: {
    submitUser() {
      console.log('submit')
    }
  }
}
</script>
