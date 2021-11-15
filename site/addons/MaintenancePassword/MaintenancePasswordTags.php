<?php

namespace Statamic\Addons\MaintenancePassword;

use Statamic\Extend\Tags;
use Statamic\API\User;

class MaintenancePasswordTags extends Tags
{
    /**
     * The {{ maintenance_password }} tag
     *
     * @return string|array
     */
    public function index()
    {

        if($user = User::getCurrent()) {
            $data = $user->data();
            if(is_array($data) && !empty($data['super'])){
                return;
            }
        }
        
        if(empty($_COOKIE['maintenance'])) {
            if($password = $this->getConfig('password')) {
            list($uri) = explode('?',$_SERVER['REQUEST_URI']);
            if(!empty($_GET['maintenance-password'])) {
                if($password && $_GET['maintenance-password'] == $password) {
                    setcookie('maintenance','ok');
                    header('Location:'.$_GET['uri']);
                    exit;
                } else {
                    header('Location:'.$_GET['uri'].'?maintenance-error');
                    exit;
                }
            }
            ?>
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <meta name="description" content="{{ meta_description or subtitle }}">
                <title>
                      <?php echo $this->getConfig('page_title','Maintenance');?>
                </title>

                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css" integrity="sha256-vK3UTo/8wHbaUn+dTQD0X6dzidqc5l7gczvH+Bnowwk=" crossorigin="anonymous" />
                <style>
                    .field {
                        margin: 0 !important;
                    }
                    #form-maintenance, #password {
                        position: fixed;
                        bottom: 15px;
                        right: 15px;
                    }
                    .hide {
                        display: none;
                    }
                    .notification {
                        position:fixed;
                        top:15px;
                        right:15px;                        
                    }
                    <?php echo $this->getConfig('css');?>

                    <?php if($bgi = $this->getConfig('background-image')) {?>
                    body {
                        background-image:url(<?php echo $bgi?>);
                        background-repeat:no-repeat;
                        background-size: cover;
                    }
                    <?php }?>

                    <?php if($bg = $this->getConfig('background-color','#333333')) {?>
                    body {
                        background-color:<?php echo $bg?>;
                    }
                    .title, .subtitle {
                        text-shadow:1px 1px 1px <?php echo $bg?>;
                    }
                    <?php }?>

                    <?php if($color = $this->getConfig('color','#FFFFFF')) {?>
                    body, .title, .subtitle {
                        color:<?php echo $color?>;
                    }
                    <?php }?>
                </style>
            </head>
            <body>
                <?php if(isset($_GET['maintenance-error'])) {?>
                <div class="notification is-danger">
                    <?php echo $this->getConfig('password_error','Error. Wrong password.');?>
                </div>
            <?php }?>

                <section class="hero is-fullheight">
                  <div class="hero-body">
                    <div class="container">
                        <?php if($logo = $this->getConfig('logo')) {?>
                            <img src="<?php echo $logo;?>" style="height:150px">
                        <?php }?>
                      <h1 class="title is-1">
                        <?php echo $this->getConfig('main_title','This site is closed for maintenance');?>
                    </h1>
                    <h2 class="subtitle">
                        <?php echo $this->getConfig('subtitle','Please excuse us for any inconvenience');?>
                    </h2>
                    </div>
                </div>
        </section>                
        <button type="button" class="button is-primary" id="password" style="background-color: <?php echo $this->getConfig('button-color','#00d1b2');?>">
            <?php echo $this->getConfig('button','I have a password');?>
        </button>

        <form method="get" class="hide" id="form-maintenance">
        <div class="field has-addons">
          <div class="control">
            <input class="input" name="maintenance-password" type="password" placeholder="<?php echo $this->getConfig('placeholder','Enter password here');?>">
          </div>
          <div class="control">
            <button class="button is-info">
              Ok
            </button>
          </div>
        </div>
            <input type="hidden" name="uri" value="<?php echo htmlentities($uri);?>">
        </form>

        <script>
            document.querySelector('#password').addEventListener('click', function (event) {
                this.classList.add('hide');
                document.querySelector('#form-maintenance').classList.remove('hide')
            });
            <?php echo $this->getConfig('js');?>
        </script>
    </body>
    </html>
    <?php
    exit;
}
} 

    }
}
