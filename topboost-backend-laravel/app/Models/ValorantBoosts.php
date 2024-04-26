<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ValorantBoosts extends Model
{
	use HasFactory;

	protected $table = "panel_valorant_boosts";
	protected $primaryKey = "id";
	public $timestamps = false;
	protected $fillable = ["name"];
	protected $visible = ["name"];

	public function vips()
	{
		return $this->hasMany(ValorantVips::class);
	}
	public function CLs()
	{
		return $this->hasMany(ValorantCL::class);
	}
	public function TOCs()
	{
		return $this->hasMany(ValorantTOC::class);
	}
	public function Checkouts()
	{
		return $this->hasMany(Checkouts::class);
	}
}
