<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LolLevelPrice extends Model
{
	use HasFactory;

	protected $table = "lol_level_prices";
	protected $primaryKey = "id";
	public $timestamps = false;
	protected $fillable = ["min_level", "max_level", "price"];
	protected $visible = ["min_level", "max_level", "price"];
}
