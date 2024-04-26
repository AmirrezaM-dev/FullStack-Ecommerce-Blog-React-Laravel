<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ValorantVips extends Model
{
	use HasFactory;

	protected $table = "panel_valorant_vips";
	protected $primaryKey = "id";
	public $timestamps = false;
	protected $fillable = ["name", "custom", "percentage"];
	protected $visible = ["name", "custom", "percentage"];

	public function boosts()
	{
		return $this->blongsTo(ValorantBoosts::class);
	}
}
