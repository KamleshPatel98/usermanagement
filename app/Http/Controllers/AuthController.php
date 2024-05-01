<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Mail\VerifyMail;
use Mail;
use Hash;
use Auth;

class AuthController extends Controller
{
    public function register(Request $request){
        //return $request->all();
        $request->validate(['username'=>'required|max:70|unique:users,username',
            'email'=>'required|max:70|unique:users,email',
            'password'=>'required|max:12|min:8|confirmed']);
        try{
            $username=$request['username'];
            $email=$request['email'];
            $password=$request['password'];
            $otp=rand(111111,999999);
            session()->put('email',$email);
            session()->put('otp',$otp);
            session()->put('password',$password);

            //mail send for email verification
            $verifyMail=['title'=>'Verify Mail',
                'user'=>$username,
                'otp'=>$otp];
            Mail::to($email)->send(new VerifyMail($verifyMail));

            User::create(['username'=>$username,
                'email'=>$email,
                'password'=>Hash::make($request['password'])]);
            return redirect()->route('emailVerify');

        }catch(\Exception $ex){
            return $ex;
            return redirect()->back()->with('error','Email IS Not Send!');
        }
    }

    public function otpVerify(Request $request){
        $otp=session()->get('otp');
        $email=session()->get('email');
        $password=session()->get('password');
        
        if($otp == $request['otp']){
            try {
                User::where('email',$email)->update(['email_verified_at'=>date('Y-m-d H:i:s')]);
                Auth::attempt(['email' => $email, 'password' => $password]);
                return redirect()->route('dashboard')->with('success','Login Successfully!');
            } catch (\Excception $ex) {
                return $ex;
                return redirect()->back()->with('error','Verify Not successfully!');
            }
        }else{
            return redirect()->back()->with('error','Otp Is Not Match!');
        }
    }

    public function dashboard(){
        $totalUser=User::count();
        return view('dashboard',compact('totalUser'));
    }

    public function login(Request $request){
        $request->validate(['username'=>'nullable|max:70|exists:users,username',
            'email'=>'nullable|max:70|exists:users,email',
            'password'=>'required|max:12|min:8']);
        $username=$request['username'];
        $email=$request['email'];
        $password=$request['password'];
        if(!empty($email)){
            $email_verified_at=User::where('email',$email)->pluck('email_verified_at')->first();
            if(empty($email_verified_at)){
                return redirect()->back()->with('error','Your Email Is Not Verified!');
            }else{
                if(Auth::attempt(['email' => $email, 'password' => $password,]) && !empty('email_verified_at')){
                    return redirect()->route('dashboard')->with('success','Login Successfully!');
                }else{
                    return redirect()->back()->with('error','Your Credentials Are Not Valid!');
                }
            }
        }else{
            $email_verified_at=User::where('username',$username)->pluck('email_verified_at')->first();
            if(empty($email_verified_at)){
                return redirect()->back()->with('error','Your Email Is Not Verified!');
            }else{
                if(Auth::attempt(['username' => $username, 'password' => $password]) && !empty('email_verified_at')){
                    return redirect()->route('dashboard')->with('success','Login Successfully!');
                }else{
                    return redirect()->back()->with('error','Your Credentials Are Not Valid!');
                }
            }
        }
    }

    public function logout(){
        session()->flush();
        Auth::Logout();
        return redirect()->route('login')->with('success','Logout Successfully!');
    }
}
