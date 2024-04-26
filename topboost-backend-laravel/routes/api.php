<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactUsController;
use App\Http\Controllers\CheckoutsController;
use App\Http\Controllers\LolController;
use App\Http\Controllers\LolSoloController;
use App\Http\Controllers\LolDuoController;
use App\Http\Controllers\LolWinController;
use App\Http\Controllers\LolPlacementMatchesController;
use App\Http\Controllers\LolCoachingController;
use App\Http\Controllers\LolClashController;
use App\Http\Controllers\LolNMController;
use App\Http\Controllers\LolCMController;
use App\Http\Controllers\LolLController;
use App\Http\Controllers\TftController;
use App\Http\Controllers\TftSoloController;
use App\Http\Controllers\TftDuoController;
use App\Http\Controllers\TftWinController;
use App\Http\Controllers\TftPlacementMatchesController;
use App\Http\Controllers\TftCoachingController;
use App\Http\Controllers\ValorantController;
use App\Http\Controllers\ValorantRankController;
use App\Http\Controllers\ValorantWinController;
use App\Http\Controllers\ValorantPlacementMatchesController;
use App\Http\Controllers\ValorantCoachingController;
use App\Http\Controllers\ValorantUMController;
use App\Http\Controllers\AuthController;

Route::group(['middleware' => ['auth:sanctum']], function () {
	Route::post('/newPassword', [AuthController::class, 'newPassword']);
	Route::post('/resendVerify', [AuthController::class, 'resendVerify']);
	Route::post('/verifyEmail/{code}', [AuthController::class, 'verifyEmail']);
	Route::any('/user', [AuthController::class, 'user']);
	Route::any('/logout', [AuthController::class, 'logout']);
});

Route::any('/unauthenticated', [AuthController::class, 'unauthenticated'])->name("unauthenticated");
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot', [AuthController::class, 'sendReset']);
Route::post('/resetPassword/{code}', [AuthController::class, 'resetPassword']);

Route::post('/contactUs', [ContactUsController::class, 'createMessage']);

Route::post('/custompay', [CheckoutsController::class, 'custompay']);

Route::post('/checkout', [CheckoutsController::class, 'getData']);

Route::get('/checkout/{purchaseCode}/{sessionId}', [CheckoutsController::class, 'complete']);

Route::post('/LeagueOfLegends/firstData', [LolController::class, 'firstData']);

Route::post('/LeagueOfLegends/solo/makePurchase', [LolSoloController::class, 'makePurchase']);

Route::post('/LeagueOfLegends/duoCode/makePurchase', [LolDuoController::class, 'makePurchase']);

Route::post('/LeagueOfLegends/winCode/makePurchase', [LolWinController::class, 'makePurchase']);

Route::post('/LeagueOfLegends/placementMatchCode/makePurchase', [LolPlacementMatchesController::class, 'makePurchase']);

Route::post('/LeagueOfLegends/coachingCode/makePurchase', [LolCoachingController::class, 'makePurchase']);

Route::post('/LeagueOfLegends/clashCode/makePurchase', [LolClashController::class, 'makePurchase']);

Route::post('/LeagueOfLegends/nMCode/makePurchase', [LolNMController::class, 'makePurchase']);

Route::post('/LeagueOfLegends/cMCode/makePurchase', [LolCMController::class, 'makePurchase']);

Route::post('/LeagueOfLegends/lCode/makePurchase', [LolLController::class, 'makePurchase']);

Route::post('/LeagueOfLegends/promocode', [LolController::class, 'promocode']);

Route::post('/TeamfightTactics/firstData', [TftController::class, 'firstData']);

Route::post('/TeamfightTactics/solo/makePurchase', [TftSoloController::class, 'makePurchase']);

Route::post('/TeamfightTactics/duoCode/makePurchase', [TftDuoController::class, 'makePurchase']);

Route::post('/TeamfightTactics/winCode/makePurchase', [TftWinController::class, 'makePurchase']);

Route::post('/TeamfightTactics/placementMatchCode/makePurchase', [TftPlacementMatchesController::class, 'makePurchase']);

Route::post('/TeamfightTactics/coachingCode/makePurchase', [TftCoachingController::class, 'makePurchase']);

Route::post('/TeamfightTactics/promocode', [TftController::class, 'promocode']);

Route::post('/Valorant/firstData', [ValorantController::class, 'firstData']);

Route::post('/Valorant/rankCode/makePurchase', [ValorantRankController::class, 'makePurchase']);

Route::post('/Valorant/winCode/makePurchase', [ValorantWinController::class, 'makePurchase']);

Route::post('/Valorant/placementMatchCode/makePurchase', [ValorantPlacementMatchesController::class, 'makePurchase']);

Route::post('/Valorant/uMCode/makePurchase', [ValorantUMController::class, 'makePurchase']);

Route::post('/Valorant/coachingCode/makePurchase', [ValorantCoachingController::class, 'makePurchase']);

Route::post('/Valorant/promocode', [ValorantController::class, 'promocode']);
