import { Module } from "@nestjs/common";
import {EventUserLogin} from './events.service'
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
    imports:[EventEmitterModule.forRoot()],
    providers:[EventUserLogin],
    exports:[EventUserLogin],
})
export class UserEventModule {}