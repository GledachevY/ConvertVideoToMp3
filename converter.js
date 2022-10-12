const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');

const main = () => {
    ffmpeg.setFfmpegPath('C:/Users/yavor.gledachev/Downloads/ffmpeg-5.1.2-essentials_build/ffmpeg-5.1.2-essentials_build/bin/ffmpeg.exe')
    const fileNames = fs.readdirSync('./playtube');
    const videoFileNames = fileNames.filter(f => f.includes('mp4'))
    const videos = readVideos(videoFileNames)
}

const readVideos = (fileNames) => {
    const videos = [];

    fileNames.forEach(f => {
        const video = fs.readFileSync(`./playtube/${f}`);
        try {
            ffmpeg(`./playtube/${f}`).toFormat('mp3').on('end', function () {
                console.log('here')

            }).on('error', function (error) {
                console.log(error)
            }).save(`./songs/${f}.mp3`);//path where you want to save your file
            //audioFiles.push(audioFile)
        } catch (error) {
            console.log(error)
        }
    })

    return videos
}

main()

module.exports.converter = main