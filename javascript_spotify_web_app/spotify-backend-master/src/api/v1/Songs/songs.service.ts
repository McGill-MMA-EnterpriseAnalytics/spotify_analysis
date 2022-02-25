import { Injectable } from '@nestjs/common';
import { SongsDto } from './dto/songs.dto';
import * as fs from 'fs';
import * as csv from 'csv-parser';
const CSVFile_PATH = 'src/categorized_spotify_songs.csv';

@Injectable() 

export class SongsService {

  public static readCSVFile(file_path: string) {
    const songs = [];

    fs.access(file_path, fs.constants.R_OK, (err) => {
      console.log(`${file_path} ${err ? 'is not readable' : 'is readable'}`);
    });

    return new Promise((resolve, reject) => {
      fs.createReadStream(file_path)
      .pipe(csv())
      .on('error', error => {
        reject(error);
      })
      .on('data', function (row) {
        const song: SongsDto = {
          name: row.name,
          artists: row.artists,
          year: row.year,
          cluster: row.Cluster
        };

        songs.push(song);
      })

      .on('end', function () {
        resolve(songs);
      })
    })
  };

  public async getData() {
    try {
      const songs = await SongsService.readCSVFile(CSVFile_PATH);
      return songs;
    } catch(error) {
      console.log('error', error);
    }
  }

  public async getClusters() {
    try {
      const songs = await SongsService.readCSVFile(CSVFile_PATH);
      const clusters = [];
      Array.isArray(songs) && songs.forEach(
        (song) => {
          if (!clusters.includes(song['cluster'])) {
            clusters.push(song['cluster']);
          }
        }
      )
      
      const result = [];
      const ImageList = [
        'https://i.ytimg.com/vi/0CWUFzbXVJg/maxresdefault.jpg',
        'https://i.ytimg.com/vi/e1FM3KmIyXw/maxresdefault.jpg',
        'https://i.ytimg.com/vi/05689ErDUdM/maxresdefault.jpg',
        'https://www.cmuse.org/wp-content/uploads/2020/06/Characteristics-of-Country-Music.jpg',
        'https://www.rollingstone.com/wp-content/uploads/2018/06/rs-27086-rectangle.jpg',
        'https://cahutefit.files.wordpress.com/2016/10/workout-music-bw-3.jpg',
        'https://images.medicinenet.com/images/article/main_image/what-is-the-best-music-to-listen-to-when-sleeping.jpg'
      ]
      for (let i = 0; i < clusters.length; i++) {
        const clusterObj = {};
        clusterObj['name'] = clusters[i];
        clusterObj['image'] = ImageList[i];
        result.push(clusterObj);
      }

      return result;
    } catch(error) {
      console.error('error', error);
    }
  }

  public async getDataByCluster(cluster: string, number: number) {
    try {
      const songs = await SongsService.readCSVFile(CSVFile_PATH);
      const filteredSongs = Array.isArray(songs) && songs.filter((song) => song['cluster'] === cluster);
      const shuffled = Array.isArray(filteredSongs) && filteredSongs.sort(function(){return .5 - Math.random()});
      const selected=shuffled.slice(0,number);
      console.table(selected);
      return selected;
    } catch(error) {
      console.error('error', error);
    }
  }
}