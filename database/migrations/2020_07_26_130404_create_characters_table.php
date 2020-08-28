<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCharactersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('characters', function (Blueprint $table) {
            $table->uuid('external_id');
            $table->bigIncrements('id');
            $table->foreignId('user_id')->references('id')->on('users');
            
            // Basic description
            $table->string('name')->default('Unknown');
            $table->string('player')->default('');
            $table->string('alignment')->default('');
            $table->string('race')->default('');
            $table->string('sex')->default('');
            $table->string('background')->default('');
            $table->text('description')->default('');

            // Misc
            $table->string('class')->default('');

            // Ability scores
            $table->integer('strength')->default(10);
            $table->integer('dexterity')->default(10);
            $table->integer('constitution')->default(10);
            $table->integer('intelligence')->default(10);
            $table->integer('wisdom')->default(10);
            $table->integer('charisma')->default(10);

            // Skills
            $table->json('skills');
            $table->json('saving-throws');

            // Inventory
            $table->unsignedBigInteger('platinum')->default(0);
            $table->unsignedBigInteger('gold')->default(0);
            $table->unsignedBigInteger('electrum')->default(0);
            $table->unsignedBigInteger('silver')->default(0);
            $table->unsignedBigInteger('copper')->default(0);

            // Misc
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
        Schema::dropIfExists('characters');
    }
}
