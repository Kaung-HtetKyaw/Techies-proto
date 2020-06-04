<template>
  <div>
    <v-container>
      <v-row dense>
        <v-col cols="12" sm="12" md="6" offset-md="3">
          <v-card>
            <v-card-title class="primary lighten-1 white--text text-center"
              >Login</v-card-title
            >
            <v-card-text class="mt-6">
              <v-form
                ref="form"
                class="px-2"
                v-model="valid"
                @enter="login"
                @submit="login"
              >
                <v-text-field
                  outlined
                  v-model="user.email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                ></v-text-field>
                <v-text-field
                  type="password"
                  v-model="user.password"
                  :counter="20"
                  :rules="passwordRules"
                  label="Password"
                  outlined
                  required
                ></v-text-field>

                <div class="d-flex justify-end">
                  <v-btn
                    outlined
                    :loading="loading"
                    :disabled="!valid"
                    color="info"
                    class="mr-4"
                    @click="login"
                    rounded
                    >Validate</v-btn
                  >
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { rules } from "@/mixins/rules.js";
import store from "@/store/index.js";
export default {
  components: {},
  mixins: [rules],
  data: () => ({
    valid: true,

    user: {
      password: "",
      email: ""
    },

    loading: false
  }),

  methods: {
    login() {
      const login_user = {
        email: this.user.email,
        password: this.user.password
      };
      this.$refs.form.validate();
      if (this.valid) {
        this.loading = true;

        store
          .dispatch("user/signIn", login_user)
          .then(() => {
            this.loading = false;
            this.$router.push({ name: "postsfeed" });
          })
          .catch(() => {
            this.loading = false;
          });
      } else {
        this.loading = false;
      }
    }
  }
};
</script>
