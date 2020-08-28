<?php

namespace App\Http\Controllers;

use App\Character;
use App\CharacterClass;
use Illuminate\Http\Request;

class CharacterController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth')->except('show');;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $character = Character::create([
            'user_id' => auth()->user()->id, 
            'player' => auth()->user()->name
        ]);
        return redirect()->route('character.edit', ['id' => $character->external_id]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id, Request $request)
    {
        if($request->header('accept') === 'application/json') {
            $character = Character::findOrFail($id);
            return response()->json([
                'character' => $character,
                'levels' => $character->levels
            ]);
        } else {
            return view('character');
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Character  $character
     * @return \Illuminate\Http\Response
     */
    public function edit($id, Character $character)
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update($id, Request $request)
    {
        try {
            $character = Character::findOrFail($id);
        } catch (Throwable $exception) {
            return response()->json([
                'error' => $exception->getMessage(),
                'errorStage' => 'Failed character fetch'
            ]);
        }

        try {
            $replyCharacter = $character->first()->update(
                $request->input('character')      
            );
        } catch (Throwable $exception) {
            return response()->json([
                'error' => $exception->getMessage(),
                'errorStage' => 'Failed character update'
            ]);
        }

        try {
            $newLevels = $request->input('levels');
            foreach($newLevels as $level) {
                CharacterClass::updateOrCreate(
                    [ 
                        'id' => $level['id']
                    ], [ 
                        'character_id' => $level['character_id'],
                        'class' => $level['class'],
                        'level' => $level['level'],
                    ]
                );
            }
        } catch(Throwable $exception) {
            return response()->json([
                'error' => $exception->getMessage(),
                'errorStage' => 'Failed updating character related model \'CharacterClass\''
            ]);
        }

        return response()->json(["saved" => ["character" => $replyCharacter, "levels" => $newLevels]]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Character  $character
     * @return \Illuminate\Http\Response
     */
    public function destroy(Character $character)
    {
        //
    }
}
