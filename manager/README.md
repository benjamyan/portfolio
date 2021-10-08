## Using the API to add, update, and delete components and stories
We will be using the Storyblok Management API and Storyblok CLI scaffolding library to make changes to our components and stories.


#### Manager CLI basics
`node manager --flags` 
> Use this to run the manager; will upload our schemas and do whatever we want with them.
> Will run a backup prior so that we have a fallback incase of error - file can be found in `../storyblok/backup`

`--action` (required) What you want to do with the schema
- `add`
- `update`
- `delete`

`--type` (optional) The schema type being uploaded
- Currently only supports `component`
- Eventually...
- - `component`
- - `datasource`
- - `content`

`--src` (optional) The filename you want to reference.
- You can upload entire directories by specifying its path
- If this flag is not provided, will use every schema it can find in the `./gatsby/src/` directory


#### Process for adding new components into Storyblok
Storyblok has the ability (with some legwork on our end) to serve up a metric shit-ton of components with varying usage. Because of our schema usage, we don't have to worry about organization. Our schema takes care of it!
1. Create your component file in the proper destination (see above in `Components and Templates`) inside of Gatsby
2. Export your main component function, and build its schema. 
3. Run the CLI and make sure the component is updated within Storyblok
    - From the main directory, run `node manager --action add --type components --src {NEW_COMPONENT_NAME}`
4. You should see the CLI output contain your newly create component
5. Within SB, your component is now usable with your defined schema!
