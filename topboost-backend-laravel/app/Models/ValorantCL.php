<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ValorantCL extends Model
{
	use HasFactory;

	protected $table = "valorant_cl";
	protected $primaryKey = "id";
	public $timestamps = false;
	protected $fillable = ["name", "percentage"];
	protected $visible = ["name", "percentage"];

	public function boosts()
	{
		return $this->blongsTo(LolBoosts::class);
	}
}
