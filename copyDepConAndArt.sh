#!/bin/bash

# Run script1.sh with arguments
./sdc.sh /Users/akshaysp/Work/ethindia_hackathon/derent/deployedAddresses.json /Users/akshaysp/Work/ethindia_hackathon/derent/application/contractConfig/deployedAddresses.json

echo "SDC Done"

./sart.sh /Users/akshaysp/Work/ethindia_hackathon/derent/artifacts /Users/akshaysp/Work/ethindia_hackathon/derent/application/artifacts
# Continue with your current script
echo "SART Done"
