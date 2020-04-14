const yargs = require('yargs');

const helloFresh = require('./services/hello-fresh');

// Parse command-line configurations
const argv = yargs
    .strict(true)
    .usage('Usage: $0 <command> [options]')
    .command('HelloFresh', 'Perform crawling on HelloFresh', function (yargs) {
            return yargs.option('locale', {
                alias: 'l',
                describe: 'Locale to perform crawling on.',
                choices: ['US', 'GB'],
                default: 'US',
                nargs: 1
            });
        }
    )    
    .demandCommand(1, 1, 'Please specify which service should be used')
    .example('$0 HelloFresh -l GB', 'Crawl on HelloFresh and use the GB locale')
    .argv;

console.log(`Performing crawl on ${argv._} using ${argv.locale} locale`);

if(argv._ === 'HelloFresh'){
    helloFresh.crawl(argv)
        .catch(console.error)
        .finally(() => {
            console.log('The crawling process has completed. Press enter to exit...');
            process.stdin.resume();
            process.stdin.on('data', process.exit.bind(process, 0));
        });
}
