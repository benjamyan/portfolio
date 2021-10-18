const Fieldtype = {
	mixins: [window.Storyblok.plugin],
	template: `
    <div>
      <component is="style" type="text/css">
        #htmlAttribsWrapper {
          overflow: hidden;
        }
        #htmlAttribsWrapper > div {
          margin-bottom: 15px; 
        }
        #htmlAttribsWrapper p {
          font-size: 13px;
          margin: 0;
        }
        #htmlAttribsWrapper p span {
          color: grey;
          float: right;
        }
        #htmlAttribsWrapper input,
        #htmlAttribsWrapper textarea{
          width: 100%;
          display: block;
        }
      </component>
      <div id="htmlAttribsWrapper">
        <div>
          <p>ID</p>
          <input v-model="model.id" name="id" placeholder="#id..." maxlength="50" />
        </div>
        <div>
          <p>Class</p>
          <input v-model="model.class" name="class" placeholder=".class ..." maxlength="50" />
        </div>
        <div>
          <p>Datasets</p>
          <textarea v-model="model.datasets" name="datasets" placeholder="data-example=value ..." maxlength="50" />
        </div>
      </div>
    </div>
  `,
	methods: {
		formatDatasets() {
			// console.log(this);
			// const datasets = (' ' + this.model.datasets).slice(1);
			// if (datasets.indexOf(' ') > -1) {

			// }
			// this.model.datasets = datasets.split() 
		},
		initWith() {
			return {
				plugin: 'page_details_plugin',
				id: '',
				class: '',
				datasets: ''
			};
		},
		pluginCreated() {
			console.log('page_details_plugin:created');
		}
	},
	watch: {
		'model': {
			handler: function (value) {
				this.$emit('changed-model', value);
				// if (this.model.datasets.length > 0) {
				//   this.formatDatasets();
				// }
			},
			deep: true
		}
	}
}