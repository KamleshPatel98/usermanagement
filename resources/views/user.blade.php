@extends('layout.app')

@section('content')
    <div class="card shadow">
        <div class="card-header bg-secondary">
            <h4>User Details</h4>
        </div>
        <div class="card-body">

            <div>
                <form action="{{ route('user.index') }}" method="GET">
                    <div class="row">
                        <div class="col-md-2 mt-1"><label for="">From Date</label>
                            <input type="date" name="from_date" value="{{ $from_date }}" class="form-control">
                        </div>
                        <div class="col-md-2 mt-1"><label for="">To Date</label>
                            <input type="date" name="to_date" value="{{ $to_date }}" class="form-control">
                        </div>
                        <div class="col-md-3 mt-1"><label for="">Userame</label>
                            <input type="text" name="username" value="@isset($username) {{ $username }} @endisset" placeholder="Enter Patient Name" class="form-control">
                        </div>
                        <div class="col-md-3 mt-1"><label for="">Email</label>
                            <input type="text" name="email" value="@isset($email) {{ $email }} @endisset" placeholder="Enter Contact NO." class="form-control">
                        </div>
                        <div class="text-center" style="margin-top:40px;">
                        <div class="col-md-2 mt-1 text-center">
                            {{-- <input type="submit" value="Search" class="btn btn-sm btn-primary"> --}}
                            <button type="submit"  class="btn btn-sm btn-primary">Search</button>
                        </div>
                    </div>
                </form>
            </div>

            <div class="table-responsive mt-3 shadow">
                <table class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>SN.</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>User Role</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($users as $row)
                            <td>{{ $loop->iteration }}</td>
                            <td>{{ $row->username }}</td>
                            <td>{{ $row->email }}</td>
                            <td>{{ $row->userRole }}</td>
                            <td>{{ \Carbon\Carbon::parse($row->created_at)->format('d-m-Y H:i:s') }}</td>
                            <td>
                                <div class="row justify-content-around">
                                    <div>
                                        <a href="{{ route('user.edit',$row->id) }}" class="btn btn-sm btn-warning @if(Auth::user()->userRole=='user') {{ 'disabled' }} @endif"><i class="zmdi zmdi-edit"></i></a>
                                    </div>
                                    <div>
                                        <form action="{{ route('user.destroy',$row->id) }}" method="POST">
                                            @csrf
                                            @method('DELETE')
                                            <button class="btn btn-sm btn-danger @if(Auth::user()->userRole=='user') {{ 'disabled' }} @endif" type="submit" onclick="return confirm('Are You SUre to Delete?')"><i class="zmdi zmdi-delete"></i></button>
                                        </form>
                                    </div>
                                </div>
                            </td>
                        @endforeach
                    </tbody>
                </table>
                {{ $users->links('pagination::bootstrap-5') }}
            </div>
        </div>
    </div>
@endsection