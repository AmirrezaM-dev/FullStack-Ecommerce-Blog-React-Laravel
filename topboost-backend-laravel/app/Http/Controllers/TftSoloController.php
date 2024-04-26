<?php

namespace App\Http\Controllers;

use App\Models\LolRanks;
use App\Models\LolRegions;
use App\Models\TftCL;
use App\Models\TftPromocodes;
use App\Models\Checkouts;

use Illuminate\Http\Request;

class TftSoloController extends Controller
{
	public function makePurchase(Request $request)
	{
		$code = 1;
		$this->tftFixData();
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
		if ($request->input("desiredRank") == null) {
			$error = "desiredRank";
		}
		if ($request->input("desiredDivision") == null) {
			$error = "desiredDivision";
		}
		if ($request->input("gameRegion") == null) {
			$error = "gameRegion";
		}
		if ($request->input("currentLp") == null) {
			$error = "currentLp";
		}
		if (!$error) {
			$workingCurrentRank = array_values(array_filter($this->ranks, function ($rank) use ($request) {
				return $rank["value"] == $request->input("currentRank");
			}))[0];
			$workingCurrentDivision = array_values(array_filter($workingCurrentRank["divisions"], function ($division) use ($request) {
				return $division["value"] == $request->input("currentDivision");
			}))[0];
			$workingDesiredRank = array_values(array_filter($this->ranks, function ($rank) use ($request) {
				return $rank["value"] == $request->input("desiredRank");
			}))[0];
			$workingDesiredDivision = array_values(array_filter($workingDesiredRank["divisions"], function ($division) use ($request) {
				return $division["value"] == $request->input("desiredDivision");
			}))[0];
			$currentlpPercentage = TftCL::find($request->input("currentLp"));
			$first = array_values(array_filter($workingCurrentRank["divisions"], function ($division) use ($workingCurrentDivision) {
				if ($workingCurrentDivision["value"] == $division["value"]) {
					return true;
				}
				return false;
			}));
			if (count($first)) {
				$first = $first[0];
				$price = $first["price"] - ($first["price"] / 100 * $currentlpPercentage["percentage"]);
			}
			if (LolRanks::find($request->input("currentRank"))->level == LolRanks::find($request->input("desiredRank"))->level) {
				$boosts = array_values(array_filter($workingCurrentRank["divisions"], function ($division) use ($workingCurrentDivision, $workingDesiredDivision) {
					if ($workingCurrentDivision["value"] == $division["value"]) {
						return false;
					}
					return $division["level"] >= $workingCurrentDivision["level"] && $division["level"] < $workingDesiredDivision["level"];
				}));
			} elseif (LolRanks::find($request->input("desiredRank"))->level - LolRanks::find($request->input("currentRank"))->level === 1) {
				$boosts = array_values(array_filter($workingCurrentRank["divisions"], function ($division) use ($workingCurrentDivision) {
					if ($workingCurrentDivision["value"] == $division["value"]) {
						return false;
					}
					return $division["level"] >= $workingCurrentDivision["level"];
				}));
				$boosts = array_merge($boosts, array_values(array_filter($workingDesiredRank["divisions"], function ($division) use ($workingCurrentDivision, $workingDesiredDivision) {
					if ($workingCurrentDivision["value"] == $division["value"]) {
						return false;
					}
					return $division["level"] < $workingDesiredDivision["level"];
				})));
			} else {
				$boosts = array_values(array_filter($workingCurrentRank["divisions"], function ($division) use ($workingCurrentDivision) {
					if ($workingCurrentDivision["value"] == $division["value"]) {
						return false;
					}
					return $division["level"] >= $workingCurrentDivision["level"];
				}));
				$boosts = array_merge($boosts, array_values(array_filter($workingDesiredRank["divisions"], function ($division) use ($workingCurrentDivision, $workingDesiredDivision) {
					if ($workingCurrentDivision["value"] == $division["value"]) {
						return false;
					}
					return $division["level"] < $workingDesiredDivision["level"];
				})));
				$boosts_help = array_values(array_filter($this->ranks, function ($rank) use ($workingCurrentRank, $workingDesiredRank) {
					return $rank['level'] > $workingCurrentRank['level'] && $rank['level'] < $workingDesiredRank['level'];
				}));
				foreach ($boosts_help as &$value) {
					$price += $value['sumPrice'];
				}
			}
			foreach ($boosts as &$value) {
				$price += $value['price'];
			}
			$cart[] = [$workingCurrentRank["label"] . " (" . $workingCurrentDivision["label"] . ") to " . $workingDesiredRank["label"] . " (" . $workingDesiredDivision["label"] . ")", (round($price, 2, PHP_ROUND_HALF_UP) * pow(10, 2)) / pow(10, 2), true];

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

			$cart[] = ["Order", $workingCurrentRank["label"] . " (" . $workingCurrentDivision["label"] . ") to " . $workingDesiredRank["label"] . " (" . $workingDesiredDivision["label"] . ")", false];
			$cart[] = ["Game Region", LolRegions::find($request->input("gameRegion"))->name, false];
			$cart[] = ["Current LP", TftCL::find($request->input("currentLp"))->name, false];

			foreach ($currentVipOptions as &$value) {
				$cart[] = [$value['label'], "Yes", false];
			}

			$price = round($price, 2, PHP_ROUND_HALF_UP);
			$price = ($price * pow(10, 2)) / pow(10, 2);
		}

		$randomString = $this->randomCode();
		while (Checkouts::where("code", "=", $randomString)->count() != 0) {
			$randomString = $this->randomCode();
		}

		$newCheckout = Checkouts::create([
			'lol_boost_id' => null,
			'tft_boost_id' => $request->input('code'),
			'code' => $randomString,
			'title' => "You've purchased teamfight tactics solo boost:",
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
