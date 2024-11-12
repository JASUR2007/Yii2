<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;

class ExchangeRateMail extends Mailable
{
    public $message;
    public function __construct($message)
    {
        $this->message = $message;
    }

    // Метод для отправки почты
    public function build()
    {
        return $this->view('emails.exchange-rate')
        ->with(['message' => $this->message]);
    }
}
