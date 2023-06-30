<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\CategoryController;

Route::prefix('admin')->middleware(['auth', 'admin.view'])->group(function () {
    Route::resource('categories', CategoryController::class);
});
