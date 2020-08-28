<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CharacterClass extends Model
{
    protected $primaryKey = 'id';

    protected $table = 'character_classes';
    protected $fillable = ['character_id', 'class', 'level'];

    public function character() {
        return $this->belongsTo(Character::class, 'id', 'character_id');
    }
}
