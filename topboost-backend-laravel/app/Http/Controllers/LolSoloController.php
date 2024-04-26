<?php

namespace App\Http\Controllers;

use App\Models\LolRanks;
use App\Models\LolRegions;
use App\Models\LolTOQ;
use App\Models\LolCL;
use App\Models\LolVips;
use App\Models\LolPromocodes;
use App\Models\LolRoles;
use App\Models\Checkouts;

use Illuminate\Http\Request;

class LolSoloController extends Controller
{
	public function makePurchase(Request $request)
	{
		$code = 1;
		$this->lolFixData();
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
		if ($request->input("typeOfQueue") == null) {
			$error = "typeOfQueue";
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
			$currentlpPercentage = LolCL::find($request->input("currentLp"));
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

			$currentTypeOfQueue = LolTOQ::find($request->input("typeOfQueue"));
			$add_price = $add_price + ($price / 100 * $currentTypeOfQueue["percentage"]);
			$cart[] = ["Because you have selected " . $currentTypeOfQueue["name"] . " as type of queue we have added " . $currentTypeOfQueue["percentage"] . "% to your payment.", ($price / 100 * $currentTypeOfQueue["percentage"]), true];

			$currentVipOptions = array_values(array_filter($this->vip, function ($vip_single) use ($request, $code) {
				return in_array($vip_single['value'], $request->input("vipOptions")) && (strlen($vip_single['custom']) == 0 || $vip_single['custom'] === "-") && $vip_single["boost_id"] == $code;
			}));
			foreach ($currentVipOptions as &$value) {
				$add_price = $add_price + ($price / 100 * $value["percentage"]);
				$cart[] = [$value['label'], ($price / 100 * $value["percentage"]), true];
			}

			$onlyOneChampionGet = LolVips::where([["custom", "=", "specific"], ["boost_id", "=", $code]]);
			if ($request->input("vipOptions") !== null && in_array($onlyOneChampionGet->pluck("id")[0], $request->input("vipOptions"))) {
				if ($request->input("onlyOneChampion") === true && $onlyOneChampionGet->count() && ($request->input("specificFirstChampion") !== null && count($request->input("specificFirstChampion")) || $request->input("specificSecondChampion") !== null && count($request->input("specificSecondChampion")))) {
					$add_price = $add_price + ($price / 100 * $onlyOneChampionGet->get()[0]->percentage);
					$cart[] = [
						"Only one specific champion +" . $onlyOneChampionGet->get()[0]->percentage . "%",
						(round(($price / 100 * $onlyOneChampionGet->get()[0]->percentage), 2, PHP_ROUND_HALF_UP) * pow(10, 2)) / pow(10, 2),
						true
					];
				}
				if ($request->input("specificFirstChampion") !== null && (count($request->input("specificFirstChampion")) > 2 || count($request->input("specificFirstChampion")) && $request->input("onlyOneChampion") === true && $onlyOneChampionGet->count())) {
					$add_price = $add_price + ($price / 100 * $onlyOneChampionGet->get()[0]->percentage);
					$cart[] = [
						"Selected champions for first role addes +" . $onlyOneChampionGet->get()[0]->percentage . "%",
						(round(($price / 100 * $onlyOneChampionGet->get()[0]->percentage), 2, PHP_ROUND_HALF_UP) * pow(10, 2)) / pow(10, 2),
						true
					];
				}
				if ($request->input("specificSecondChampion") !== null && (count($request->input("specificSecondChampion")) > 2 || count($request->input("specificSecondChampion")) && $request->input("onlyOneChampion") === true && $onlyOneChampionGet->count())) {
					$add_price = $add_price + ($price / 100 * $onlyOneChampionGet->get()[0]->percentage);
					$cart[] = [
						"Selected champions for second role addes +" . $onlyOneChampionGet->get()[0]->percentage . "%",
						(round(($price / 100 * $onlyOneChampionGet->get()[0]->percentage), 2, PHP_ROUND_HALF_UP) * pow(10, 2)) / pow(10, 2),
						true
					];
				}
			}

			$flash = LolVips::where([["custom", "=", "flash"], ["boost_id", "=", $code]]);
			if ($request->input("vipOptions") !== null && in_array($flash->pluck("id")[0], $request->input("vipOptions"))) {
				if ($request->input("flashLocation") === "D" || $request->input("flashLocation") === "F") {
					$add_price = $add_price + ($price / 100 * $flash->get()[0]->percentage);
					$cart[] = [
						"SUMMONER SPELL " . $request->input("flashLocation") . " = Flash, " . ($request->input("flashLocation") == "D" ? "F" : "D") . " = Ignite",
						(round(($price / 100 * $flash->get()[0]->percentage), 2, PHP_ROUND_HALF_UP) * pow(10, 2)) / pow(10, 2),
						true
					];
				}
			}

			$price = $price + $add_price;

			if (strlen($request->input("promoCode"))) {
				$promocode = strtolower($request->input("promoCode"));
				$percentage = 0;
				$promo = LolPromocodes::where('name', '=', $promocode);
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
			$cart[] = ["Type of queue", LolTOQ::find($request->input("typeOfQueue"))->name, false];
			$cart[] = ["Current LP", LolCL::find($request->input("currentLp"))->name, false];
			if ($request->input("specificFirstRole") != null) {
				$cart[] = ["First role", LolRoles::find($request->input("specificFirstRole"))->name, false];
			}
			if ($request->input("specificFirstChampion") != null) {
				$cart[] = ["Champions for first role", json_encode($request->input("specificFirstChampion")), false];
			}
			if ($request->input("specificSecondRole") != null) {
				$cart[] = ["Second role", LolRoles::find($request->input("specificSecondRole"))->name, false];
			}
			if ($request->input("specificSecondChampion") != null) {
				$cart[] = ["Champions for second role", json_encode($request->input("specificSecondChampion")), false];
			}
			if ($request->input("onlyOneChampion") != null) {
				$cart[] = ["Play only with first champion", "Yes", false];
			}
			if ($request->input("flashLocation") != null) {
				$cart[] = ["Flash Location", $request->input("flashLocation"), false];
			}

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
			'boost_id' => $request->input('code'),
			'code' => $randomString,
			'title' => "You've purchased league of legends solo boost:",
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
