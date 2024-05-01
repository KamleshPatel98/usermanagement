@extends('layout.app')

@section('content')
    <div class="card shadow">
        <div class="card-header bg-secondary">
            <h4>Update User</h4>
        </div>
        <div class="card-body">
            {{-- alert message --}}
            <x-alert></x-alert>
            @foreach ($users as $row)
                
            @endforeach

            <form action="{{ route('user.update',$row->id) }}" method="POST">
                @csrf
                @method('PUT')
                <div class="form-group">
                    <label>Username</label>
                    <input class="au-input au-input--full" type="text" value="{{ $row->username }}" name="username" placeholder="Username">
                </div>
                <div class="form-group">
                    <label>Email Address</label>
                    <input class="au-input au-input--full" type="email" value="{{ $row->email }}" name="email" placeholder="Email">
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input class="au-input au-input--full" type="password" value="{{ $row->password }}" name="password" placeholder="Password">
                </div>
                <div class="text-center">
                    <button type="submit" class="btn btn-primary">Update</button>
                </div>
            </form>
        </div>
@endsection
