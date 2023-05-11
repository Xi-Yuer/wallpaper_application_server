import { Module } from '@nestjs/common'
import { OssService } from './alioss.service'
import { UploadsService } from './upload.service'

@Module({
  imports: [],
  providers: [UploadsService, OssService],
  exports: [UploadsService],
})
export class UploadModule {}
