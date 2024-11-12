<?php
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;
use App\Mail\ExchangeRateMail;
use App\Models\User;

Route::post('/contacts/{user}/send-email', function (User $user) {
    $subject = "Hello from Laravel!";
    $message = "Dear {$user->first_name},\nThis is a test message from Laravel.";

    Mail::raw($message, function ($mail) use ($user, $subject) {
        $mail->to($user->email)
            ->subject($subject);
    });

    return redirect()->route('contacts.index')->with('success', 'Email sent successfully to ' . $user->email);
})->name('contacts.sendEmail');
Route::get('/contacts', function () {
    $users = User::all();
    return view('contact_table', compact('users'));
})->name('contacts.index');

Route::post('/contacts', function (Request $request) {
    $request->validate([
        'first_name' => 'required|string|max:255',
        'last_name' => 'required|string|max:255',
        'phone' => 'required|string|max:255',
        'email' => 'required|email|max:255',
    ]);

    User::create($request->all());

    return redirect('/contacts');
})->name('contacts.store');

Route::get('/contacts/{contact}/edit', function ($id) {
    $contact = User::findOrFail($id);
    return view('edit_contact', compact('contact'));
})->name('contacts.edit');

Route::delete('/contacts/{contact}', function ($id) {
    $contact = User::findOrFail($id);
    $contact->delete();
    return redirect('/contacts');
})->name('contacts.destroy');

