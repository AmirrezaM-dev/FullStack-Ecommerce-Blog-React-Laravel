<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ValorantTOC extends Model
{
	use HasFactory;

	protected $table = "valorant_toc";
	protected $primaryKey = "id";
	public $timestamps = false;
	protected $fillable = ["name", "percentage"];
	protected $visible = ["name", "percentage"];

	public function boosts()
	{
		return $this->blongsTo(ValorantBoosts::class);
	}
}
