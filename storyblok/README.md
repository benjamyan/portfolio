# Pages

## Using Storyblok and the visual builder
Storybloks visual builder allows marketing and designers to see what they're building in real-time.
1. If you haven't already, run `npm install` from this directories parent directory.
2. In your Gatsby dir, navigate to `gatsby-source-storyblok` inside of `gatsby-config.js`
    - Make sure the `accessToken` here matches your selected one in Storyblok
    - To find your Storyblok API token, go to `{YOUR SPACE} > Settings > API-Keys`
2. Run `gatsby develop` or `npm run develop` -- wait for Gatsby to spin up localhost
3. Make sure Storyblok is referencing your gatsby development localhost server
    - Log into Storyblok, and navigate to: `{YOUR SPACE} > Settings > General`
    - In here, you should see `Location (default environment)`

#### Building new pages
1. Navigate to `{YOUR SPACE} > Content > {YOUR DESIRED DOMAIN}`
2. At the top right, hit the `+ ENTRY` button
3. Add in your desired page name, slug, etc.
    - The page template used is restricted to the directory you are in.
4. Start building.
> A page created this way will be built in a custom 404 Gatsby page.
> In the future, we will use the OOB webhook to trigger a gatsby build when a page is published

#### Editing pages
1. Navigate to `{YOUR SPACE} > Content > {THE PAGE YOU WANT TO EDIT}`
2. Open the file, start editing content.
    - The builder on the right hand side will be where you can change your content
    - You can use the visual builder window to select specific items

#### Publishing/unpublishing pages
TODO


# Components
Components in SB: https://www.storyblok.com/docs/guide/essentials/content-structures#component

## Global components
Gives users the ability to change and update content in a single area, and have it be applied everywhere that component is used. The end user should have the ability to add, remove, and change content via a global component.
- `Content/Global`
    - This is the area that the end-user should have access to, and be able to edit content accodingly.
    - User should not be able to make drastic changes; each global component should have specific use-case and application.
        - EG. Sidebars will always be positioned on the right-hand side, be a certain width, etc.
- `Components/Templates/global`
    - This is the reference component; a multi-type field that allows a user to import a specific component into a page.
    - The area where a dev will be able to determine what is available to the user, and what is not.
On no occasion should these fall outside of the Views component definition listed below. Global components should be Container, Presentational, and Smart components only.

## Dynamic components
The main kind of components used throughout; these can be prebuilt (views) or atomic components. What differentiates these are their ability to be referenced anywhere throughout the project, and allow for dynamic content inputs and different use-cases.
- Should have preset content as lorem ipsum to give the user an understanding of how they would look.
- Generally have customizable settings such as Styling, Interactive, and Animation settings.
- Will sometimes have advanced styling, like column layouts, specific interaction settings, etc.

#### Atomic (nestable Blok)
**id**: *36023*, **uuid**: *'b3789d13-e842-4ae2-b945-c0c69789198e'*
- Are the very basic (dumb) components that you will use most often.
- Couldn't find their way out of a paperbag type. 2+2 not know wtf it is.
- Meant to be dynamic, can be boiled down to items like text, images, buttons, etc.
- These components should never be made available directly through a template; they should always be called via a `View`, `Setting`, `Container`, or `Misc.` component.

#### Views (nestable Blok)
**id**: *36027*, **uuid**: *'eee899c0-2dac-47c4-ac65-32fbd8147882'*
- A grouping of components that make up a specific block of code
- Should be used as components with some sort of logic attached to them (smart, presentational, container)
- Should use atomic or settings components as their children
- Are almost always used by `Containers`

#### Misc. (misc)
**id**: *36025*, **uuid**: *'af0b2c67-a839-4e1d-a1bc-98393ae16875'*
- An area housing components that don't match up with any of the others.

#### Containers (nestable Blok)
**id**: *36024*, **uuid**: *'ff1ca82b-ccb7-4009-8189-0d4bc0fbfbab'*
- These are components that house other components. They should only be made available to Templates (see below).
- There only purpose should be to make (and therefor restrict) what the end user cann use and do within a specific section/template.

#### Templates (Content-type)
**id**: *36026*, **uuid**: *'2024b6e7-4ad8-446a-ae14-0fdcf983e9d8'*
- These are the use-case for our components, and how we restrict the usage of components to the end user.
- These will always be container components; they should not apply any logic or presentation
