<?php

namespace App\Http\Controllers;

use App\Models\LolRegions;
use App\Models\TftTOC;
use App\Models\TftPromocodes;
use App\Models\Checkouts;
use App\Models\Langs;
use Illuminate\Http\Request;

class TftCoachingController extends Controller
{
	public function makePurchase(Request $request)
	{
		$this->tftFixData();
		$code = 5;
		$price = 0;
		$add_price = 0;
		$cart = [];
		$error = 0;
		if ($request->input("currentRank") == null) {
			$error = "currentRank";
		}
		if ($request->input("currentDivision") == null) {
			$error = "currentDivision";
		}
		if ($request->input("numberOfHours") == null) {
			$error = "numberOfHours";
		}
		if ($request->input("lang") == null) {
			$error = "lang";
		}
		if ($request->input("gameRegion") == null) {
			$error = "gameRegion";
		}
		if ($request->input("typeOfCustom") == null) {
			$error = "typeOfCustom";
		}

		if (!$error) {
			$workingCurrentRank = array_values(array_filter($this->ranks, function ($rank) use ($request) {
				return $rank["value"] == $request->input("currentRank");
			}))[0];
			$workingCurrentDivision = array_values(array_filter($workingCurrentRank["divisions"], function ($division) use ($request) {
				return $division["value"] == $request->input("currentDivision");
			}))[0];

			$price = $workingCurrentDivision["coaching_price"] * $request->input("numberOfHours");
			$cart[] = [$request->input("numberOfHours") . " hour with " . $workingCurrentRank["label"] . (strlen($workingCurrentDivision["label"]) ? "( " . $workingCurrentDivision["label"] . " )" : "") . " booster", (round($price, 2, PHP_ROUND_HALF_UP) * pow(10, 2)) / pow(10, 2), true];

			$currentTypeOfCustom = TftTOC::find($request->input("typeOfCustom"));
			$add_price = $add_price + ($price / 100 * $currentTypeOfCustom["percentage"]);
			$cart[] = ["Because you have selected " . $currentTypeOfCustom["name"] . " as type of coaching we have added " . $currentTypeOfCustom["percentage"] . "% to your payment.", ($price / 100 * $currentTypeOfCustom["percentage"]), true];

			$currentVipOptions = array_values(array_filter($this->vip, function ($vip_single) use ($request, $code) {
				return in_array($vip_single['value'], $request->input("vipOptions")) && (strlen($vip_single['custom']) == 0 || $vip_single['custom'] === "-") && $vip_single["boost_id"] == $code;
			}));
			foreach ($currentVipOptions as &$value) {
				$add_price = $add_price + ($price / 100 * $value["percentage"]);
				$cart[] = [$value['label'], ($price / 100 * $value["percentage"]), true];
			}

			$price = $price + $add_price;

			if (strlen($request->input("promoCode"))) {
				$promocode = strtolower($request->input("promoCode"));
				$percentage = 0;
				$promo = TftPromocodes::where('name', '=', $promocode);
				if ($promo->count()) {
					$price = $price - ($price / 100 * ($promo->count() ? $promo->get()[0]->percentage : 0));
					$percentage = $promo->get();
					$price = (round($price * 100, PHP_ROUND_HALF_UP) / 100);
					$cart[] = [
						"Because you have used discount code we have removed " . ($promo->count() ? $percentage[0]->percentage : 0) . "% of your payment.",
						((round(($price / 100 * ($promo->count() ? $percentage[0]->percentage : 0)), 2, PHP_ROUND_HALF_UP) * pow(10, 2)) / pow(10, 2) - ((round(($price / 100 * ($promo->count() ? $percentage[0]->percentage : 0)), 2, PHP_ROUND_HALF_UP) * pow(10, 2)) / pow(10, 2) * 2)),
						true
					];
				}
			}

			$cart[] = ["Order", $request->input("numberOfHours") . " hour with " . $workingCurrentRank["label"] . (strlen($workingCurrentDivision["label"]) ? "( " . $workingCurrentDivision["label"] . " )" : "") . " booster", false];
			$cart[] = ["Game Region", LolRegions::find($request->input("gameRegion"))->name, false];
			$cart[] = ["Type of coaching", TftTOC::find($request->input("typeOfCustom"))->name, false];


			$cart[] = ["Language", Langs::find($request->input("lang"))->name, false];
			foreach ($currentVipOptions as &$value) {
				$cart[] = [$value['label'], "Yes", false];
			}
		} else {
			$cart[] = [$error, 1, true];
		}

		$randomString = $this->randomCode();
		while (Checkouts::where("code", "=", $randomString)->count() != 0) {
			$randomString = $this->randomCode();
		}

		$newCheckout = Checkouts::create([
			'boost_id' => $request->input('code'),
			'code' => $randomString,
			'title' => "You've purchased teamfight tactics coaching:",
			'cart' => json_encode($cart),
			'price' => $price,
			'ip' => $request->ip(),
			'paid' => 0
		]);

		$status = "success";

		if (isset($newCheckout['code']) && $randomString != $newCheckout['code']) {
			$status = "fail";
		}

		return response()->json([
			"message" => $status,
			"checkout" => $randomString
		]);
	}
}
