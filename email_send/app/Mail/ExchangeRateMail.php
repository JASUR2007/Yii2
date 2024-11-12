<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ExchangeRateMail extends Mailable
{
    use Queueable, SerializesModels;

    public $messageContent;

    public function __construct($messageContent)
    {
        $this->messageContent = $messageContent;
    }
    public function build()
    {
        return $this->view('emails.exchange-rate') 
                    ->with([
                        'message' => $this->messageContent,
                    ]);
    }
}
