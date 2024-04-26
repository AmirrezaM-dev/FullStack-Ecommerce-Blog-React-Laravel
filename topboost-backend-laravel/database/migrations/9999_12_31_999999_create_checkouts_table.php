<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCheckoutsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('checkouts', function (Blueprint $table) {
			$table->increments('id');
			$table->string('code')->nullable()->default("");
			$table->string('title')->nullable()->default("");
			$table->string('info')->nullable()->default("");
			$table->longText('cart')->nullable()->default("");
			$table->float('price')->nullable()->default(0);
			$table->ipAddress('ip')->nullable()->default("");
			$table->boolean('paid')->nullable()->defaultValue(0);
			$table->string('discord_id')->nullable()->defaultValue("");
			$table->string('email')->nullable()->defaultValue("");
			$table->string('username')->nullable()->defaultValue("");
			$table->string('password')->nullable()->defaultValue("");
			$table->longText('sid')->nullable()->default("");
			$table->string('pwd')->nullable()->default("");
			$table->integer('lol_boost_id')->nullable()->default(0);
			$table->integer('tft_boost_id')->nullable()->default(0);
			$table->integer('valorant_boost_id')->nullable()->default(0);
			$table->boolean('ordering')->nullable()->defaultValue(0);
			$table->boolean('act')->nullable()->defaultValue(0);
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('checkouts');
	}
}
