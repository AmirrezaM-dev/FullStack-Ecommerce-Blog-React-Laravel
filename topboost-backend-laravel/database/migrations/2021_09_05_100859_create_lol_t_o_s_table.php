<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLolTOSTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('lol_tos', function (Blueprint $table) {
			$table->increments('id');
			$table->string('name')->nullable()->default("");
			$table->float('percentage')->nullable()->default(0);
			$table->unsignedInteger('boost_id')->nullable()->default(0);
			$table->foreign('boost_id')->references('id')->on('lol_boosts')
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
		Schema::dropIfExists('lol_tos');
	}
}
