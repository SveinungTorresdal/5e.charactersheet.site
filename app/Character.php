<?php

namespace App;
use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Database\Eloquent\Model;

class Character extends Model
{
    use Uuid;
    protected $primaryKey = 'external_id';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = ['user_id', 'name', 'player', 'alignment', 'race', 'sex', 'background', 'description', 'class', 'strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma', 'platinum', 'gold', 'electrum', 'silver', 'copper'];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function levels() {
        return $this->hasMany(CharacterClass::class, 'character_id', 'id');
    }
}
