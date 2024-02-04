<?php

require "../../includes/runcmd.php";

define('PYTHON_INTERPRETTER', 'python3');
define('HANDLERS_PATH', realpath(dirname(dirname(dirname(__FILE__))))."/request_handler");
define('HANDLER_NAME', 'index.py');

if(isset($_POST)){
    $root = "python3 ~/htdocs/python-starter/request_handler/index.py --name=pam";
    $cmd = PYTHON_INTERPRETTER." ".HANDLERS_PATH."/".HANDLER_NAME." --json=".escapeshellarg(json_encode($_POST));
    header('Content-Type: application/json');
    try{
        $res = runcmd($cmd);
        if(!empty($res->stderr)){
            throw $res->stderr;
        } 
        echo $res->stdout;
    }catch(Exception $e){
        echo json_encode([
            "message" => $e->message,
            "response" => [],
            "success" => false
        ]);
        exit;
    }
}