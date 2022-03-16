import gql from "graphql-tag";

const alertMixin = {
  data() {
    return {
      profiles: [],
      errors: null,
    };
  },
  methods: {
    async getProfiles() {
      try {
        const { data } = await this.queryProfilesAsync();

        this.setProfiles(data.profiles);
        this.setStateErrors(null);
      } catch (error) {
        this.setStateErrors(error);
      }
    },

    async queryProfilesAsync() {
      return await this.$api.query({
        query: gql`
          {
            profiles {
              id
              label
            }
          }
        `,
      });
    },

    setProfiles(profiles) {
      this.profiles = profiles;
    },

    setStateErrors(state) {
      this.errors = state;
    },
  },
};

export default alertMixin;
