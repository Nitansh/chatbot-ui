import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { chatResponse } from '../schemas/chatResponse';
import { message } from '../schemas/message';

import { ChatbotService } from '../services/chatbot/chatbot.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  response!: chatResponse;
  constructor(private _ngZone: NgZone, private chatbotService: ChatbotService) {}

  @ViewChild('autosize')
  autosize!: CdkTextareaAutosize;

  public query:string = '';
  public messages: Array<message> = [];
  
  getChatbotResponse(): void {
    const queryPayload = { query : this.query }
    this.chatbotService.getResponse( queryPayload )
        .subscribe(
          (response: chatResponse) => {
            this.messages.push( {...queryPayload, ...response } );
            this.query = '';
          }
        );
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }
}
