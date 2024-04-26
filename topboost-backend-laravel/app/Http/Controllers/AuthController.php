<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserVerifyCode;
use App\Models\UserResetCode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class AuthController extends Controller
{
	public function register(Request $request)
	{
		$fields = $request->validate([
			'name' => 'required|string|unique:users',
			'email' => 'required|string|unique:users,email',
			'password' => 'required|string'
		]);

		if (!$user = User::create([
			'name' => $fields['name'],
			'email' => $fields['email'],
			'password' => Hash::make($fields['password'])
		])) {
			return response([
				'message' => 'fail'
			], 401);
		} else {
			$code = $this->randomCode();
			if (!UserVerifyCode::create(['code' => $code, 'user_id' => $user['id'], 'ip' => $request->ip()])) {
				$code = null;
				unset($code);
			}
		}

		$token = $user->createToken('token')->plainTextToken;

		$cookie = cookie('jwt', $token, 60 * 24);

		$response = [
			'user' => $user,
			'message' => "success"
		];

		if ($code) {
			$redirect_url = "https://topboost.net/verify/" . $code;
			require base_path("vendor/autoload.php");
			$mail = new PHPMailer(true);
			try {
				// $mail->SMTPDebug = SMTP::DEBUG_SERVER;
				$mail->isSMTP();
				$mail->Host = 'mail.topboost.net';
				$mail->SMTPAuth = true;
				$mail->Username = 'no-replay@topboost.net';
				$mail->Password = 'W525uSA5';
				$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
				$mail->Port = 587;
				$mail->setFrom('no-replay@topboost.net', 'TopBoost');
				$mail->addAddress($fields['email']);

				// $mail->addAttachment('/var/tmp/file.tar.gz');
				// $mail->addAttachment('/tmp/image.jpg', 'new.jpg');

				$mail->isHTML(true);
				$mail->Subject = 'topboost.net';
				$mail->Body = '<!DOCTYPE htmlPUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta name="viewport" content="width=device-width, initial-scale=1.0"/><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/><title>Verify your email address</title><style type="text/css" rel="stylesheet" media="all">*:not(br):not(tr):not(html){font-family: Arial, \'Helvetica Neue\', Helvetica, sans-serif;-webkit-box-sizing: border-box;box-sizing: border-box;}body{width: 100% !important;height: 100%;margin: 0;line-height: 1.4;background-color: #F5F7F9;color: #839197;-webkit-text-size-adjust: none;}a{color: #414EF9;}.email-wrapper{width: 100%;margin: 0;padding: 0;background-color: #F5F7F9;}.email-content{width: 100%;margin: 0;padding: 0;}.email-masthead{padding: 25px 0;text-align: center;}.email-masthead_logo{max-width: 400px;border: 0;}.email-masthead_name{font-size: 16px;font-weight: bold;color: #839197;text-decoration: none;text-shadow: 0 1px 0 white;}.email-body{width: 100%;margin: 0;padding: 0;border-top: 1px solid #E7EAEC;border-bottom: 1px solid #E7EAEC;background-color: #FFFFFF;}.email-body_inner{width: 570px;margin: 0 auto;padding: 0;}.email-footer{width: 570px;margin: 0 auto;padding: 0;text-align: center;}.email-footer p{color: #839197;}.body-action{width: 100%;margin: 30px auto;padding: 0;text-align: center;}.body-sub{margin-top: 25px;padding-top: 25px;border-top: 1px solid #E7EAEC;}.content-cell{padding: 35px;}.align-right{text-align: right;}h1{margin-top: 0;color: #292E31;font-size: 19px;font-weight: bold;text-align: left;}h2{margin-top: 0;color: #292E31;font-size: 16px;font-weight: bold;text-align: left;}h3{margin-top: 0;color: #292E31;font-size: 14px;font-weight: bold;text-align: left;}p{margin-top: 0;color: #839197;font-size: 16px;line-height: 1.5em;text-align: left;}p.sub{font-size: 12px;}p.center{text-align: center;}.button{display: inline-block;width: 200px;background-color: #414EF9;border-radius: 3px;color: #ffffff;font-size: 15px;line-height: 45px;text-align: center;text-decoration: none;-webkit-text-size-adjust: none;}.button--green{background-color: #28DB67;}.button--red{background-color: #FF3665;}.button--blue{background-color: #414EF9;color: #FFFFFF;}@media only screen and (max-width: 600px){.email-body_inner,.email-footer{width: 100% !important;}}@media only screen and (max-width: 500px){.button{width: 100% !important;}}</style></head><body><table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center"><table class="email-content" width="100%" cellpadding="0" cellspacing="0"><tr><td class="email-masthead"><a class="email-masthead_name">topboost.net</a></td></tr><tr><td class="email-body" width="100%"><table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0"><tr><td class="content-cell"><h1>Verify your email address</h1><p>Thanks for signing up! We\'re excited to have you as an early user.</p><table class="body-action" align="center" width="100%" cellpadding="0"cellspacing="0"><tr><td align="center"><div><a href="' . $redirect_url . '" class="button button--blue">Verify Email</a></div></td></tr></table><p>Thanks,<br>The Topboost Team</p><table class="body-sub"><tr><td><p class="sub">If you’re having trouble clicking the button, copy and paste the URL below into your web browser.</p><p class="sub"><a href="' . $redirect_url . '">' . $redirect_url . '</a></p></td></tr></table></td></tr></table></td></tr><tr><td><table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0"><tr><td class="content-cell"><p class="sub center">Topboost Group, LTD.</p></td></tr></table></td></tr></table></td></tr></table></body></html>';
				$mail->AltBody = $redirect_url;

				$mail->send();
			} catch (Exception $e) {
				return response([
					'message' => 'fail'
				], 401);
			}
		}

		return response($response, 201)->withCookie($cookie);
	}

	public function login(Request $request)
	{
		$fields = $request->validate([
			'email' => 'required|string',
			'password' => 'required|string'
		]);

		if (Auth::guard()->attempt(['email' => $fields['email'], 'password' => $fields['password']]) || Auth::guard()->attempt(['name' => $fields['email'], 'password' => $fields['password']])) {

			$request->session()->regenerate();
			$user = User::where('email', $fields['email'])->orWhere('name', $fields['email'])->first();

			if (!$user || !Hash::check($fields['password'], $user->password)) {
				return response([
					'message' => 'fail'
				], 401);
			}

			$request->session()->regenerate();

			$token = $user->createToken('token')->plainTextToken;

			$cookie = cookie('jwt', $token, 60 * 24);

			$response = [
				'user' => $user,
				'message' => "success"
			];

			return response($response, 201)->withCookie($cookie);
		}

		return response([
			'message' => 'fail'
		], 401);
	}

	public function user()
	{
		$user = Auth::user();
		if (!$user) {
			return response([
				'message' => 'fail'
			], 401);
		}

		return response([
			'user' => $user,
			'message' => "success"
		], 201);
	}

	public function resendVerify(Request $request)
	{
		$user = Auth::user();
		if ($user && $user->email_verified_at === null) {
			$success = true;
			$verfiyCode = UserVerifyCode::where('ip', $request->ip())->orderBy('id', 'desc')->first();
			if ((!$verfiyCode || strtotime("now") >= (strtotime($verfiyCode->created_at) + (60 * 2))) && $user->email_verified_at === null) {
				$code = $this->randomCode();
				UserVerifyCode::where('ip', $request->ip())->delete();
				if (!UserVerifyCode::create(['user_id' => $user['id'], 'code' => $code, 'ip' => $request->ip()])) {
					return response([
						'message' => 'fail'
					], 401);
				}
			} else {
				$success = false;
			}
			if ($success) {
				$redirect_url = "https://topboost.net/verify/" . $code;
				require base_path("vendor/autoload.php");
				$mail = new PHPMailer(true);
				try {
					// $mail->SMTPDebug = SMTP::DEBUG_SERVER;
					$mail->isSMTP();
					$mail->Host = 'mail.topboost.net';
					$mail->SMTPAuth = true;
					$mail->Username = 'no-replay@topboost.net';
					$mail->Password = 'W525uSA5';
					$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
					$mail->Port = 587;
					$mail->setFrom('no-replay@topboost.net', 'TopBoost');
					$mail->addAddress($fields['email']);

					// $mail->addAttachment('/var/tmp/file.tar.gz');
					// $mail->addAttachment('/tmp/image.jpg', 'new.jpg');

					$mail->isHTML(true);
					$mail->Subject = 'topboost.net';
					$mail->Body = '<!DOCTYPE htmlPUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta name="viewport" content="width=device-width, initial-scale=1.0"/><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/><title>Verify your email address</title><style type="text/css" rel="stylesheet" media="all">*:not(br):not(tr):not(html){font-family: Arial, \'Helvetica Neue\', Helvetica, sans-serif;-webkit-box-sizing: border-box;box-sizing: border-box;}body{width: 100% !important;height: 100%;margin: 0;line-height: 1.4;background-color: #F5F7F9;color: #839197;-webkit-text-size-adjust: none;}a{color: #414EF9;}.email-wrapper{width: 100%;margin: 0;padding: 0;background-color: #F5F7F9;}.email-content{width: 100%;margin: 0;padding: 0;}.email-masthead{padding: 25px 0;text-align: center;}.email-masthead_logo{max-width: 400px;border: 0;}.email-masthead_name{font-size: 16px;font-weight: bold;color: #839197;text-decoration: none;text-shadow: 0 1px 0 white;}.email-body{width: 100%;margin: 0;padding: 0;border-top: 1px solid #E7EAEC;border-bottom: 1px solid #E7EAEC;background-color: #FFFFFF;}.email-body_inner{width: 570px;margin: 0 auto;padding: 0;}.email-footer{width: 570px;margin: 0 auto;padding: 0;text-align: center;}.email-footer p{color: #839197;}.body-action{width: 100%;margin: 30px auto;padding: 0;text-align: center;}.body-sub{margin-top: 25px;padding-top: 25px;border-top: 1px solid #E7EAEC;}.content-cell{padding: 35px;}.align-right{text-align: right;}h1{margin-top: 0;color: #292E31;font-size: 19px;font-weight: bold;text-align: left;}h2{margin-top: 0;color: #292E31;font-size: 16px;font-weight: bold;text-align: left;}h3{margin-top: 0;color: #292E31;font-size: 14px;font-weight: bold;text-align: left;}p{margin-top: 0;color: #839197;font-size: 16px;line-height: 1.5em;text-align: left;}p.sub{font-size: 12px;}p.center{text-align: center;}.button{display: inline-block;width: 200px;background-color: #414EF9;border-radius: 3px;color: #ffffff;font-size: 15px;line-height: 45px;text-align: center;text-decoration: none;-webkit-text-size-adjust: none;}.button--green{background-color: #28DB67;}.button--red{background-color: #FF3665;}.button--blue{background-color: #414EF9;color: #FFFFFF;}@media only screen and (max-width: 600px){.email-body_inner,.email-footer{width: 100% !important;}}@media only screen and (max-width: 500px){.button{width: 100% !important;}}</style></head><body><table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center"><table class="email-content" width="100%" cellpadding="0" cellspacing="0"><tr><td class="email-masthead"><a class="email-masthead_name">topboost.net</a></td></tr><tr><td class="email-body" width="100%"><table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0"><tr><td class="content-cell"><h1>Verify your email address</h1><p>Thanks for signing up! We\'re excited to have you as an early user.</p><table class="body-action" align="center" width="100%" cellpadding="0"cellspacing="0"><tr><td align="center"><div><a href="' . $redirect_url . '" class="button button--blue">Verify Email</a></div></td></tr></table><p>Thanks,<br>The Topboost Team</p><table class="body-sub"><tr><td><p class="sub">If you’re having trouble clicking the button, copy and paste the URL below into your web browser.</p><p class="sub"><a href="' . $redirect_url . '">' . $redirect_url . '</a></p></td></tr></table></td></tr></table></td></tr><tr><td><table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0"><tr><td class="content-cell"><p class="sub center">Topboost Group, LTD.</p></td></tr></table></td></tr></table></td></tr></table></body></html>';
					$mail->AltBody = $redirect_url;

					$mail->send();
				} catch (Exception $e) {
					return response([
						'message' => 'fail'
					], 401);
				}
			}
			return response([
				'user' => $user,
				'message' => $success ? "success" : "waiting",
				'seconds' => $verfiyCode ? 60 * 2 - (strtotime("now") - strtotime($verfiyCode->created_at)) : ""
			], 201);
		} else {
			return response([
				'message' => 'fail'
			], 401);
		}
	}

	public function VerifyEmail(Request $request, $code)
	{
		$success = true;
		$user = Auth::user();
		$verfiyCode = UserVerifyCode::where('ip', $request->ip())->where('code', $code)->orderBy('id', 'desc')->first();
		if ($verfiyCode && strtotime("now") <= (strtotime($verfiyCode->created_at) + (60 * 5)) && $user->email_verified_at === null) {
			UserVerifyCode::where('ip', $request->ip())->delete();
			if (!User::where("id", $user->id)->update(["email_verified_at" => date("Y/m/d H:i:s")])) {
				return response([
					'message' => 'fail'
				], 401);
			}
		} else {
			$success = false;
		}
		if (!$user) {
			return response([
				'message' => 'fail'
			], 401);
		}
		$user = User::where("id", $user->id)->first();
		return response([
			'user' => $user,
			'message' => $success ? "success" : "expired"
		], 201);
	}

	public function sendReset(Request $request)
	{
		$fields = $request->validate([
			'email' => 'required|string',
		]);
		$user = User::where('email', $fields['email'])->first();
		if ($user) {
			$success = true;
			$resetCode = UserResetCode::where('ip', $request->ip())->orderBy('id', 'desc')->first();
			if ((!$resetCode || strtotime("now") >= (strtotime($resetCode->created_at) + (60 * 2)))) {
				$code = $this->randomCode();
				UserResetCode::where('ip', $request->ip())->delete();
				if (!UserResetCode::create(['user_id' => $user['id'], 'code' => $code, 'ip' => $request->ip()])) {
					return response([
						'message' => 'fail'
					], 401);
				}
			} else {
				$success = false;
			}
			// if ($success) {
			// 	$redirect_url = "https://topboost.net/verify/" . $code;
			// 	require base_path("vendor/autoload.php");
			// 	$mail = new PHPMailer(true);
			// 	try {
			// 		// $mail->SMTPDebug = SMTP::DEBUG_SERVER;
			// 		$mail->isSMTP();
			// 		$mail->Host = 'mail.topboost.net';
			// 		$mail->SMTPAuth = true;
			// 		$mail->Username = 'no-replay@topboost.net';
			// 		$mail->Password = 'W525uSA5';
			// 		$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
			// 		$mail->Port = 587;
			// 		$mail->setFrom('no-replay@topboost.net', 'TopBoost');
			// 		$mail->addAddress($fields['email']);

			// 		// $mail->addAttachment('/var/tmp/file.tar.gz');
			// 		// $mail->addAttachment('/tmp/image.jpg', 'new.jpg');

			// 		$mail->isHTML(true);
			// 		$mail->Subject = 'topboost.net';
			// 		$mail->Body = '<!DOCTYPE htmlPUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta name="viewport" content="width=device-width, initial-scale=1.0"/><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/><title>Verify your email address</title><style type="text/css" rel="stylesheet" media="all">*:not(br):not(tr):not(html){font-family: Arial, \'Helvetica Neue\', Helvetica, sans-serif;-webkit-box-sizing: border-box;box-sizing: border-box;}body{width: 100% !important;height: 100%;margin: 0;line-height: 1.4;background-color: #F5F7F9;color: #839197;-webkit-text-size-adjust: none;}a{color: #414EF9;}.email-wrapper{width: 100%;margin: 0;padding: 0;background-color: #F5F7F9;}.email-content{width: 100%;margin: 0;padding: 0;}.email-masthead{padding: 25px 0;text-align: center;}.email-masthead_logo{max-width: 400px;border: 0;}.email-masthead_name{font-size: 16px;font-weight: bold;color: #839197;text-decoration: none;text-shadow: 0 1px 0 white;}.email-body{width: 100%;margin: 0;padding: 0;border-top: 1px solid #E7EAEC;border-bottom: 1px solid #E7EAEC;background-color: #FFFFFF;}.email-body_inner{width: 570px;margin: 0 auto;padding: 0;}.email-footer{width: 570px;margin: 0 auto;padding: 0;text-align: center;}.email-footer p{color: #839197;}.body-action{width: 100%;margin: 30px auto;padding: 0;text-align: center;}.body-sub{margin-top: 25px;padding-top: 25px;border-top: 1px solid #E7EAEC;}.content-cell{padding: 35px;}.align-right{text-align: right;}h1{margin-top: 0;color: #292E31;font-size: 19px;font-weight: bold;text-align: left;}h2{margin-top: 0;color: #292E31;font-size: 16px;font-weight: bold;text-align: left;}h3{margin-top: 0;color: #292E31;font-size: 14px;font-weight: bold;text-align: left;}p{margin-top: 0;color: #839197;font-size: 16px;line-height: 1.5em;text-align: left;}p.sub{font-size: 12px;}p.center{text-align: center;}.button{display: inline-block;width: 200px;background-color: #414EF9;border-radius: 3px;color: #ffffff;font-size: 15px;line-height: 45px;text-align: center;text-decoration: none;-webkit-text-size-adjust: none;}.button--green{background-color: #28DB67;}.button--red{background-color: #FF3665;}.button--blue{background-color: #414EF9;color: #FFFFFF;}@media only screen and (max-width: 600px){.email-body_inner,.email-footer{width: 100% !important;}}@media only screen and (max-width: 500px){.button{width: 100% !important;}}</style></head><body><table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center"><table class="email-content" width="100%" cellpadding="0" cellspacing="0"><tr><td class="email-masthead"><a class="email-masthead_name">topboost.net</a></td></tr><tr><td class="email-body" width="100%"><table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0"><tr><td class="content-cell"><h1>Verify your email address to reset password</h1><p>Thanks for signing up! We\'re excited to have you as an early user.</p><table class="body-action" align="center" width="100%" cellpadding="0"cellspacing="0"><tr><td align="center"><div><a href="' . $redirect_url . '" class="button button--blue">Verify Email</a></div></td></tr></table><p>Thanks,<br>The Topboost Team</p><table class="body-sub"><tr><td><p class="sub">If you’re having trouble clicking the button, copy and paste the URL below into your web browser.</p><p class="sub"><a href="' . $redirect_url . '">' . $redirect_url . '</a></p></td></tr></table></td></tr></table></td></tr><tr><td><table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0"><tr><td class="content-cell"><p class="sub center">Topboost Group, LTD.</p></td></tr></table></td></tr></table></td></tr></table></body></html>';
			// 		$mail->AltBody = $redirect_url;

			// 		$mail->send();
			// 	} catch (Exception $e) {
			// 		return response([
			// 			'message' => 'fail'
			// 		], 401);
			// 	}
			// }
			return response([
				'user' => $user,
				'message' => $success ? "success" : "waiting",
				'seconds' => $resetCode ? 60 * 2 - (strtotime("now") - strtotime($resetCode->created_at)) : ""
			], 201);
		} else {
			return response([
				'message' => 'fail'
			], 401);
		}
	}

	public function resetPassword(Request $request, $code)
	{
		$success = true;
		$verfiyCode = UserResetCode::where('ip', $request->ip())->where('code', $code)->orderBy('id', 'desc')->first();
		if ($verfiyCode && strtotime("now") <= (strtotime($verfiyCode->created_at) + (60 * 5))) {
			$user = $verfiyCode->user()->first();
			if ($user) {
				$code = $this->randomCode();
				if (!$user->update(["email_verified_at" => date("Y/m/d H:i:s"), "password" => Hash::make($code)])) {
					return response([
						'message' => 'fail'
					], 401);
				}
				UserResetCode::where('ip', $request->ip())->delete();
			} else {
				$success = false;
			}
			if ($success) {
				require base_path("vendor/autoload.php");
				$mail = new PHPMailer(true);
				try {
					// $mail->SMTPDebug = SMTP::DEBUG_SERVER;
					$mail->isSMTP();
					$mail->Host = 'mail.topboost.net';
					$mail->SMTPAuth = true;
					$mail->Username = 'no-replay@topboost.net';
					$mail->Password = 'W525uSA5';
					$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
					$mail->Port = 587;
					$mail->setFrom('no-replay@topboost.net', 'TopBoost');
					$mail->addAddress($fields['email']);

					// $mail->addAttachment('/var/tmp/file.tar.gz');
					// $mail->addAttachment('/tmp/image.jpg', 'new.jpg');

					$mail->isHTML(true);
					$mail->Subject = 'topboost.net';
					$mail->Body = '<!DOCTYPE htmlPUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta name="viewport" content="width=device-width, initial-scale=1.0"/><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/><title>Your new password</title><style type="text/css" rel="stylesheet" media="all">*:not(br):not(tr):not(html){font-family: Arial, \'Helvetica Neue\', Helvetica, sans-serif;-webkit-box-sizing: border-box;box-sizing: border-box;}body{width: 100% !important;height: 100%;margin: 0;line-height: 1.4;background-color: #F5F7F9;color: #839197;-webkit-text-size-adjust: none;}a{color: #414EF9;}.email-wrapper{width: 100%;margin: 0;padding: 0;background-color: #F5F7F9;}.email-content{width: 100%;margin: 0;padding: 0;}.email-masthead{padding: 25px 0;text-align: center;}.email-masthead_logo{max-width: 400px;border: 0;}.email-masthead_name{font-size: 16px;font-weight: bold;color: #839197;text-decoration: none;text-shadow: 0 1px 0 white;}.email-body{width: 100%;margin: 0;padding: 0;border-top: 1px solid #E7EAEC;border-bottom: 1px solid #E7EAEC;background-color: #FFFFFF;}.email-body_inner{width: 570px;margin: 0 auto;padding: 0;}.email-footer{width: 570px;margin: 0 auto;padding: 0;text-align: center;}.email-footer p{color: #839197;}.body-action{width: 100%;margin: 30px auto;padding: 0;text-align: center;}.body-sub{margin-top: 25px;padding-top: 25px;border-top: 1px solid #E7EAEC;}.content-cell{padding: 35px;}.align-right{text-align: right;}h1{margin-top: 0;color: #292E31;font-size: 19px;font-weight: bold;text-align: left;}h2{margin-top: 0;color: #292E31;font-size: 16px;font-weight: bold;text-align: left;}h3{margin-top: 0;color: #292E31;font-size: 14px;font-weight: bold;text-align: left;}p{margin-top: 0;color: #839197;font-size: 16px;line-height: 1.5em;text-align: left;}p.sub{font-size: 12px;}p.center{text-align: center;}.button{display: inline-block;width: 200px;background-color: #414EF9;border-radius: 3px;color: #ffffff;font-size: 15px;line-height: 45px;text-align: center;text-decoration: none;-webkit-text-size-adjust: none;}.button--green{background-color: #28DB67;}.button--red{background-color: #FF3665;}.button--blue{background-color: #414EF9;color: #FFFFFF;}@media only screen and (max-width: 600px){.email-body_inner,.email-footer{width: 100% !important;}}@media only screen and (max-width: 500px){.button{width: 100% !important;}}</style></head><body><table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center"><table class="email-content" width="100%" cellpadding="0" cellspacing="0"><tr><td class="email-masthead"><a class="email-masthead_name">topboost.net</a></td></tr><tr><td class="email-body" width="100%"><table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0"><tr><td class="content-cell"><h1>Your new password is:</h1><p>' . $code . '</p><p>Please make sure to change your password after login!</p><p>Thanks,<br>The Topboost Team</p></td></tr></table></td></tr><tr><td><table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0"><tr><td class="content-cell"><p class="sub center">Topboost Group, LTD.</p></td></tr></table></td></tr></table></td></tr></table></body></html>';
					$mail->AltBody = "Your new password is: " . $code . "";

					$mail->send();
				} catch (Exception $e) {
					return response([
						'message' => 'fail'
					], 401);
				}
			}
			return response([
				'user' => $user,
				'message' => $success ? "success" : "expired"
			], 201);
		}
	}

	public function newPassword(Request $request)
	{
		$user = Auth::user();
		if (!$user) {
			return response([
				'message' => 'fail'
			], 401);
		}
		$fields = $request->validate([
			'currentPassword' => 'required|string',
			'newPassword' => 'required|string',
		]);
		if (Hash::check($fields['currentPassword'], $user->password)) {
			$newPassword = Hash::make($fields['newPassword']);
			if ($user->update(['password' => $newPassword])) {
				return response([
					'message' => 'success'
				], 201);
			} else {
				return response([
					'message' => 'fail'
				], 402);
			}
		} else {
			return response([
				'message' => 'fail'
			], 422);
		}
	}

	public function logout(Request $request)
	{
		Auth::guard('web')->logout();

		$request->session()->invalidate();

		$request->session()->regenerateToken();

		auth()->user()->tokens()->delete();

		$cookie = Cookie::forget('jwt');

		$response = ['message' => "success"];
		return response($response, 201)->withCookie($cookie);
	}

	public function unauthenticated()
	{
		$cookie = Cookie::forget('jwt');
		$response = ['message' => "unauthenticated"];
		return response($response, 401)->withCookie($cookie);
	}
}
