<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserResetCodesTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('user_reset_codes', function (Blueprint $table) {
			$table->increments('id');
			$table->string('code')->unique();
			$table->ipAddress('ip')->nullable()->default("");
			$table->unsignedInteger('user_id')->nullable()->default(0);
			$table->foreign('user_id')->references('id')->on('users')
				->onDelete('cascade');
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
		Schema::dropIfExists('user_reset_codes');
	}
}
