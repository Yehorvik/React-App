import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TaskModule } from './tasks/task.module';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
      ],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log(JSON.stringify(configService));
        return {
          type: 'postgres',
          host: configService.get<string>('database.host', 'localhost'),
          port: configService.get<number>('database.port'),
          username: configService.get<string>('database.user'),
          password: configService.get('database.password'),
          database: configService.get('database.name'),
          entities: [join(__dirname, '**', '*.entity.{ts,js}')],
          synchronize: true,
        };
      },
    }),
    TaskModule,
  ],
})
export class AppModule {}
