<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLolChampionTSTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('lol_champion_token', function (Blueprint $table) {
			$table->increments('id');
			$table->string('title')->nullable()->default("");
			$table->float('price')->nullable()->default(0);
			$table->unsignedInteger('level_id')->nullable()->default(0);
			$table->foreign('level_id')->references('id')->on('lol_champion_level')
				->onDelete('cascade');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('lol_champion_token');
	}
}
