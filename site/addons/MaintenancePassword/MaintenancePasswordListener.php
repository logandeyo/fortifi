<?php

namespace Statamic\Addons\MaintenancePassword;

use Statamic\API\Nav;
use Statamic\Extend\Listener;
use Statamic\API\User;
use Statamic\API\UserGroup;
use Statamic\API\Role;

class MaintenancePasswordListener extends Listener
{
    /**
     * The events to be listened for, and the methods to call.
     *
     * @var array
     */
    public $events = [
      'cp.nav.created' => 'addNavItems',
    ];

    public function addNavItems($nav)
    {
        $user = User::getCurrent();
        $MaintenancePasswordNav = Nav::item('Maintenance')->route('addon.settings', 'maintenance-password')->icon('lock');

        if ( $user->isSuper() ) {
          $nav->addTo('tools', $MaintenancePasswordNav);
        }
    }

}
