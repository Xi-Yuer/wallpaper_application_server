import { NestInterceptor, Type } from '@nestjs/common'
import * as path from 'path'
import * as multer from 'multer'
import { FileInterceptor } from '@nestjs/platform-express'
import { MkDirUploads } from 'src/utils/create.dir'

export function FileUploadInterceptorFactory(): Type<
  NestInterceptor<any, any>
> {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      MkDirUploads()
      cb(null, path.join(__dirname, '../../dist/uploads'))
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    },
  })
  return FileInterceptor('file', { storage })
}
