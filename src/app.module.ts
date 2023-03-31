import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env['MONGO'] ?? process.env.MONGO;

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(MONGO_URI)
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
