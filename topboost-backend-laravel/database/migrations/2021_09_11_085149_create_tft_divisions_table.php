<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTftDivisionsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('tft_divisions', function (Blueprint $table) {
			$table->increments('id');
			$table->unsignedInteger('rank_id')->nullable()->default(0);
			$table->string('name')->nullable()->default("");
			$table->string('icon')->nullable()->default("");
			$table->float('price')->nullable()->default(0);
			$table->float('price_percent')->nullable()->default(0);
			$table->float('price_percent_duo')->nullable()->default(0);
			$table->float('win_price')->nullable()->default(0);
			$table->float('win_price_percent')->nullable()->default(0);
			$table->float('win_price_percent_duo')->nullable()->default(0);
			$table->float('placement_matches_price')->nullable()->default(0);
			$table->float('placement_matches_price_percent')->nullable()->default(0);
			$table->float('placement_matches_price_percent_duo')->nullable()->default(0);
			$table->float('coaching_price')->nullable()->default(0);
			$table->float('coaching_price_percent')->nullable()->default(0);
			$table->integer('level')->nullable()->default(0);
			$table->foreign('rank_id')->references('id')->on('tft_ranks')
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
		Schema::dropIfExists('tft_divisions');
	}
}
