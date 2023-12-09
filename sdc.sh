#!/bin/bash

# Check if both source and destination are provided
if [ $# -ne 2 ]; then
    echo "Usage: $0 <source_file> <destination_file>"
    exit 1
fi

source_file="$1"
destination_file="$2"

# Check if source file exists
if [ ! -f "$source_file" ]; then
    echo "Source file '$source_file' not found."
    exit 1
fi

# Copy contents of source file to destination file
cp "$source_file" "$destination_file"

echo "Contents of '$source_file' copied to '$destination_file'."
