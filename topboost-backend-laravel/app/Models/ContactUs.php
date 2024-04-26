<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactUs extends Model
{
	use HasFactory;
	protected $table = "contact_us";
	protected $primaryKey = "id";
	public $timestamps = false;
	protected $fillable = [
		'name',
		'email',
		'discordId',
		'orderId',
		'message',
		'read',
		'ip',
		'last_send',
	];
	protected $visible = [
		'name',
		'email',
		'discordId',
		'orderId',
		'message',
		'read',
		'ip',
		'last_send',
	];
}
