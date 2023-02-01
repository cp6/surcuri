<?php

namespace App\Models;

use App\Models\Scopes\UserOwnedScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Command extends Model
{
    use HasFactory;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = ['title', 'command', 'last_used'];

    protected static function boot(): void
    {
        parent::boot();
        static::addGlobalScope(new UserOwnedScope());
    }

    protected static function booted(): void
    {
        static::creating(function ($command) {
            $command->user_id = \Auth::id();
        });

        static::created(function (Command $command) {
            ActionLog::make(1, 'create', 'command', 'Created command: '.$command->title);
        });

        static::updated(function () {
            ActionLog::make(1, 'update', 'command', 'Updated command');
        });

        static::deleted(function () {
            ActionLog::make(1, 'delete', 'command', 'Deleted command');
        });
    }

}
