<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ValorantDivisions extends Model
{
	use HasFactory;

	protected $table = "valorant_divisions";
	protected $primaryKey = "id";
	public $timestamps = false;
	protected $fillable = ["name", "price"];
	protected $visible = ["name", "price"];

	public function ranks()
	{
		return $this->blongsTo(TftRanks::class);
	}
}
