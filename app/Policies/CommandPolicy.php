<?php

namespace App\Policies;

use App\Models\Command;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CommandPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(User $user, Command $command)
    {
        return $user->id === $command->user_id;
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Command  $command
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Command $command)
    {
        return $user->id === $command->user_id;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Command  $command
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Command $command)
    {
        return $user->id === $command->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Command  $command
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Command $command)
    {
        return $user->id === $command->user_id;
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Command  $command
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, Command $command)
    {
        return $user->id === $command->user_id;
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Command  $command
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, Command $command)
    {
        return $user->id === $command->user_id;
    }
}
