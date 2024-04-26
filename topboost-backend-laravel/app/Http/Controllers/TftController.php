<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\TftPromocodes;

class TftController extends Controller
{
	public function firstData()
	{
		$this->tftFixData();
		return response()->json([
			"message" => "success",
			"ranks" => $this->ranks,
			"regions" => $this->regions,
			"typeofqueue" => $this->typeofqueue,
			"typeofservice" => $this->typeofservice,
			"typeofcustom" => $this->typeofcustom,
			"currentlp" => $this->currentlp,
			"vip" => $this->vip,
			"langs" => $this->langs,
			"champions" => $this->champions,
		]);
	}
	public function promocode(Request $request)
	{
		$promocode = strtolower($request->input("promocode"));
		$percentage = 0;
		$promo = TftPromocodes::where('name', '=', $promocode);
		if ($promo->count()) {
			$percentage = $promo->get();
		}
		return response()->json([
			"message" => ($promo->count() ? "success" : "fail"),
			"percentage" => ($promo->count() ? $percentage[0]->percentage : 0)
		]);
	}
}
