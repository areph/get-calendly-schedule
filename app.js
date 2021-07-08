'use strict';

const program = require('commander');
const superagent = require('superagent');
const dayjs = require('dayjs');

program
  .version('0.0.1')
  .requiredOption('-t, --event_type <type>', 'set calendly event_type')
  .requiredOption('-s, --start_date <type>', 'set startdate ex) 2021-07-11')
  .requiredOption('-e, --end_date <type>', 'set enddate ex) 2021-07-12')
  .parse(process.argv);

const options = program.opts();
if (!options.event_type || !options.start_date || !options.end_date) {
  return;
}

(async () => {
  try {
    const url = `https://calendly.com/api/booking/event_types/${options.event_type}/calendar/range`;
    const query = {
      timezone: 'Asia/Tokyo',
      diagnostics: false,
      range_start: options.start_date,
      range_end: options.end_date,
    };
    const response = await superagent.get(url).query(query);
    const days = JSON.parse(response.text)['days'];
    for (const day of days) {
      console.log('----', day['date'], '----');
      day['spots']
        .flatMap((x) => x['start_time'])
        .map((x) => console.log(dayjs(x).format('HH:mm')));
    }
  } catch (error) {
    console.log(error.response.body);
  }
})();
