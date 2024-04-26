<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Langs extends Model
{
    use HasFactory;
	protected $table = "panel_langs";
	protected $primaryKey = "id";
	public $timestamps = false;
}
