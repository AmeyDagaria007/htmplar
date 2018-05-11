/**
 * build
 **/

const path = require('path');
const defaultCfg = require('../.htmplarrc.json');
const {source, output, extension}  = require('rc')('htmplar', defaultCfg);
const {walkSync} = require('./walker');
const {store} = require('./write');
const {transform} = require('./transform');

const build = () => {
    const files = walkSync(source);

    files.forEach(file => {
        let t = transform(file.path);

        if (t !== null) {
            let name = `${file.file.replace(/\.[^/.]+$/, '')}.${extension}`;
            let dir = path.join(process.cwd(), output, file.dir.replace(source, ''));

            store(t, {name, dir});
        }
    });
};

module.exports = build;

