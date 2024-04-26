<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContactUsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('contact_us', function (Blueprint $table) {
			$table->increments("id");
			$table->string('name')->nullable()->default("");
			$table->string('email')->nullable()->default("");
			$table->string('discordId')->nullable()->default("");
			$table->string('orderId')->nullable()->default("");
			$table->longText('message')->nullable()->default("");
			$table->boolean('read')->nullable()->default(false);
			$table->ipAddress('ip')->nullable()->default("");
			$table->integer('last_send')->nullable()->default(0);
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('contact_us');
	}
}
