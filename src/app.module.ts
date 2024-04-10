import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { User } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { UserRoles } from './roles/user-roles.model';
// import { AuthModule } from './auth/auth.module';
import { PaymentsModule } from './payments/payments.module';
import { Role } from './roles/roles.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:`.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PSW,
      database: process.env.DB_NAME,
      models: [User, Role, UserRoles],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    // AuthModule,
    PaymentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
