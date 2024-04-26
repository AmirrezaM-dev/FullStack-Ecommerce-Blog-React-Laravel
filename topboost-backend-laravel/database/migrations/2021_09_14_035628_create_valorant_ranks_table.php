<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateValorantRanksTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('valorant_ranks', function (Blueprint $table) {
			$table->increments('id');
			$table->string('name')->nullable()->default("");
			$table->boolean('desired')->nullable()->default(0);
			$table->boolean('rank')->nullable()->default(0);
			$table->boolean('win')->nullable()->default(0);
			$table->boolean('placement_matches')->nullable()->default(0);
			$table->boolean('unrated_matches')->nullable()->default(0);
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
		Schema::dropIfExists('valorant_ranks');
	}
}
