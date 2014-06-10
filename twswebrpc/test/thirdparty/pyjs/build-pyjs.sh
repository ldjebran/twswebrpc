#!/usr/bin/env sh

#replace pyjsbuild path to match your pyjs instalation
pyjsbuilder="/home/dl/projects/py/twsengine/bin/pyjs/bin/pyjsbuild"

#replace python command
pythonrunner="/home/dl/projects/py/twsengine/bin/python2.7/bin/python"

$pythonrunner $pyjsbuilder JSONRPCExample.py
