<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ValorantRegions extends Model
{
	use HasFactory;

	protected $table = "valorant_regions";
	protected $primaryKey = "id";
	public $timestamps = false;
	protected $fillable = ["name"];
	protected $visible = ["name"];
}
