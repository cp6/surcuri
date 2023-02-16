<?php

namespace App\Http\Controllers;

use App\Models\ActionLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActionLogController extends Controller
{
    public function index(): \Inertia\Response
    {
        return Inertia::render('ActionLogs/Index', [
            'logs' => ActionLog::with(['server'])->orderBy('created_at', 'desc')->get(),
            'hasAlert' => \Session::exists('alert_type'),
            'alert_type' => \Session::get('alert_type'),
            'alert_message' => \Session::get('alert_message')
        ]);
    }

    public function show(ActionLog $actionLog): \Inertia\Response
    {
        $this->authorize('view', $actionLog);

        return Inertia::render('ActionLogs/Show', [
            'resource' => ActionLog::where('id', $actionLog->id)->with(['server', 'command', 'database', 'connection'])->first()
        ]);
    }

    public function destroyAll(Request $request)
    {

        try {
            $logs = ActionLog::where('user_id', \Auth::id())->delete();
            return redirect(route('log.index'))->with(['alert_type' => 'success', 'alert_message' => "Deleted $logs logs"]);
        } catch (\Exception $exception) {
            return redirect(route('log.index'))->with(['alert_type' => 'failure', 'alert_message' => "Failed to delete all logs: {$exception->getMessage()}"]);
        }

    }

}
