#!/bin/bash

# Run script1.sh with arguments
./sdc.sh /Users/engineer/Documents/workspace/EthIndia23/eth/derent/deployedAddresses.json /Users/engineer/Documents/workspace/EthIndia23/eth/derent/application/contractConfig/deployedAddresses.json

echo "SDC Done"

./sart.sh /Users/engineer/Documents/workspace/EthIndia23/eth/derent/artifacts /Users/engineer/Documents/workspace/EthIndia23/eth/derent/application/artifacts
# Continue with your current script
echo "SART Done"
