<?php
ini_set("display_errors", true);
error_reporting(E_ALL);
echo shell_exec('git reset --hard && git pull --rebase -v 2>&1');
