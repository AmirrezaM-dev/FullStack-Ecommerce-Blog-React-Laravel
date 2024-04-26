<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserResetCode extends Model
{
	use HasFactory;

	protected $primaryKey = "id";
	protected $table = "user_reset_codes";

	protected $fillable = [
		'code',
		'user_id',
		'ip',
	];
	protected $hidden = [
		'code',
		'ip',
	];

	public function user()
	{
		return $this->belongsTo(User::class);
	}
}
