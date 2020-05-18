<template>
  <div class="mt-12">
    <v-container>
      <v-row dense>
        <v-col cols="12" sm="12" class="d-flex justify-center align-center">
          <h1 class="display-4 font-weight-bold">404</h1>
        </v-col>
        <v-col cols="12" sm="12" class="d-flex justify-center align-center">
          <h1 class="display-3 font-weight-bold opacity6 text-center">We couldn't find this page</h1>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          class="d-flex flex-column justify-center align-center my-12 opacity6"
        >
          <p>May be it's out there somewhere....</p>
          <p>
            You can always find insightful stories on our
            <router-link :to="{name:'postsfeed'}">homepage</router-link>
          </p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style>
.opacity9 {
  opacity: 0.9;
}
.opacity6 {
  opacity: 0.6;
}
</style>