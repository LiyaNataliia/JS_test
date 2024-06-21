#!/bin/bash

run_test() {
    local script="$1"

    echo "Running $script:"
    if node $script; then
        echo "Test $script succeeded"
        return 0
    else
        echo "Test $script failed"
        return 1
    fi
}

run_test loginPositiveTest.js
run_test compatibilityTest.js
run_test measureLoadTimeWithThrottling.js

echo "All tests completed"
