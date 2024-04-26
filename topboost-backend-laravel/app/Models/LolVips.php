<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LolVips extends Model
{
	use HasFactory;

	protected $table = "lol_vips";
	protected $primaryKey = "id";
	public $timestamps = false;
	protected $fillable = ["name", "custom", "percentage"];
	protected $visible = ["name", "custom", "percentage"];

	public function boosts()
	{
		return $this->blongsTo(LolBoosts::class);
	}
}
