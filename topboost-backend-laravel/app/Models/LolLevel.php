<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LolLevel extends Model
{
	use HasFactory;

	protected $table = "lol_levels";
	protected $primaryKey = "id";
	public $timestamps = false;
	protected $fillable = ["min_level", "max_level"];
	protected $visible = ["min_level", "max_level"];
}
