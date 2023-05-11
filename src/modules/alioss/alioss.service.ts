import * as OSS from 'ali-oss';
import { HttpException, Injectable } from '@nestjs/common';
import { OSS_Config } from 'src/config/oss.config';

@Injectable()
export class OssService {
  private client: any;
  public constructor() {
    this.client = new OSS({
      accessKeyId: OSS_Config.accessKeyId,
      accessKeySecret: OSS_Config.accessKeySecret,
      region: OSS_Config.region,
      bucket: OSS_Config.bucket,
    });
  }
  // 上传文件到oss 并返回  图片oss 地址
  public async putOssFile(ossPath: string, localPath: string): Promise<string> {
    let res: any;
    try {
      res = await this.client.put(ossPath, localPath);
      // 将文件设置为公共可读
      await this.client.putACL(ossPath, 'public-read');
    } catch (error) {
      console.log(error);
    }
    return res.url;
  }
  /**
   * 获取文件的url
   * @param filePath
   */
  public async getFileSignatureUrl(filePath: string): Promise<string> {
    if (filePath == null) {
      console.log('get file signature failed: file name can not be empty');
      return null;
    }
    let result = '';
    try {
      result = this.client.signatureUrl(filePath, { expires: 36000 });
    } catch (err) {
      console.log(err);
    }
    return result;
  }
  /**
   * 上传文件大小校验
   * @param localPath
   * @param ossPath
   * @param size
   */
  public async validateFile(
    ossPath: string,
    localPath: string,
    size: number,
  ): Promise<string> {
    if (size > 5 * 1024 * 1024) {
      return;
    } else {
      return await this.putOssFile(ossPath, localPath);
    }
  }

  public async deleteFileByName(path: string) {
    try {
      return await this.client.delete(path);
    } catch (error) {
      throw HttpException;
    }
  }
}
