<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLolLevelPricesTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('lol_level_prices', function (Blueprint $table) {
			$table->increments('id');
			$table->integer('min_lvl')->nullable()->default(0);
			$table->integer('max_lvl')->nullable()->default(0);
			$table->float('price')->nullable()->default(0);
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('lol_level_prices');
	}
}
