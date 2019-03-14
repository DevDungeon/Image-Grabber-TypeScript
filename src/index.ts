import axios from 'axios';
import Fs from 'fs';
import Path from 'path';
import url from 'url';
import cheerio from 'cheerio';

function processBody(response: any) {
    const $ = cheerio.load(response.data)
    $('img').each(function (i: number, element: any) {

        let parsedUrl = url.parse(response.config.url)
        let baseUrl = parsedUrl.protocol + "//" + parsedUrl.host

        let imgUrl = "";
        let src = $(element).attr("src");
        if (src[0] == "/") {  // Relative
            imgUrl = baseUrl + src
        } else {
            imgUrl = src
        }

        let splitUrl = imgUrl.split('.')
        let fileExtension = splitUrl[splitUrl.length - 1]

        downloadImage(imgUrl, "image-" + i + "." + fileExtension)

    });
}


export function grabImages(url: string) {
    console.log('Attempting to grab images from: ' + url)
    axios.get(url)
        .then((body) => {
            processBody(body)
        }).catch((err) => console.log(err))
}


async function downloadImage(url: string, filename: string) {

    if (!Fs.existsSync(Path.resolve('images'))) {
        console.log("Could not find directory ./images/ in current directory. Aborting.")
        console.log("Create ./images/ to store downloads.")
        process.exit(1)
    }

    const writer = Fs.createWriteStream(Path.resolve('images', filename))

    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    })
    response.data.pipe(writer)

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve)
        writer.on('error', reject)
    })
}
