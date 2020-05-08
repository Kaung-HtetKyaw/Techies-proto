<template>
  <div>
    <v-card class="mx-auto" elevation="0" color="#fff py-0">
      <v-card-title class="py-0 px-0">
        <v-chip class="ma-2" outlined># Server Status</v-chip>
      </v-card-title>

      <v-card-text class="px-0 py-0">
        <v-container fluid>
          <v-row dense class="d-flex flex-sm-column-reverse flex-md-row">
            <v-col cols="12" sm="12" md="8" class="my-1">
              <h2 class="headline font-weight-bold black--text my-2">Vue Composition API</h2>
              <h3
                class="subtitle-1"
              >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad ab consequuntur officiis cumque. Repellendus mollitia in sit? Voluptas dignissimos, facere, blanditiis hic reprehenderit veniam obcaecati quia omnis illum excepturi rerum?</h3>
            </v-col>
            <v-col cols="12" sm="12" md="4" class="d-flex justify-center align-center my-1">
              <v-img contain src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg"></v-img>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions class="py-0">
        <v-container>
          <v-row dense>
            <v-col cols="12" sm="12" md="1" class="justify-center align-center d-none d-md-flex">
              <v-avatar>
                <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
              </v-avatar>
            </v-col>
            <v-col cols="12" sm="12" md="6" class="d-flex flex-column justify-center">
              <h5 class="subtitle-1 font-weight-medium">Evan You</h5>
              <div class="opacity7">
                <span class="body-2">Apr 20,2020</span>
                <span class="mx-1">|</span>
                <span class="body-2">3 mins read</span>
              </div>
            </v-col>
            <v-col
              cols="12"
              sm="12"
              md="5"
              class="d-flex align-center justify-sm-start justify-md-end"
            >
              <div>
                <v-btn icon color="pink">
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                <span class="subheading mr-2">256</span>
              </div>

              <div>
                <v-btn icon color="info">
                  <v-icon>mdi-bookmark-outline</v-icon>
                </v-btn>
                <span class="subheading">45</span>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
    <v-divider class="my-2"></v-divider>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.opacity7 {
  opacity: 0.7;
}
.opacity9 {
  opacity: 0.9;
}
</style>