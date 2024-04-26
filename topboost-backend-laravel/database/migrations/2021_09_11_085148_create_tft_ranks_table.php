<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTftRanksTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('tft_ranks', function (Blueprint $table) {
			$table->increments('id');
			$table->string('name')->nullable()->default("");
			$table->boolean('desired')->nullable()->default(0);
			$table->boolean('solo')->nullable()->default(0);
			$table->boolean('duo')->nullable()->default(0);
			$table->boolean('win')->nullable()->default(0);
			$table->boolean('placement_matches')->nullable()->default(0);
			$table->boolean('coaching')->nullable()->default(0);
			$table->integer('level')->nullable()->default(0);
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('tft_ranks');
	}
}
