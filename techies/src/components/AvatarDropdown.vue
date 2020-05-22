<template>
  <div class="text-center">
    <v-menu v-model="menu" close-on-content-click :nudge-width="200" offset-x>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-avatar size="40">
            <img :src="user.photoURL" :alt="user.displayName" />
          </v-avatar>
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <router-link :to="{name:'user',params:{id:user.uid}}" class="router-link">
            <v-list-item class="d-flex justify-center align-center">
              <v-list-item-avatar>
                <img :src="user.photoURL" :alt="user.displayName" />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{user.displayName}}</v-list-item-title>
                <v-list-item-subtitle>Joined since {{trimTime}}</v-list-item-subtitle>
              </v-list-item-content>

              <!-- <v-list-item-action>
              <v-btn :class="fav ? 'red--text' : ''" icon @click="fav = !fav">
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              </v-list-item-action>-->
            </v-list-item>
          </router-link>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <router-link :to="{name:'updateprofile'}" class="router-link">
            <v-list-item class="d-flex justify-center">
              <v-btn class="black--text opacity7" text block>
                Update Profile
                <v-icon color="error" v-if="user.isNewUser">mdi-exclamation-thick</v-icon>
              </v-btn>
            </v-list-item>
          </router-link>
          <router-link :to="{name:'create'}" class="router-link">
            <v-list-item class="d-flex justify-center">
              <v-btn class="black--text opacity7" text block>
                <v-icon></v-icon>Create Post
              </v-btn>
            </v-list-item>
          </router-link>

          <router-link :to="{name:'user',params:{id:user.uid}}" class="router-link">
            <v-list-item class="d-flex justify-center">
              <v-btn class="black--text opacity7" text block>
                <v-icon></v-icon>Your Posts
              </v-btn>
            </v-list-item>
          </router-link>

          <v-divider></v-divider>
          <router-link :to="{name:'readinglists'}" class="router-link">
            <v-list-item class="d-flex justify-center">
              <v-btn class="black--text opacity7" text block>
                <v-icon></v-icon>Reading lists
              </v-btn>
            </v-list-item>
          </router-link>
        </v-list>
        <v-divider></v-divider>
        <v-card-actions class="d-flex justify-center">
          <v-btn class="opacity7" text @click="signOut">Sign Out</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { signOut } from "@/mixins/signOut.js";
export default {
  mixins: [signOut],
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    fav: true,
    menu: false,
    message: false,
    hints: true
  }),
  computed: {
    trimTime() {
      return this.user.joined
        .split(" ")
        .slice(1, 4)
        .join(" ");
    }
  }
};
</script>
<style scoped>
.opacity9 {
  opacity: 0.9;
}
.opacity7 {
  opacity: 0.7;
}
</style>