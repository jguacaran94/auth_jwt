import { Injectable, NestMiddleware, UnauthorizedException, HttpService } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private http: HttpService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      throw new UnauthorizedException()
    }

    const validateToken = await this.http.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`).toPromise().then((response) => {
      req.user = {
        email: response.data.email,
        name: response.data.name
      }
    }).catch((error) => {
      throw error
    })

    next();
  }
}
