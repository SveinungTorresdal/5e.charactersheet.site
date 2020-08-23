<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CharacterClass extends Model
{
    protected $table = 'character_classes';
    protected $fillable = ['class', 'level'];

    public function character() {
        return $this->belongsTo(Character::class, 'id', 'character_id');
    }
}
