#!/bin/bash

# Check if both source and destination are provided
if [ $# -ne 2 ]; then
    echo "Usage: $0 <source_directory> <destination_directory>"
    exit 1
fi

source_dir="$1"
destination_dir="$2"

# Check if source directory exists
if [ ! -d "$source_dir" ]; then
    echo "Source directory '$source_dir' not found."
    exit 1
fi

# Check if destination directory exists, create if not
if [ ! -d "$destination_dir" ]; then
    mkdir -p "$destination_dir"
fi

# Copy contents of source directory to destination directory
cp -r "$source_dir"/* "$destination_dir"

echo "Contents of '$source_dir' copied to '$destination_dir'."
