/*
Specifies pages to be built
Webhook URL looks like: 
*
Ex. object for publishing/unpublishing 
webhook available in `SPACE > Settings > Webhooks`
{
    text: 'The user ben.yannella@surfair.com published the Story Home (surfair/)\n' +
    'https://app.storyblok.com/#!/me/spaces/122513/stories/0/0/66347343',
    action: 'published',
    space_id: 122513,
    story_id: 66347343
}
*
Example of an SEO page build task
Webhook found under `SPACE > Tasks > Build SEO pages`
{
  task: { id: 14562, name: 'Build SEO pages' },       
  text: 'The user ben.yannella@surfair.com executed the task Build SEO pages',
  action: 'task_execution',
  space_id: 122513,
  dialog_values: { name: 'something ', environment: 'routes' }
}
*/

const express   = require('express');
const router    = express.Router();
// const build     = require('../services/build');

router.post('/', (req, res, next) => {
    // https://a0658f57abf0.ngrok.io/build/
    if (req.body) {
        console.log(req.body);
        res.send('200 - OK');
    } else {
        res.send('400 - Error');
    };
});

router.post('/project', (req, res, next) => {
    // https://a0658f57abf0.ngrok.io/build/project
    if (req.body) {
        console.log(req.body);
        res.send('200 - OK');
    } else {
        res.send('400 - Error');
    };
});

module.exports = router;