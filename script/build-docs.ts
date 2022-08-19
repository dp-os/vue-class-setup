import fs from 'fs';
import path from 'path';
export function buildDocs() {
    const filename = path.resolve('README.md');
    let list = fs.readFileSync(filename, 'utf-8').split('\n');
    const startRe = /<!-- file:(.*?) start -->/g;
    const endRe = /<!-- file:(.*?) end -->/g;
    let exist = false;
    const newList: string[] = [];
    list.forEach(text => {
        if (exist) {
            if (endRe.test(text)) {
                exist = false;
                const file = newList[newList.length - 1].match(/file:(.*?) /);
                if (file) {
                    const filename = path.resolve(file[1]);
                    let fileText = fs.readFileSync(filename, 'utf-8');
                    const ext = filename.match(/\.([A-z]+)$/);
                    if (ext) {
                        fileText = '```' + (ext[1] || '') + '\n' + fileText + '```';
                    } else {
                        fileText = '```\n' + fileText + '```';
                    }
                    newList.push(fileText);
                }
                newList.push(text);
                return
            }
            return;
        }
        if (startRe.test(text)) {
            exist = true;
        }
        newList.push(text);
    })
    const text = newList.join('\n');
    fs.writeFileSync(filename, text, 'utf-8');
}