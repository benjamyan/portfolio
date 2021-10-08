# Our front-end
We're using Gatsby for our front-end. 

## Component technical-name naming conventions
Your field keys are what Gatsby will use as a reference to lookup our specific components on the front-end. A basic field name works like:
`{component-type}_{gatsby-parent-directory}_{component-name-seperated-with-underscores}`
So the above would translate out to...
`atomic_content_text_content` or `views_blocks_multi_column_content`
Note: The only components these naming conventions do not apply to are the `Settings` component.

## Component block imports naming conventions
These are the individual child component block fields that you call within a component schema. An example of this would be `containers_sections_basic_content_section`. Inside of this component, we call `content`, `background`, `settings`, and `name`. 
These names are used within Gatsby, and have no bearing on Storyblok. They should be short and sweet, and used to identify it's child content/components/data. If you're using one block to call buttons, text content, and media content, you would use something like `content`. If it's something housing your background content, you could use `background`.

## Building new dynamic components
1. Start your new component in the relevent directory.
    - `./src/components` houses our atomic/dumb components. 
    - `./src/views` is the umbrella folder for our views, containers, and settings components. If your new component is using some sort of logic, or acting as an in-between from a template to an atomic compoonent, it most likely goes here.
    - ./src/pages/_templates` is housing our page templates, and related logic.
2. Once you've created your component file, create your schema and get it into Storyblok.
    - https://www.storyblok.com/docs/guide/essentials/content-structures#component
    a. You can do this directly in Storyblok via the UI.
    b. Use the component schema and our manager CLI. Navigate to `../manager` and run the command that best suits your needs. See below for in-file schema guideslines
3. Once your schema is up, make note of the `technical_name`, you'll need this later
4. Spin up your Gatsby dev environment by using `npm run develop` in this directory.
    - If you're unsure of this step, navigate to `../storyblok/README.md` under the 'Using Storyblok and the visual builder' section.
5. Once your env is up and running, create a new page in the main `Content` directory and use the `Dev testing area` content-type.
    - If the component is not available, you can bring the component into the `testing_content_section` component and use it there.
6. Most likely, your view is broken, or you've got an error box saying the component hasn't been made available yet. To fix this...
    1. In the `./gatsby/src` directory, navigate to `dictionary.js`
    2. Import your component (if it isn't already), and create a new key/value pair.
    3. Use the string you noted from step 3 as the key, and your component as the value
7. You should be seeing your component live at this point, and be able to start building.

## Architecting your component schema, and translating it to the front-end
When you're building your components in Gatsby, you'll realize the lines get blurred on when to use a resolver, and when to call an individual component when handling a JSON object. If you want to just drop all of the components and their content into a div and call it a day, call a resolver. If you want to do something special (adding styling, giving it a wrapper, etc.) then you would call the component inidividually.

## In-file Storyblok Schema's
A few rules when you're using SB schema's inside your component files:
1. Try to keep them at the end of your file.
2. The Manager CLI parses files for a specific declaration; start you schema like so:
```
    export const storyblok = [
        {
            ...your schema here
            sb_schema_id: 0
        },
        {
            ...and so on...
            sb_schema_id: 0
        }
    ];
```
3. When starting a new schema, you need to place `sb_schema_id: 0` somewhere within it (including the space before 0). This is so when you add the component schema, it can be replaced with the proper ID.

## Common problems...

#### Webpack is breaking when starting the Gatsby development process
1. Run `npm update` where your node_modules for the front-end are.
2. Run through your component structure for broken returns.