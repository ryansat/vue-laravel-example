<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{    
    /**
     * login
     *
     * @param  mixed $request
     * @return void
     */
    public function login(Request $request)
    {
        
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        $user = User::where('email', $request->email )->first();

        $userToken = $user->createToken('authToken')->accessToken;

        $user->api_token = $userToken;

        $user->save();

        //if ($hashedPassword && Hash::check($password, $hashedPassword->password)) {
        // if (!$user || Hash::check($request->password, $user->password)==true) {
        //     return response()->json([
        //         'success' => false,
        //         'user' => $user,
        //         'password' => !Hash::check($request->password, $user->password),
        //         'message' => 'Login Failed!',
        //     ]);
        // }

        // $userToken = $user->createToken('authToken')->accessToken;

        // $users = User::where(['email' => $request->email])->first();

        // $users->api_token = $userToken;

        // $users->save();
        
        $apiToken = User::select('api_token')->where('email', $request->email)->get();

        return response()->json([
            'success' => true,
            'message' => 'Login Success!',
            'token'   => $apiToken   
        ]);
    }
    
    /**
     * logout
     *
     * @param  mixed $request
     * @return void
     */
    public function logout(Request $request)
    {
        $removeToken = $request->user()->tokens()->delete();

        if($removeToken) {
            return response()->json([
                'success' => true,
                'message' => 'Logout Success!',  
            ]);
        }
    }
}