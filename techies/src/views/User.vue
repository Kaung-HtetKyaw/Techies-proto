<template>
  <div>
    <v-container fluid class="px-0 py-0">
      <v-row dense class="px-0 py-0">
        <v-col cols="12" sm="12" class="px-0 py-0">
          <v-container fluid class="primary lighten-1 white--text py-10">
            <v-row dense>
              <v-col cols="12" sm="12" md="6" offset-md="3">
                <v-container>
                  <v-row dense class="d-flex justify-center align-center">
                    <v-col cols="12" sm="12" md="5" class="d-flex justify-center">
                      <v-avatar size="120">
                        <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
                      </v-avatar>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="12"
                      md="7"
                      class="d-flex flex-column align-center align-md-start"
                    >
                      <h1 class="display-1 font-weight-medium">Evan You</h1>
                      <h5 class="body-2 opacity7 font-weight-medium mb-2">Joined since May 20,2020</h5>
                      <h5 class="body-2 font-weight-medium opacity9 my-1">evanyu@gmail.com</h5>
                      <h5 class="body-2 font-weight-medium opacity9">
                        <span class="font-weight-bold">1</span> post in total
                      </h5>
                      <v-btn small tile outlined color="white" class="mt-4">
                        <v-icon left>mdi-pencil</v-icon>Edit
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
      <v-row dense class="my-12 px-4">
        <v-col cols="12" sm="12" md="8" offset-md="2">
          <h1 class="headline font-weight-medium text-center">Posts by Evan You</h1>
          <v-divider class="my-4"></v-divider>
          <PostCard />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import PostCard from "@/components/PostCard.vue";
export default {
  components: {
    PostCard
  }
};
</script>

<style scoped>
.header-wrapper {
  height: 200px;
}
.opacity7 {
  opacity: 0.7;
}
.opacity9 {
  opacity: 0.9;
}
.serif {
  font-family: serif;
}
</style>