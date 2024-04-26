<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

use App\Models\LolRanks;
use App\Models\LolDivisions;
use App\Models\LolRegions;
use App\Models\LolTOQ;
use App\Models\LolTOS;
use App\Models\LolTOC;
use App\Models\LolCL;
use App\Models\LolVips;
use App\Models\LolRoles;
use App\Models\LolClashTT;
use App\Models\LolChampionL;
use App\Models\LolLevel;
use App\Models\LolLevelPrice;
use App\Models\Langs;

use App\Models\TftRanks;
use App\Models\TftDivisions;
use App\Models\TftRegions;
use App\Models\TftTOS;
use App\Models\TftTOC;
use App\Models\TftCL;
use App\Models\TftVips;

use App\Models\ValorantRanks;
use App\Models\ValorantDivisions;
use App\Models\ValorantRegions;
use App\Models\ValorantTOS;
use App\Models\ValorantTOC;
use App\Models\ValorantCL;
use App\Models\ValorantVips;


class Controller extends BaseController
{
	use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

	protected function randomCode()
	{
		$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		$charactersLength = strlen($characters);
		$randomString = '';
		for ($i = 0; $i < 15; $i++) {
			$randomString .= $characters[rand(0, $charactersLength - 1)];
		}
		return $randomString;
	}

