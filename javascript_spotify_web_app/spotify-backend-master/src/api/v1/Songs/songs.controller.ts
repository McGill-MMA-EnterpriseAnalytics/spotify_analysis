import { Controller, Get, Param} from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsDto } from './dto/songs.dto';

@Controller('api/v1/songs')
export class SongsController {
  constructor (private readonly SongsService: SongsService) {}
  @Get()
  getSongs() {
    return this.SongsService.getData();
  }

  @Get('/clusters')
  getClusters() {
    return this.SongsService.getClusters();
  }

  @Get('/:cluster/:number')
  getSongsByCluster(
    @Param('cluster') cluster: string,
    @Param('number') number: number
  ) {
    return this.SongsService.getDataByCluster(cluster, number);
  }
}