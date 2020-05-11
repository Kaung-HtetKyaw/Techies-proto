<template>
  <div>
    <v-app-bar app color="primary lighten-1" hide-on-scroll dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Techies</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" fixed temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Techies</v-list-item-title>
          <v-list-item-subtitle>all at your fingertips</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="my-2"></v-divider>

      <UserInfo v-if="!!user" :user="user" />

      <v-list nav dense>
        <v-list-item-group active-class="primary--text text--accent-4">
          <!-- Persistent menu -->
          <router-link :to="{name:'postsfeed'}" class="router-link">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-post-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Posts feed</v-list-item-title>
            </v-list-item>
          </router-link>
          <!-- Logged in menu -->
          <template v-if="!!user">
            <router-link :to="{name:'create',params:{id:1}}" class="router-link">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-credit-card-check-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Create Post</v-list-item-title>
              </v-list-item>
            </router-link>
            <router-link :to="{name:'user',params:{id:user.uid}}" class="router-link">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-card-text-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-title>My Posts</v-list-item-title>
              </v-list-item>
            </router-link>
          </template>

          <!-- Logged out menu -->
          <template v-if="!user">
            <router-link
              v-for="list in log_out_lists"
              :key="list.name"
              :to="{name:list.link}"
              class="router-link"
            >
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>{{list.icon}}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{list.name}}</v-list-item-title>
              </v-list-item>
            </router-link>
          </template>

          <SignOut v-if="!!user" />
        </v-list-item-group>
        <!-- Sign Out -->
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import UserInfo from "@/components/UserAvatarNav.vue";
import SignOut from "@/components/Signout.vue";
import { mapState } from "vuex";
export default {
  components: {
    UserInfo,
    SignOut
  },
  data: () => ({
    drawer: false,
    log_out_lists: [
      {
        name: "Login",
        link: "login",
        icon: "mdi-account-key-outline"
      },
      {
        name: "SignUp",
        link: "signup",
        icon: "mdi-account-multiple-check-outline"
      }
    ]
  }),
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  }
};
</script>