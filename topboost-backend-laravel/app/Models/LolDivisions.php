<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LolDivisions extends Model
{
	use HasFactory;

	protected $table = "lol_divisions";
	protected $primaryKey = "id";
	public $timestamps = false;
	protected $fillable = ["name", "price"];
	protected $visible = ["name", "price"];

	public function ranks()
	{
		return $this->blongsTo(LolRanks::class);
	}
}
