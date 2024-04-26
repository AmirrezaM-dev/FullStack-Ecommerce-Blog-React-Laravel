<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TftVips extends Model
{
	use HasFactory;

	protected $table = "tft_vips";
	protected $primaryKey = "id";
	public $timestamps = false;
	protected $fillable = ["name", "custom", "percentage"];
	protected $visible = ["name", "custom", "percentage"];

	public function boosts()
	{
		return $this->blongsTo(TftBoosts::class);
	}
}
