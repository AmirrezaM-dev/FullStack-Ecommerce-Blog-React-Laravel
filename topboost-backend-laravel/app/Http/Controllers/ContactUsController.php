<?php

namespace App\Http\Controllers;

use App\Models\ContactUs;
use Illuminate\Http\Request;

use Http\Factory\Guzzle\RequestFactory;
use Http\Factory\Guzzle\StreamFactory;
use Http\Adapter\Guzzle6\Client;
use TgBotApi\BotApiBase\ApiClient;
use TgBotApi\BotApiBase\BotApi;
use TgBotApi\BotApiBase\Method\SendMessageMethod;
use TgBotApi\BotApiBase\BotApiNormalizer;

class ContactUsController extends Controller
{
	public function createMessage(Request $request)
	{
		if (!empty($request->input("name")) && !empty($request->input("email")) && !empty($request->input("discordId")) && !empty($request->input("message"))) {
			if (!ContactUs::where("last_send", ">=", (strtotime("now") - 60))->where("ip", $request->ip())->count()) {
				ContactUs::create([
					'name' => $request->input('name'),
					'email' => $request->input('email'),
					'discordId' => $request->input('discordId'),
					'orderId' => $request->input('orderId'),
					'message' => $request->input('message'),
					'read' => false,
					'ip' => $request->ip(),
					'last_send' => strtotime("now")
				]);

				$botKey = '1355185589:AAEmdpmeefHjyafASoY-wWaJWkpYJ9wT6Qw';
				$requestFactory = new RequestFactory();
				$streamFactory = new StreamFactory();
				$client = new Client();

				$apiClient = new ApiClient($requestFactory, $streamFactory, $client);
				$bot = new BotApi($botKey, $apiClient, new BotApiNormalizer());

				$userId = '1018493175';

				$bot->send(SendMessageMethod::create($userId, "Name: " . $request->input("name") . "\nEmail: " . $request->input("email") . "\nMessage: " . $request->input("message") . "\nOrder URL: " . $request->input("orderId") . "\nDiscord ID :\n" . $request->input("discordId")));

				return response()->json(["code" => 200]);
			} else {
				return response()->json(["code" => 1]);
			}
		} else {
			return response()->json(["code" => 0]);
		}
	}
}
