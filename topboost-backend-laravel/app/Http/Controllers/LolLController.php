<?php

namespace App\Http\Controllers;

use App\Models\LolRegions;
use App\Models\LolVips;
use App\Models\LolPromocodes;
use App\Models\Checkouts;
use App\Models\LolLevelPrice;

use Illuminate\Http\Request;

class LolLController extends Controller
{
	public function makePurchase(Request $request)
	{
		$this->lolFixData();
		$code = 9;
		$price = 0;
		$add_price = 0;
		$cart = [];
		$error = 0;
		if ($request->input("gameRegion") == null) {
			$error = "gameRegion";
		}
		if ($request->input("currentLevel") == null) {
			$error = "currentLevel";
		}
		if ($request->input("desiredLevel") == null) {
			$error = "desiredLevel";
		}

		if (!$error) {
			for (
				$i = $request->input("currentLevel");
				$i  < $request->input("desiredLevel");
				$i++
			) {
				$cp = LolLevelPrice::where("min_lvl", "<=", $i)->where("max_lvl", ">=", $i);
				if ($cp->count()) $price += $cp->get()[0]->price;
			}

			$cart[] = ["From level " . $request->input("currentLevel") . " to level " . $request->input("desiredLevel"), (round($price, 2, PHP_ROUND_HALF_UP) * pow(10, 2)) / pow(10, 2), true];

			$currentVipOptions = array_values(array_filter($this->vip, function ($vip_single) use ($request, $code) {
				return in_array($vip_single['value'], $request->input("vipOptions")) && (strlen($vip_single['custom']) == 0 || $vip_single['custom'] === "-") && $vip_single["boost_id"] == $code;
			}));
			foreach ($currentVipOptions as &$value) {
				$add_price = $add_price + ($price / 100 * $value["percentage"]);
				$cart[] = [$value['label'], ($price / 100 * $value["percentage"]), true];
			}

			$flash = LolVips::where([["custom", "=", "flash"], ["boost_id", "=", $code]]);
			if ($flash->count()) {
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

			$cart[] = ["Order", "From level " . $request->input("currentLevel") . " to level " . $request->input("desiredLevel"), false];
			$cart[] = ["Game Region", LolRegions::find($request->input("gameRegion"))->name, false];
			if ($request->input("flashLocation") != null) {
				$cart[] = ["Flash Location", $request->input("flashLocation"), false];
			}
			foreach ($currentVipOptions as &$value) {
				$cart[] = [$value['label'], "Yes", false];
			}
			$price = round($price, 2, PHP_ROUND_HALF_UP);
			$price = ($price * pow(10, 2)) / pow(10, 2);
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
			'title' => "You've purchased league of legends leveling boost:",
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
