<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLolRanksTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('lol_ranks', function (Blueprint $table) {
			$table->increments('id');
			$table->string('name')->nullable()->default("");
			$table->boolean('desired')->nullable()->default(0);
			$table->boolean('solo')->nullable()->default(0);
			$table->boolean('duo')->nullable()->default(0);
			$table->boolean('win')->nullable()->default(0);
			$table->boolean('placement_matches')->nullable()->default(0);
			$table->boolean('coaching')->nullable()->default(0);
			$table->boolean('clash')->nullable()->default(0);
			$table->boolean('normal_matches')->nullable()->default(0);
			$table->boolean('champion_mastery')->nullable()->default(0);
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
		Schema::dropIfExists('lol_ranks');
	}
}
