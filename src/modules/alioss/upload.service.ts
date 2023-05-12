import { HttpException, Injectable } from '@nestjs/common'
import { unlinkSync } from 'fs'
import { UploadPath } from 'src/config/oss.config'
import { OssService } from './alioss.service'

@Injectable()
export class UploadsService {
  constructor(private readonly ossService: OssService) {}
  /**
   *
   * @param file 文件
   * @param path 删除原来的文件
   * @returns 文件路径地址
   */
  async upload(file: Express.Multer.File, path?: string) {
    try {
      const fileName =
        new Date().getTime() +
        Math.floor(Math.random() * 10000) +
        '_wallpaper_' +
        file.originalname
      const ossUrl = await this.ossService.putOssFile(
        fileName,
        __dirname + UploadPath + file.originalname,
      )
      unlinkSync(__dirname + UploadPath + file.originalname)

      if (path) {
        await this.ossService.deleteFileByName(path)
      }

      return ossUrl
    } catch (error) {
      throw HttpException
    }
  }

  async delete(path: string) {
    try {
      return await this.ossService.deleteFileByName(path)
    } catch (error) {
      throw HttpException
    }
  }
}
