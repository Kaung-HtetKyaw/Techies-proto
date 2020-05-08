<template>
  <div>
    <v-container>
      <v-row dense>
        <v-col cols="12" sm="12" md="6" offset-md="3">
          <v-card>
            <v-card-title class="primary lighten-1 white--text text-center">Login</v-card-title>
            <v-card-text class="mt-6">
              <v-form ref="form" class="px-2" v-model="valid" lazy-validation>
                <v-text-field outlined v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                <v-text-field
                  type="password"
                  v-model="password"
                  :counter="10"
                  :rules="nameRules"
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
                    @click="validate"
                    rounded
                  >Validate</v-btn>
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
export default {
  mixins: [rules],
  data: () => ({
    valid: true,
    password: "",

    email: "",

    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
    loading: false
  }),

  methods: {
    validate() {
      this.loading = true;
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>