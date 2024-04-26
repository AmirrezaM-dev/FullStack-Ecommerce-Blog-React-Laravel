<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TftRanks extends Model
{
	use HasFactory;

	protected $table = "tft_ranks";
	protected $primaryKey = "id";
	public $timestamps = false;
	protected $fillable = [
		"name",
		"desired",
		"placement",
		"level",
	];
	protected $visible = [
		"name",
		"desired",
		"placement",
		"level",
	];

	public function divisions()
	{
		return $this->hasMany(TftDivisions::class);
	}
}
