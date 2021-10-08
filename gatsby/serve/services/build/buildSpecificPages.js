module.exports = async function buildSpecificPages(reqObject) {
    console.log("buildSpecificPages");
    console.log(reqObject);
    //
    // Below is just for testing this works
    await new Promise(
        resolve => setTimeout(resolve, 10000)
    );
    return;
};

module.storyblokObject = {
    id: 500,
    name: 'Build SEO pages',
    description: 'Run the SEO page build for a specific environment',
    task_type: 'webhook',
    webhook_url: 'SERVER/build/seo',
    user_dialog: {
        name: {
            type: "text",
            display_name: "What's your name?"
        },
        environment: {
            display_name: "Which environment?",
            type: "option",
            options: [
                {
                    name: "All",
                    value: "airports::routes"
                },
                {
                    name: "Airports",
                    value: "airports"
                },
                {
                    name: "Routes",
                    value: "routes"
                }
            ]
        }
    }
};