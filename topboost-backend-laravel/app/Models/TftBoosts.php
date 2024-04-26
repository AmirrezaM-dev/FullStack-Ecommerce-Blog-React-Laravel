<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TftBoosts extends Model
{
	use HasFactory;

	protected $table = "tft_boosts";
	protected $primaryKey = "id";
	public $timestamps = false;
	protected $fillable = ["name"];
	protected $visible = ["name"];

	public function vips()
	{
		return $this->hasMany(TftVips::class);
	}
	public function CLs()
	{
		return $this->hasMany(TftCL::class);
	}
	public function TOCs()
	{
		return $this->hasMany(TftTOC::class);
	}
	public function Checkouts()
	{
		return $this->hasMany(Checkouts::class);
	}
}
