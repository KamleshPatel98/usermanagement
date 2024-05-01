<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $users=User::query();
        if(!empty($request['username'])){
            $users=$users->where('username' ,'like', '%'.$request['username'].'%');
            $username=$request['username'];
        }else{
            $username='';
        }

        if(!empty($request['email'])){
            $users=$users->where('email',$request['email']);
            $email=$request['email'];
        }else{
            $email='';
        }

        if(!empty($request['from_date']) && !empty($request['to_date'])){
            $users=$users->whereBetween('created_at',[$request['from_date'] . " 00:00:00", $request['to_date'] ." 23:59:59"]);
            $from_date=$request['from_date'];
            $to_date=$request['to_date'];
        }else{
            $from_date=date('Y-m-d');
            $to_date=date('Y-m-d');
        }
        $users=$users->paginate(1);
        return view('user',compact('users','username','email','from_date','to_date'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $users=User::where('id',$user->id)->get();
        return view('editUser',compact('users'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $request->validate([
            'username' => [
                'string',
                'max:255',
                Rule::unique('users')->ignore($user->id), 
            ],
            'email' => [
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($user->id), // Assuming $user is the currently logged-in user
            ],
            'password'=>'max:12|min:8',
        ]);
        try {
            User::where('id',$user->id)->update(['username'=>$request['username'],
                'email'=>$request['email'],
                'password'=>Hash::make($request['password']),]);
            return redirect()->back()->with('success','User Details Updated Successfully!');
        } catch (\Exception $ex) {
            return redirect()->back()->with('error','User Details Is Not Updated!');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        try {
            User::find($user->id)->delete();
            return redirect()->back()->with('Success','User Details Deleted Successfully!');
        } catch (\Exception $ex) {
            return redirect()->back()->with('error','User Details Is Not Deleted!');
        }
    }
}
