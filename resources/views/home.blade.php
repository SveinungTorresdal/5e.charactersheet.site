@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Dashboard</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    You are logged in!

                    @foreach (Auth::user()->characters as $character)
                    <a href="{{ route('character.edit', ['id' => $character->external_id]) }}">Character</a>
                    @endforeach
                </div>
                <div class="card-footer">
                    <a href="{{ route('character.create') }}">&raquo; New character</a>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
