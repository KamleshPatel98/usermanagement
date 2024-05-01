<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Hash;
use Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'username' => 'developer',
            'email' => 'developer@gmail.com',
            'email_verified_at' => now(),
            'password' => Hash::make(12345678),
            'userRole'=>'admin',
            'remember_token' => Str::random(10),
        ]);
    }
}
