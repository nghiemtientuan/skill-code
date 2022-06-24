<?php

/**
* Tip 38. More convenient DD
*
* Instead of doing dd($result); you can put ->dd() as a method directly at the end of your
* Eloquent sentence, or any Collection.
*/
function ddTest() {
    // Instead of
    $users = User::where('name', 'Taylor')->get();
    dd($users);

    // Do this
    $users = User::where('name', 'Taylor')->get()->dd();
}

/**
 * Tip 50. Always Check if Relationship Exists
 * Never ever do $model->relationship->field without checking if relationship
 * object still exists.
 * It may be deleted for whatever reason, outside your code, by someone else's queued
 * job etc. Do if-else, or {{ $model->relationship->field ?? '' }} in
 * Blade, or {{ optional($model->relationship)->field }}
 */
function ifRelationship($model) {
    // example
    $model->relationship->field;

    // do this
    $a = isset($model->relationship->field) ? $model->relationship->field : '';
    $a = optional($model->relationship)->field;
}

/**
 * Tip 78. Check if Relationship Method Exists
 * If your Eloquent relationship names are dynamic and you need to check if
 * relationship with such name exists on the object, use PHP function
 * method_exists($object, $methodName)
 */
function ifRelationshipMethodExists($model) {
    $user = User::first();
    if (method_exists($user, 'roles')) {
      // Do something with $user->roles()->...
    }
}
