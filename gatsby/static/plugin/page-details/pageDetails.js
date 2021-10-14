const Fieldtype = {
  mixins: [window.Storyblok.plugin],
  template: `
    <div>
      <component is="style" type="text/css">
        #pageDetailsWrapper {
          overflow: hidden;
        }
        #pageDetailsWrapper > div {
          margin-bottom: 15px; 
        }
        #pageDetailsWrapper p {
          font-size: 13px;
          margin: 0;
        }
        #pageDetailsWrapper p span {
          color: grey;
          float: right;
        }
        #pageDetailsWrapper input,
        #pageDetailsWrapper textarea {
          width: 100%;
          display: block;
        }
        #pageDetailsWrapper textarea {
          height: auto;
          min-height: 125px;
        }
        #pageDetailsWrapper .page-image {
          margin: 0;
        }
        #pageDetailsWrapper .page-image p span {
          cursor: pointer;
        }
        #pageDetailsWrapper .page-image p span:hover {
          color: black;
        }
      </component>
      <div id="pageDetailsWrapper">
        <div>
          <p>Title <span v-if="model.title">{{50-model.title.length}} characters left</span></p>
          <input v-model="model.title" name="title" placeholder="Title" maxlength="50" />
        </div>
        <div>
          <p>Description <span v-if="model.description">{{160-model.description.length}} characters left</span></p>
          <textarea v-model="model.description" type="textarea" name="description" placeholder="Description" maxlength="160" />
        </div>
        <div class="page-image">
          <p>Image <span v-if="model.page_image" v-on:click="destroyImage">Remove</span></p>
          <div v-if="!model.page_image">
            <sb-asset-selector :uid="uid" field="page_image">
            </sb-asset-selector>
          </div>
          <div v-else>
            <img v-bind:src="model.page_image" />
          </div>
        </div>
      </div>
    </div>
  `,
  methods: {
    destroyImage() {
      return this.model.page_image = false;
    },
    initWith() {
      return {
        plugin: 'page_details_plugin',
        title: '',
        description: '',
        image: false,
        allPages: {}
      }
    },
    pluginCreated() {
      console.log('page_details_plugin:created');
    }
  },
  watch: {
    'model': {
      handler: function (value) {
        this.$emit('changed-model', value);
      },
      deep: true
    }
  }
}