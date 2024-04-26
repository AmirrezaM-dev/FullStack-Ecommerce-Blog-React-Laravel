<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LolChampionT extends Model
{
	use HasFactory;

	protected $table = "lol_champion_token";
	protected $primaryKey = "id";
	public $timestamps = false;
	protected $fillable = ["title", "price"];
	protected $visible = ["title", "price"];

	public function level()
	{
		return $this->blongsTo(LolChampionL::class);
	}
}