	// LOL
	protected $ranks = [];
	protected $divisions = [];
	protected $regions = [];
	protected $typeofqueue = [];
	protected $typeofservice = [];
	protected $typeofcustom = [];
	protected $roles = [];
	protected $teamtires = [];
	protected $langs = [];
	protected $currentlp = [];
	protected $vip = [];
	protected $champions = [];
	protected $agents = [];
	protected $champions_level = [];
	protected $icons = [];
	protected $levels = [];
	protected $level_pricing = [];
	protected function lolFixData()
	{
		$this->levels = LolLevel::where("id", "!=", "0")->get();
		$this->levels = ($this->levels->count() ? [$this->levels->first()->min_lvl, $this->levels->first()->max_lvl] : [1, 1]);
		foreach (LolLevelPrice::all()->pluck("id") as $id) {
			$item = LolLevelPrice::find($id);
			$this->level_pricing[] = [
				"min" => $item->min_lvl,
				"max" => $item->max_lvl,
				"price" => $item->price,
			];
		}
		foreach (LolRegions::all()->pluck("id") as $id) {
			$item = LolRegions::find($id);
			$this->regions[] = [
				"value" => $id,
				"label" => $item->name,
			];
		}
		foreach (LolRoles::all()->pluck("id") as $id) {
			$item = LolRoles::find($id);
			$this->roles[] = [
				"value" => $id,
				"label" => $item->name,
				"icon" => $item->icon,
			];
		}
		foreach (Langs::all()->pluck("id") as $id) {
			$item = Langs::find($id);
			$this->langs[] = [
				"value" => $id,
				"label" => $item->name
			];
		}
		foreach (LolClashTT::all()->pluck("id") as $id) {
			$item = LolClashTT::find($id);
			$this->teamtires[] = [
				"value" => $id,
				"label" => $item->name,
				"price" => $item->price,
			];
		}
		foreach (LolChampionL::all()->pluck("id") as $id) {
			$item = LolChampionL::find($id);
			$tokens = [];
			foreach ($item->tokens()->get() as $iitem) {
				$tokens[] = [
					"value" => $iitem->id,
					"label" => $iitem->title,
					"price" => $iitem->price
				];
			}
			$this->champions_level[] = [
				"value" => $id,
				"label" => "Level " . $item->level,
				"level" => $item->level,
				"tokens" => $tokens,
			];
		}
		foreach (LolTOQ::all()->pluck("id") as $id) {
			$item = LolTOQ::find($id);
			$this->typeofqueue[] = [
				"value" => $id,
				"label" => $item->name,
				"percentage" => $item->percentage,
				"boost_id" => $item->boost_id,
			];
		}
		foreach (LolTOS::all()->pluck("id") as $id) {
			$item = LolTOS::find($id);
			$this->typeofservice[] = [
				"value" => $id,
				"label" => $item->name,
				"percentage" => $item->percentage,
				"boost_id" => $item->boost_id,
			];
		}
		foreach (LolTOC::all()->pluck("id") as $id) {
			$item = LolTOC::find($id);
			$this->typeofcustom[] = [
				"value" => $id,
				"label" => $item->name,
				"contents" => $item->contents,
				"percentage" => $item->percentage,
				"boost_id" => $item->boost_id,
			];
		}
		foreach (LolCL::all()->pluck("id") as $id) {
			$item = LolCL::find($id);
			$this->currentlp[] = [
				"value" => $id,
				"label" => $item->name,
				"percentage" => $item->percentage,
				"boost_id" => $item->boost_id,
			];
		}
		foreach (LolVips::all()->pluck("id") as $id) {
			$item = LolVips::find($id);
			$this->vip[] = [
				"value" => $id,
				"label" => $item->name,
				"percentage" => $item->percentage,
				"custom" => $item->custom,
				"boost_id" => $item->boost_id,
			];
		}
		foreach (LolRanks::all()->pluck("id") as $id) {
			$item = LolRanks::find($id);
			$this->divisionsGets = LolDivisions::where("rank_id", "=", $id);
			$items = $this->divisionsGets->pluck("id");
			$counted = $this->divisionsGets->count();
			$sumPrice = 0;
			for ($i = 0; $i < $counted; $i++) {
				$this->divisionsGet = LolDivisions::find($items[$i]);
				$this->divisions[$id][] = [
					"value" => $items[$i],
					"label" => $this->divisionsGet->name,
					"price" => $this->divisionsGet->price,
					"win_price" => $this->divisionsGet->win_price,
					"placement_matches_price" => $this->divisionsGet->placement_matches_price,
					"coaching_price" => $this->divisionsGet->coaching_price,
					"normal_price" => $this->divisionsGet->normal_price,
					"level" => $this->divisionsGet->level,
					"icon" => $this->divisionsGet->icon,
				];
				$sumPrice += $this->divisionsGet->price;
			}
			$this->ranks[] = [
				"value" => $id,
				"label" => $item->name,
				"level" => $item->level,
				"divisions" => (isset($this->divisions[$id]) ? $this->divisions[$id] : []),
				"sumPrice" => $sumPrice,
				"desired" => $item->desired,
				"solo" => $item->solo,
				"duo" => $item->duo,
				"win" => $item->win,
				"placement_matches" => $item->placement_matches,
				"coaching" => $item->coaching,
				"clash" => $item->clash,
				"normal_matches" => $item->normal_matches,
				"champion_mastery" => $item->champion_mastery,
			];
			$this->icons[$id] = $item->icon;
		}
		$json = file_get_contents('http://ddragon.leagueoflegends.com/cdn/9.3.1/data/en_US/champion.json');
		$obj = json_decode($json);
		foreach ($obj->data as &$val) {
			$this->champions[] = [
				"value" => $val->name,
				"label" => $val->name,
			];
		}
	}
	// LOL
	// TFT
	protected function tftFixData()
	{
		foreach (TftRegions::all()->pluck("id") as $id) {
			$item = TftRegions::find($id);
			$this->regions[] = [
				"value" => $id,
				"label" => $item->name,
			];
		}
		foreach (Langs::all()->pluck("id") as $id) {
			$item = Langs::find($id);
			$this->langs[] = [
				"value" => $id,
				"label" => $item->name
			];
		}
		foreach (TftTOS::all()->pluck("id") as $id) {
			$item = TftTOS::find($id);
			$this->typeofservice[] = [
				"value" => $id,
				"label" => $item->name,
				"percentage" => $item->percentage,
				"boost_id" => $item->boost_id,
			];
		}
		foreach (TftTOC::all()->pluck("id") as $id) {
			$item = TftTOC::find($id);
			$this->typeofcustom[] = [
				"value" => $id,
				"label" => $item->name,
				"contents" => $item->contents,
				"percentage" => $item->percentage,
				"boost_id" => $item->boost_id,
			];
		}
		foreach (TftCL::all()->pluck("id") as $id) {
			$item = TftCL::find($id);
			$this->currentlp[] = [
				"value" => $id,
				"label" => $item->name,
				"percentage" => $item->percentage,
				"boost_id" => $item->boost_id,
			];
		}
		foreach (TftVips::all()->pluck("id") as $id) {
			$item = TftVips::find($id);
			$this->vip[] = [
				"value" => $id,
				"label" => $item->name,
				"percentage" => $item->percentage,
				"custom" => $item->custom,
				"boost_id" => $item->boost_id,
			];
		}
		foreach (TftRanks::all()->pluck("id") as $id) {
			$item = TftRanks::find($id);
			$this->divisionsGets = TftDivisions::where("rank_id", "=", $id);
			$items = $this->divisionsGets->pluck("id");
			$counted = $this->divisionsGets->count();
			$sumPrice = 0;
			for ($i = 0; $i < $counted; $i++) {
				$this->divisionsGet = TftDivisions::find($items[$i]);
				$this->divisions[$id][] = [
					"value" => $items[$i],
					"label" => $this->divisionsGet->name,
					"price" => $this->divisionsGet->price,
					"win_price" => $this->divisionsGet->win_price,
					"placement_matches_price" => $this->divisionsGet->placement_matches_price,
					"coaching_price" => $this->divisionsGet->coaching_price,
					"level" => $this->divisionsGet->level,
					"icon" => $this->divisionsGet->icon,
				];
				$sumPrice += $this->divisionsGet->price;
			}
			$this->ranks[] = [
				"value" => $id,
				"label" => $item->name,
				"level" => $item->level,
				"divisions" => (isset($this->divisions[$id]) ? $this->divisions[$id] : []),
				"sumPrice" => $sumPrice,
				"desired" => $item->desired,
				"solo" => $item->solo,
				"duo" => $item->duo,
				"win" => $item->win,
				"placement_matches" => $item->placement_matches,
				"coaching" => $item->coaching,
			];
			$this->icons[$id] = $item->icon;
		}
		$json = file_get_contents('http://ddragon.leagueoflegends.com/cdn/9.3.1/data/en_US/champion.json');
		$obj = json_decode($json);
		foreach ($obj->data as &$val) {
			$this->champions[] = [
				"value" => $val->name,
				"label" => $val->name,
			];
		}
	}
	// TFT
	// Valorant
	protected function valorantFixData()
	{
		foreach (ValorantRegions::all()->pluck("id") as $id) {
			$item = ValorantRegions::find($id);
			$this->regions[] = [
				"value" => $id,
				"label" => $item->name,
			];
		}
		foreach (Langs::all()->pluck("id") as $id) {
			$item = Langs::find($id);
			$this->langs[] = [
				"value" => $id,
				"label" => $item->name
			];
		}
		foreach (ValorantTOS::all()->pluck("id") as $id) {
			$item = ValorantTOS::find($id);
			$this->typeofservice[] = [
				"value" => $id,
				"label" => $item->name,
				"percentage" => $item->percentage,
				"boost_id" => $item->boost_id,
			];
		}
		foreach (ValorantTOC::all()->pluck("id") as $id) {
			$item = ValorantTOC::find($id);
			$this->typeofcustom[] = [
				"value" => $id,
				"label" => $item->name,
				"contents" => $item->contents,
				"percentage" => $item->percentage,
				"boost_id" => $item->boost_id,
			];
		}
		foreach (ValorantCL::all()->pluck("id") as $id) {
			$item = ValorantCL::find($id);
			$this->currentlp[] = [
				"value" => $id,
				"label" => $item->name,
				"percentage" => $item->percentage,
				"boost_id" => $item->boost_id,
			];
		}
		foreach (ValorantVips::all()->pluck("id") as $id) {
			$item = ValorantVips::find($id);
			$this->vip[] = [
				"value" => $id,
				"label" => $item->name,
				"percentage" => $item->percentage,
				"custom" => $item->custom,
				"boost_id" => $item->boost_id,
			];
		}
		foreach (ValorantRanks::all()->pluck("id") as $id) {
			$item = ValorantRanks::find($id);
			$this->divisionsGets = ValorantDivisions::where("rank_id", "=", $id);
			$items = $this->divisionsGets->pluck("id");
			$counted = $this->divisionsGets->count();
			$sumPrice = 0;
			for ($i = 0; $i < $counted; $i++) {
				$this->divisionsGet = ValorantDivisions::find($items[$i]);
				$this->divisions[$id][] = [
					"value" => $items[$i],
					"label" => $this->divisionsGet->name,
					"price" => $this->divisionsGet->price,
					"win_price" => $this->divisionsGet->win_price,
					"placement_matches_price" => $this->divisionsGet->placement_matches_price,
					"coaching_price" => $this->divisionsGet->coaching_price,
					"unrated_price" => $this->divisionsGet->unrated_price,
					"level" => $this->divisionsGet->level,
					"icon" => $this->divisionsGet->icon,
				];
				$sumPrice += $this->divisionsGet->price;
			}
			$this->ranks[] = [
				"value" => $id,
				"label" => $item->name,
				"level" => $item->level,
				"divisions" => (isset($this->divisions[$id]) ? $this->divisions[$id] : []),
				"sumPrice" => $sumPrice,
				"desired" => $item->desired,
				"rank" => $item->rank,
				"win" => $item->win,
				"placement_matches" => $item->placement_matches,
				"coaching" => $item->coaching,
				"unrated_matches" => $item->unrated_matches,
			];
			$this->icons[$id] = $item->icon;
		}

		$agents = [
			"Breach",
			"Brimstone",
			"Cypher",
			"Jett",
			"Omen",
			"Phoenix",
			"Reyna",
			"Raze",
			"Sage",
			"Sova",
			"Viper",
		];
		foreach ($agents as &$val) {
			$this->agents[] = [
				"value" => $val,
				"label" => $val,
			];
		}
	}
	// Valorant
}
