<?php

namespace App\Http\Controllers;

use App\Models\ValorantRanks;
use App\Models\LolRegions;
use App\Models\ValorantCL;
use App\Models\ValorantTOS;
use App\Models\ValorantTOC;
use App\Models\ValorantVips;
use App\Models\ValorantPromocodes;
use App\Models\Checkouts;

use Illuminate\Http\Request;

class ValorantRankController extends Controller
{
	public function makePurchase(Request $request)
	{
		$code = 1;
		$this->valorantFixData();
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
		if ($request->input("typeOfService") == null) {
			$error = "typeOfService";
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
			$currentlpPercentage = ValorantCL::find($request->input("currentLp"));
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
			if (ValorantRanks::find($request->input("currentRank"))->level == ValorantRanks::find($request->input("desiredRank"))->level) {
				$boosts = array_values(array_filter($workingCurrentRank["divisions"], function ($division) use ($workingCurrentDivision, $workingDesiredDivision) {
					if ($workingCurrentDivision["value"] == $division["value"]) {
						return false;
					}
					return $division["level"] >= $workingCurrentDivision["level"] && $division["level"] < $workingDesiredDivision["level"];
				}));
			} elseif (ValorantRanks::find($request->input("desiredRank"))->level - ValorantRanks::find($request->input("currentRank"))->level === 1) {
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

			$currentTypeOfService = ValorantTOS::find($request->input("typeOfService"));
			$add_price = $add_price + ($price / 100 * $currentTypeOfService["percentage"]);
			$cart[] = ["Type of service: " . $currentTypeOfService['name'], ($price / 100 * $currentTypeOfService["percentage"]), true];

			if (strpos(strtolower(ValorantTOS::find($request->input("typeOfService"))->name), "duo") !== false) {
				$currentTypeOfCustom = ValorantTOC::find($request->input("typeOfCustom"));
				$add_price = $add_price + ($price / 100 * $currentTypeOfCustom["percentage"]);
				$cart[] = ["Because you have selected " . $currentTypeOfCustom["name"] . " as type of duo we have added " . $currentTypeOfCustom["percentage"] . "% to your payment.", ($price / 100 * $currentTypeOfCustom["percentage"]), true];
			} else {
				$onlyOneAgenyGet = ValorantVips::where([["custom", "=", "specific"], ["boost_id", "=", $code]]);
				if ($request->input("vipOptions") !== null && in_array($onlyOneAgenyGet->pluck("id")[0], $request->input("vipOptions"))) {
					if ($request->input("onlyOneAgent") === true && $onlyOneAgenyGet->count() && ($request->input("agents") !== null && count($request->input("agents")))) {
						$add_price = $add_price + ($price / 100 * $onlyOneAgenyGet->get()[0]->percentage);
						$cart[] = [
							"Only one agent +" . $onlyOneAgenyGet->get()[0]->percentage . "%",
							(round(($price / 100 * $onlyOneAgenyGet->get()[0]->percentage), 2, PHP_ROUND_HALF_UP) * pow(10, 2)) / pow(10, 2),
							true
						];
					}
					if ($request->input("agents") !== null && (count($request->input("agents")) > 2 || count($request->input("agents")) && $request->input("onlyOneAgent") === true && $onlyOneAgenyGet->count())) {
						$add_price = $add_price + ($price / 100 * $onlyOneAgenyGet->get()[0]->percentage);
						$cart[] = [
							"Selected agents addes +" . $onlyOneAgenyGet->get()[0]->percentage . "%",
							(round(($price / 100 * $onlyOneAgenyGet->get()[0]->percentage), 2, PHP_ROUND_HALF_UP) * pow(10, 2)) / pow(10, 2),
							true
						];
					}
				}
			}

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
				$promo = ValorantPromocodes::where('name', '=', $promocode);
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
			$cart[] = ["Current LP", ValorantCL::find($request->input("currentLp"))->name, false];
			$cart[] = ["Type of service", ValorantTOS::find($request->input("typeOfService"))->name, false];
			if (strpos(strtolower(ValorantTOS::find($request->input("typeOfService"))->name), "duo") !== false) {
				$cart[] = ["Type of duo", ValorantTOC::find($request->input("typeOfCustom"))->name, false];
			} else {
				if ($request->input("onlyOneAgent") != null) {
					$cart[] = ["Play only with first agent", "Yes", false];
				}
				if ($request->input("agents") != null) {
					$cart[] = ["Selected agents", json_encode($request->input("agents")), false];
				}
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
			'lol_boost_id' => null,
			'Valorant_boost_id' => $request->input('code'),
			'code' => $randomString,
			'title' => "You've purchased valorant rank boost:",
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
