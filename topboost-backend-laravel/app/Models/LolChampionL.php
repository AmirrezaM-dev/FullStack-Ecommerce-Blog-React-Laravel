<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LolChampionL extends Model
{
	use HasFactory;

	protected $table = "lol_champion_level";
	protected $primaryKey = "id";
	public $timestamps = false;
	protected $fillable = ["level"];
	protected $visible = ["level"];

	public function tokens()
	{
		return $this->hasMany(LolChampionT::class, 'level_id');
	}
}
