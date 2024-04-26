<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LolPromocodes extends Model
{
	use HasFactory;

	protected $table = "lol_promocodes";
	protected $primaryKey = "id";
	public $timestamps = false;
	protected $fillable = ["name", "percentage"];
	protected $visible = ["name", "percentage"];
}
