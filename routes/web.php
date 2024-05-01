<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

//View Route
Route::view('register','register')->name('registerForm');
Route::view('emailVerify','emailVerify')->name('emailVerify');
Route::view('login','login')->name('login');

//AuthController Route
Route::post('register',[AuthController::class,'register'])->name('register');
Route::post('otpVerify',[AuthController::class,'otpVerify'])->name('otpVerify');
Route::get('logout',[AuthController::class,'logout'])->name('logout');
Route::post('login',[AuthController::class,'login'])->name('loginSubmit');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard',[AuthController::class,'dashboard'])->name('dashboard');
    Route::resource('user',UserController::class);
    Route::get('getUser',[UserController::class,'getUser'])->name('getUser');
});