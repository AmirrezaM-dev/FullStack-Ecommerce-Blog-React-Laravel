<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\LolPromocodes;

class LolController extends Controller
{
	public function firstData()
	{
		$this->lolFixData();
		return response()->json([
			"message" => "success",
			"ranks" => $this->ranks,
			"regions" => $this->regions,
			"typeofqueue" => $this->typeofqueue,
			"typeofservice" => $this->typeofservice,
			"typeofcustom" => $this->typeofcustom,
			"currentlp" => $this->currentlp,
			"vip" => $this->vip,
			"roles" => $this->roles,
			"langs" => $this->langs,
			"teamtires" => $this->teamtires,
			"champions" => $this->champions,
			"champions_level" => $this->champions_level,
			"levels" => $this->levels,
			"level_pricing" => $this->level_pricing,
		]);
	}
	public function promocode(Request $request)
	{
		$promocode = strtolower($request->input("promocode"));
		$percentage = 0;
		$promo = LolPromocodes::where('name', '=', $promocode);
		if ($promo->count()) {
			$percentage = $promo->get()[0];
		}
		return response()->json([
			"message" => ($promo->count() ? "success" : "fail"),
			"percentage" => ($promo->count() ? $percentage->percentage : 0)
		]);
	}
}
