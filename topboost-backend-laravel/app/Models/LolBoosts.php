<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LolBoosts extends Model
{
	use HasFactory;
	protected $table = "lol_boosts";
	protected $primaryKey = "id";
	public $timestamps = false;
	protected $fillable = ["name"];
	protected $visible = ["name"];

	public function vips()
	{
		return $this->hasMany(LolVips::class);
	}
	public function CLs()
	{
		return $this->hasMany(LolCL::class);
	}
	public function TOQs()
	{
		return $this->hasMany(LolTOQ::class);
	}
	public function TOCs()
	{
		return $this->hasMany(LolTOC::class);
	}
	public function Checkouts()
	{
		return $this->hasMany(Checkouts::class);
	}
}
