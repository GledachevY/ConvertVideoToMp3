const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const sqlite3 = require('sqlite3')
const { open } = require('sqlite')


const main = async () => {
    const videosInfo = await getVideosInfo()

    ffmpeg.setFfmpegPath('C:/Users/yavor.gledachev/Downloads/ffmpeg-5.1.2-essentials_build/ffmpeg-5.1.2-essentials_build/bin/ffmpeg.exe')
    const fileNames = fs.readdirSync('./playtube');
    const videoFileNames = fileNames.filter(f => f.includes('mp4'))
    convertVideos(videoFileNames, videosInfo)
}

const convertVideos = (fileNames, videosInfo) => {
    fileNames.forEach(f => {
        try {
            let title = videosInfo.find(info => f.includes(info.id))?.title
            if (title?.includes('/')) title = title.replaceAll('/', '-')
            if (title?.includes('|')) title = title.replaceAll('|', '-')
            if (title?.includes(':')) title = title.replaceAll(':', '-')
            if (title?.includes('"')) title = title.replaceAll('"', '-')
            ffmpeg(`./playtube/${f}`).audioQuality(0).toFormat('mp3')
                .on('end', function () {
                    console.log('here')
                }).on('error', function (error) {
                    console.log(error)
                })
                .save(`./songs/${title ? title : f}.mp3`);//path where you want to save your file
        } catch (error) {
            console.log(error)
        }
    })
}

const getVideosInfo = async () => {
    const db = await open({
        filename: 'playTube.db',
        driver: sqlite3.Database
    })

    const videosInfo = await db.all('SELECT * FROM videos')
    return videosInfo
}

main()