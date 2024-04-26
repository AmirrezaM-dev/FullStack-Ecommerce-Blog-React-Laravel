<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TftDivisions extends Model
{
	use HasFactory;

	protected $table = "tft_divisions";
	protected $primaryKey = "id";
	public $timestamps = false;
	protected $fillable = ["name", "price"];
	protected $visible = ["name", "price"];

	public function ranks()
	{
		return $this->blongsTo(TftRanks::class);
	}
}
