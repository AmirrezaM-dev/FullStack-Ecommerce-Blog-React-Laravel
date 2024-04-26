<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TftTOC extends Model
{
	use HasFactory;

	protected $table = "tft_toc";
	protected $primaryKey = "id";
	public $timestamps = false;
	protected $fillable = ["name", "percentage"];
	protected $visible = ["name", "percentage"];

	public function boosts()
	{
		return $this->blongsTo(TftBoosts::class);
	}
}
