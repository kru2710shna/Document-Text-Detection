#!/bin/bash

# Update package lists and install Tesseract
apt-get update
apt-get install -y tesseract-ocr

# Install Python dependencies
pip install -r requirements.txt