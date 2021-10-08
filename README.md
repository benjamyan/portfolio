# Storyblok

### ./gatsby
Our front-end. While Storyblok acts as our CMS, Gatsby is what we're using to actually build out everything. If you're building new components, you can just jump in here without worrying about the rest.

### ./manager
This is the folder housing the CLI that engineers will eventually use to add, update and delete component schema's in Storyblok.

### ./storyblok
Anything related to Storyblok; ie plugins, preview code references, datasources, etc. If there isn't a place for it anywhere else, it can most likely go here.

### ./webhooks
Part of the process for building and deploying new pages will be using webhooks to trigger builds on the front-end. This is the place that houses our API for that.