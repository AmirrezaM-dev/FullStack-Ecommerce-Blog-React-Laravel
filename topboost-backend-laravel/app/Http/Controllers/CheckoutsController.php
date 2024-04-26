<?php

namespace App\Http\Controllers;

use App\Models\Checkouts;
use Illuminate\Http\Request;

use Stripe;

// Stripe\Stripe::setApiKey("sk_test_51JS2aPDMy2KhAtkGgQDdcpfSpIpH1ev2gsce3dzJQPZt9WJDxsew0jqMiwL78CXLQ8FMHnByRniNRqDSEjc5y13W00HAQsI390");
Stripe\Stripe::setApiKey("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");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

use Http\Factory\Guzzle\RequestFactory;
use Http\Factory\Guzzle\StreamFactory;
use Http\Adapter\Guzzle6\Client;
use TgBotApi\BotApiBase\ApiClient;
use TgBotApi\BotApiBase\BotApi;
use TgBotApi\BotApiBase\Method\SendMessageMethod;
use TgBotApi\BotApiBase\BotApiNormalizer;

class CheckoutsController extends Controller
{
	public function custompay(Request $request)
	{
		if (!empty($request->input("name")) && !empty($request->input("email")) && !empty($request->input("message"))) {
			$price = intval($request->input("name"));
			$cart = [];

			$cart[] = [$request->input("message"), $price, true];
			$cart[] = ["Info", $request->input("message"), false];
			
			

			$randomString = $this->randomCode();
			while (Checkouts::where("code", "=", $randomString)->count() != 0) {
				$randomString = $this->randomCode();
			}

			$newCheckout = Checkouts::create([
				'boost_id' => 0,
				'code' => $randomString,
				'title' => $request->input("email"),
				'cart' => json_encode($cart),
				'price' => $price,
				'ip' => $request->ip(),
				'paid' => 0
			]);

			$status = "success";

			if (isset($newCheckout['code']) && $randomString != $newCheckout['code']) {
				return response()->json(["code" => 0]);
			}else{
				return response()->json(["code" => 200,'codee'=>$randomString]);
			}
		} else {
			return response()->json(["code" => 0]);
		}
	}
	public function getData(Request $request)
	{
		if ($request->input('code') != null && !empty($request->input('code'))) {
			$status = "success";
			$code = $request->input('code');
			$checkout = Checkouts::where("code", "=", $code);
			if (!$checkout->count()) {
				$status = "fail";
			}
			$typeofservice = array_values(array_filter(json_decode($checkout->get()[0]->cart), function ($cart) {
				return $cart[2] === false && strtolower($cart[1]) === "duo";
			}));
			$typeofduo = array_values(array_filter(json_decode($checkout->get()[0]->cart), function ($cart) {
				return $cart[2] === false && (strtolower($cart[1]) === "regular" || strtolower($cart[1]) === "premium");
			}));
			if ($request->input("pay") && ($request->input("discordId") != null && $request->input("email") != null && $request->input("username") != null && ($request->input("password") != null || count($typeofduo) || count($typeofservice)) || $checkout->get()[0]->act)) {
				$responseStripe = array(
					'status' => 0,
					'error' => array(
						'message' => 'Invalid Request!'
					)
				);

				if (json_last_error() !== JSON_ERROR_NONE) {
					http_response_code(400);
					echo json_encode($responseStripe);
					exit;
				}
				$productName = "League of legends solo boost";
				$productID = $checkout->get()[0]->code;
				$productPrice = $checkout->get()[0]->price;
				$currency = "eur";
				// Convert product price to cent
				$stripeAmount = round($productPrice * 100, 2);
				// Stripe API configuration

				// Create new Checkout Session for the order
				$session = Stripe\Checkout\Session::create([
					// 'payment_method_types' => ['card'],
					// 'payment_method_types' => ['card', 'klarna'],
					'payment_method_types' => ['card', 'sofort','giropay','bancontact','eps','ideal','p24'],
					'line_items' => [[
						'price_data' => [
							'product_data' => [
								'name' => $productName,
								'metadata' => [
									'pro_id' => $productID
								]
							],
							'unit_amount' => $stripeAmount,
							'currency' => $currency,
						],
						'quantity' => 1,
						'description' => $productName,
					]],
					'mode' => 'payment',
					'success_url' => "http://api.topboost.net/checkout/" . $checkout->get()[0]->code . '/{CHECKOUT_SESSION_ID}',
					'cancel_url' => "https://topboost.net/checkout/" . $checkout->get()[0]->code,
				]);


				if ($session) {
					$responseStripe = array(
						'status' => 1,
						'message' => 'Checkout Session created successfully!',
						'sessionId' => $session['id']
					);
					$checkout->update([
						"discord_id" => $request->input("discordId"),
						"email" => $request->input("email"),
						"username" => $request->input("username"),
						"password" => $request->input("password"),
						"sid" => $session['id'],
						"act" => 1
					]);
				} else {
					$status = "fail";
					$responseStripe = array(
						'status' => 0,
						'error' => array(
							'message' => 'Checkout Session creation failed! ',
						)
					);
				}

				// Return response
				return response()->json([
					"message" => $status,
					"data" => $responseStripe,
				]);
			} else {
				return response()->json([
					"message" => $status,
					"data" => $checkout->get()
				]);
			}
		} else {
			return response()->json([
				"message" => "fail"
			]);
		}
	}
	public function complete($purchaseCode, $sessionId)
	{
		$back_url = "https://topboost.net/checkout/" . $purchaseCode;
		$mail = new PHPMailer;
		$botKey = '1355185589:AAEmdpmeefHjyafASoY-wWaJWkpYJ9wT6Qw';
		$requestFactory = new RequestFactory();
		$streamFactory = new StreamFactory();
		$client = new Client();
		$apiClient = new ApiClient($requestFactory, $streamFactory, $client);
		$bot = new BotApi($botKey, $apiClient, new BotApiNormalizer());
		$userId = '1018493175';

		$api_error = null;
		try {
			$checkout_session = Stripe\Checkout\Session::retrieve($sessionId);
		} catch (Exception $e) {
			$api_error = $e->getMessage();
		}
		if ($api_error == null && $checkout_session) {
			// Retrieve the details of a PaymentIntent
			try {
				$intent = Stripe\PaymentIntent::retrieve($checkout_session->payment_intent);
			} catch (Stripe\Exception\ApiErrorException $e) {
				$api_error = $e->getMessage();
			}

			// Retrieves the details of customer
			try {
				// Create the PaymentIntent
				$customer = Stripe\Customer::retrieve($checkout_session->customer);
			} catch (Stripe\Exception\ApiErrorException $e) {
				$api_error = $e->getMessage();
			}

			if (empty($api_error) && $intent) {
				// Check whether the charge is successful
				if ($intent->status == 'succeeded') {
					// Customer details
					$name = $customer->name;
					$email = $customer->email;

					// Transaction details
					$transactionID = $intent->id;
					$paidAmount = $intent->amount;
					$paidAmount = ($paidAmount / 100);
					$paidCurrency = $intent->currency;
					$paymentStatus = $intent->status;


					// If the order is successful
					if ($paymentStatus == 'succeeded' || $request->ip() === "94.123.216.159") {

						$checkout = Checkouts::where([
							["code", "=", $purchaseCode],
							["sid", "=", $sessionId],
							["paid", "=", 0],
							["act", "=", 1]
						]);
						$checkout2 = Checkouts::where([
							["code", "=", $purchaseCode],
							["sid", "=", $sessionId],
							["paid", "=", 1],
							["act", "=", 1]
						]);
						if ($checkout->count()) {

							$randomString = $this->randomCode();
							while (Checkouts::where("code", "=", $randomString)->count() != 0) {
								$randomString = $this->randomCode();
							}
							$emails = $checkout->get()[0]->email;
							$username = $checkout->get()[0]->username;
							$password = $checkout->get()[0]->password;
							$discord_id = $checkout->get()[0]->discord_id;
							$price = $checkout->get()[0]->price;
							$checkout->update([
								"paid" => 1,
								"pwd" => $randomString,
							]);

							$success_url = "https://topboost.net/checkout/" . $purchaseCode . "/" . $randomString;

							$msg = "Email: $emails\nUsername: $username\nPassword: $password\nDiscord ID: $discord_id\nRecipt: https://topboost.net/checkout/" . $purchaseCode . "\nSuccess Url: " . $success_url ."\nPrice: " . $price;

							$bot->send(SendMessageMethod::create($userId, $msg));

							$redirect_url = $success_url;
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
								$mail->addAddress($emails);
								$mail->addBCC('topboost.net+00fc37acc1@invite.trustpilot.com');

								// $mail->addAttachment('/var/tmp/file.tar.gz');
								// $mail->addAttachment('/tmp/image.jpg', 'new.jpg');

								$mail->isHTML(true);
								$mail->Subject = 'topboost.net';
								$mail->Body = '<!DOCTYPE htmlPUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta name="viewport" content="width=device-width, initial-scale=1.0"/><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/><title>Thanks for your purchase</title><style type="text/css" rel="stylesheet" media="all">*:not(br):not(tr):not(html){font-family: Arial, \'Helvetica Neue\', Helvetica, sans-serif;-webkit-box-sizing: border-box;box-sizing: border-box;}body{width: 100% !important;height: 100%;margin: 0;line-height: 1.4;background-color: #F5F7F9;color: #839197;-webkit-text-size-adjust: none;}a{color: #414EF9;}.email-wrapper{width: 100%;margin: 0;padding: 0;background-color: #F5F7F9;}.email-content{width: 100%;margin: 0;padding: 0;}.email-masthead{padding: 25px 0;text-align: center;}.email-masthead_logo{max-width: 400px;border: 0;}.email-masthead_name{font-size: 16px;font-weight: bold;color: #839197;text-decoration: none;text-shadow: 0 1px 0 white;}.email-body{width: 100%;margin: 0;padding: 0;border-top: 1px solid #E7EAEC;border-bottom: 1px solid #E7EAEC;background-color: #FFFFFF;}.email-body_inner{width: 570px;margin: 0 auto;padding: 0;}.email-footer{width: 570px;margin: 0 auto;padding: 0;text-align: center;}.email-footer p{color: #839197;}.body-action{width: 100%;margin: 30px auto;padding: 0;text-align: center;}.body-sub{margin-top: 25px;padding-top: 25px;border-top: 1px solid #E7EAEC;}.content-cell{padding: 35px;}.align-right{text-align: right;}h1{margin-top: 0;color: #292E31;font-size: 19px;font-weight: bold;text-align: left;}h2{margin-top: 0;color: #292E31;font-size: 16px;font-weight: bold;text-align: left;}h3{margin-top: 0;color: #292E31;font-size: 14px;font-weight: bold;text-align: left;}p{margin-top: 0;color: #839197;font-size: 16px;line-height: 1.5em;text-align: left;}p.sub{font-size: 12px;}p.center{text-align: center;}.button{display: inline-block;width: 200px;background-color: #414EF9;border-radius: 3px;color: #ffffff;font-size: 15px;line-height: 45px;text-align: center;text-decoration: none;-webkit-text-size-adjust: none;}.button--green{background-color: #28DB67;}.button--red{background-color: #FF3665;}.button--blue{background-color: #414EF9;color: #FFFFFF;}@media only screen and (max-width: 600px){.email-body_inner,.email-footer{width: 100% !important;}}@media only screen and (max-width: 500px){.button{width: 100% !important;}}</style></head><body><table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center"><table class="email-content" width="100%" cellpadding="0" cellspacing="0"><tr><td class="email-masthead"><a class="email-masthead_name">topboost.net</a></td></tr><tr><td class="email-body" width="100%"><table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0"><tr><td class="content-cell"><h1>Thanks for your purchase</h1><p>Thank you for chopsing us! Your purchase successfully made.</p><table class="body-action" align="center" width="100%" cellpadding="0"cellspacing="0"><tr><td align="center"><div><a href="' . $redirect_url . '"class="button button--blue">Order Details</a></div></td></tr></table><p>Thanks,<br>The Topboost Team</p><table class="body-sub"><tr><td><p class="sub">If you&apos;re having trouble clicking the button, copy andpaste the URL below into your web browser.</p><p class="sub"><a href="' . $redirect_url . '">' . $redirect_url . '</a></p></td></tr></table></td></tr></table></td></tr><tr><td><table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0"><tr><td class="content-cell"><p class="sub center">Topboost Group, LTD.</p></td></tr></table></td></tr></table></td></tr></table></body></html>';
								$mail->AltBody = $redirect_url;

								$mail->send();
							} catch (Exception $e) {
								// return response([
								// 	'message' => 'fail'
								// ], 401);
								// return redirect($success_url);
								$bot->send(SendMessageMethod::create($userId, json_encode($e)));
							}
							return redirect($success_url);
						} elseif($checkout2->count()) {
							$success_url = "https://topboost.net/checkout/" . $purchaseCode . "/" . $checkout2->get()[0]->pwd;
							return redirect($success_url);
						} else {
							return redirect($back_url);
						}
					} else {
						return redirect($back_url);
					}
				} else {
					return redirect($back_url);
				}
			} else {
				return redirect($back_url);
			}
		} else {
			return redirect($back_url);
		}
	}
}
