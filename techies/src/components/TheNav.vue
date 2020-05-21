<template>
  <div class="border-bottom-black">
    <v-app-bar app dark color="primary lighten-1" elevation="3" hide-on-scroll class="pr-6">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <router-link :to="{name:'postsfeed'}" class="router-link">
        <v-toolbar-title class="d-flex align-center ml-4">
          <v-img class="d-inline-block" width="40" src="@/assets/logo.png"></v-img>
          <span class="mx-2 white--text">Techies</span>
        </v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>

      <span class="mr-0 mr-md-12" v-if="!!user">
        <router-link :to="{name:'readinglists'}" class="router-link">
          <v-btn icon class="mx-4 d-none d-md-inline-block">
            <v-icon>mdi-bookmark-multiple-outline</v-icon>
            <v-badge
              class="px-1"
              v-if="user.readingLists.length>0"
              :content="user.readingLists.length"
              :value="user.readingLists.length"
              color="pink"
            ></v-badge>
          </v-btn>
        </router-link>

        <v-btn icon>
          <Dropdown :user="user" />
        </v-btn>
      </span>
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
          <router-link v-if="!!user" :to="{name:'postsfeed'}" class="router-link">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-post-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Posts feed</v-list-item-title>
            </v-list-item>
          </router-link>
          <router-link v-if="!!user" to="/404" class="router-link">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-post-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Posts feed</v-list-item-title>
            </v-list-item>
          </router-link>
          <!-- Logged in menu -->
          <template v-if="!!user">
            <router-link :to="{name:'create'}" class="router-link">
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
            <v-divider class="my-2"></v-divider>
            <!-- Reading lists -->
            <router-link v-if="!!user" :to="{name:'readinglists'}" class="router-link">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-bookmark-multiple-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  Reading Lists
                  <v-badge
                    class="my-0"
                    inline
                    v-if="user.readingLists.length>0"
                    :content="user.readingLists.length"
                    :value="user.readingLists.length"
                    color="pink"
                  ></v-badge>
                </v-list-item-title>
              </v-list-item>
            </router-link>

            <!-- User related -->
            <div v-if="!!user">
              <v-divider class="my-2"></v-divider>
              <router-link :to="{name:'updateprofile'}" class="router-link">
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-card-text-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>
                    Update Profile
                    <v-icon color="error" v-if="user.isNewUser">mdi-exclamation-thick</v-icon>
                  </v-list-item-title>
                </v-list-item>
              </router-link>
            </div>
          </template>
          <template v-if="!!user">
            <Categories @click="drawer=false" />
          </template>
          <!-- Logged out menu -->
          <template v-if="!user">
            <GoogleSignIn />
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
import GoogleSignIn from "@/components/GoogleSignBtn.vue";
import Categories from "@/components/Categories.vue";
import { mapState } from "vuex";
const Dropdown = () =>
  import(/* webpackChunkName: "dropwown" */ "@/components/AvatarDropdown.vue");
export default {
  components: {
    UserInfo,
    SignOut,
    GoogleSignIn,
    Dropdown,
    Categories
  },
  data: () => ({
    drawer: false,
    persistent_lists: [
      {
        name: "Posts Feed",
        link: "postsfeed",
        icon: "mdi-post-outline"
      },
      {
        name: "Update Profile",
        link: "updateprofile",
        icon: "mdi-pencil"
      }
    ],
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
      user: state => state.user.user,
      nav_color: state => state.nav_color
    })
  }
};
</script>
<style scoped>
.border-bottom-black {
  border-bottom: 1px solid black !important;
}
.serif {
  font-family: serif;
}
</style>