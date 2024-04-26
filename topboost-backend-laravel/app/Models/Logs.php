<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Logs extends Model
{
	use HasFactory;

	protected $table = "logs";
	protected $primaryKey = "id";
	public $timestamps = false;
	protected $fillable = ["slot1", "slot2", "slot3"];
	protected $visible = ["slot1", "slot2", "slot3"];
}
