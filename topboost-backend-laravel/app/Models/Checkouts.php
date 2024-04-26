<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Checkouts extends Model
{
	use HasFactory;
	protected $table = "panel_checkouts";
	protected $primaryKey = "id";
	protected $fillable = [
		"created_at",
		"code",
		"title",
		"cart",
		"price",
		"ip",
		"paid",
		"sid",
		"act",
		"password",
		"email",
		"username",
		"discord_id",
		"pwd",
	];
	protected $visible = [
		"created_at",
		"code",
		"title",
		"cart",
		"price",
		// "ip",
		"paid",
		// "sid",
		"act",
		"password",
		"email",
		"username",
		"discord_id",
		"pwd",
	];
	public function boosts()
	{
		return $this->blongsTo(LolBoosts::class);
	}
}
