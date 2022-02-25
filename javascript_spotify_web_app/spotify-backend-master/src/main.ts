import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config'
async function bootstrap() {
  const app = await NestFactory.create(AppModule, 
    {cors: {
      "origin": "https://8potify.netlify.app",
      "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
      "preflightContinue": false,
      "optionsSuccessStatus": 204
    }});


  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  
  console.log(port)
  await app.listen(port || 5000);
}
bootstrap();
